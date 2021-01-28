from django.db.models import Count
from django.shortcuts import render, redirect
from django.db.models.functions import ExtractDay,ExtractMonth
from django.http import HttpResponse
from .forms import PostFilterForm, BoardForm
from django.contrib import messages

from .models import User, Post, Board, Topic


def index(req):
    stats = {
        'userStats': {
            'count': User.objects.count()
        },
        'postStats': {
            'count': Post.objects.count()
        },
        'boardStats': {
            'count': Board.objects.count()
        },
        'topicStats': {
            'count': Topic.objects.count()
        }
    }
    return render(req, 'dashboard/index.html', {
        'stats': stats
    })


def user_details(req):
    user_per_month = User.objects.annotate(month=ExtractMonth('created_at')).values('month').annotate(
        count=Count('id')).order_by('month')
    posts_per_user = Post.objects.values('user_id').annotate(
        count=Count('id')).order_by('-count')[:5]
    ids = posts_per_user.values_list('user_id', flat=True)
    users = User.objects.filter(id__in=list(ids)).values('username','id')

    post_per_username = []
    for data in posts_per_user:
        found_user = None
        for user in users:
            if user['id'] == data['user_id']:
                found_user = user
        post_per_username.append({'count':data['count'],'username': found_user['username'], 'id': found_user['id']})
    # return HttpResponse()
    return render(req, 'dashboard/users.html', {'usersPerMonth': list(user_per_month), 'posts_per_user': post_per_username})


def topic_details(req):
    topics_per_month = Topic.objects.annotate(month=ExtractMonth('created_at')).values('month').annotate(
        count=Count('id')).order_by('month')
    posts_per_topic = Post.objects.values('topic_id').annotate(
        count=Count('id')).order_by('-count')[:5]
    ids = posts_per_topic.values_list('topic_id', flat=True)
    topics = Topic.objects.filter(id__in=list(ids)).values('title','id')

    posts_per_topic_title = []
    for data in posts_per_topic:
        found_topic = None
        for topic in topics:
            if topic['id'] == data['topic_id']:
                found_topic = topic
        posts_per_topic_title.append({'count':data['count'],'title': found_topic['title'], 'id': found_topic['id']})
    # return HttpResponse()
    return render(req, 'dashboard/topics.html', {'topicsPerMonth': list(topics_per_month), 'posts_per_topic': posts_per_topic_title})

def post_details(req):
    posts_per_day = Post.objects.annotate(day=ExtractDay('created_at')).values('day').annotate(
        count=Count('id')).order_by('day')
    form = PostFilterForm()
    return render(req,'dashboard/posts.html',{'postsPerDay': list(posts_per_day),'form': form})

def post_filtered_form_req(req):
    if req.method == 'GET':
        return redirect('dashboard_posts')
    form = PostFilterForm(req.POST)
    if form.is_valid():
        model = form.cleaned_data['model'].lower()
        id = form.cleaned_data['id']
        return redirect('dashboard_posts_filtered',id=id,model=model)
    else:
        return render(req, 'dashboard/posts.html', {'form': form})

def posts_filtered_display(req,id,model):
    data = []
    if model.lower() == 'topic':
        data = Post.objects.filter(topic_id=id)
    elif model == 'user':
        data = Post.objects.filter(user_id=id)

    return render(req, 'dashboard/posts_filtered.html',
                  {'posts': data, 'filter_model': model, 'filter_id': id})


def boards(req):
    all_boards = Board.objects.all()
    topics_per_board = Topic.objects.values('board_id').annotate(
        count=Count('id')).order_by('-count')
    topics_per_board_title = []
    for data in topics_per_board:
        found_board = None
        for board in all_boards:
            if board.id == data['board_id']:
                found_board = board
                topics_per_board_title.append({'count': data['count'], 'title': found_board.name, 'id': found_board.id,'description': found_board.description})
    if req.method == 'POST':
        form = BoardForm(req.POST)
        if form.is_valid():
            board = Board()
            board.name = form.cleaned_data['name']
            board.description = form.cleaned_data['description']
            board.save()
            messages.success(req, 'Board created successfully')
            all_boards = Board.objects.all()
            form = BoardForm()
    else:
        form = BoardForm()
    return render(req,'dashboard/boards.html',{'topicsPerBoard': topics_per_board_title, 'boards': all_boards, 'form': form})

def edit_board(req, id):
    if req.method == 'POST':
        form = BoardForm(req.POST)
        if form.is_valid():
            board = Board.objects.get(id=id)
            board.name = form.cleaned_data['name']
            board.description = form.cleaned_data['description']
            board.save()
            messages.success(req, 'Board edited successfully')
            return redirect('dashboard_boards')
        else:
            return render(req, 'dashboard/boards_edit.html', {'form': form,'id':id})
    else:
        board = Board.objects.get(id=id)
        form = BoardForm(instance=board)
        return render(req, 'dashboard/boards_edit.html',{'form':form,'id':id})


def delete_board(req, id):
    board = Board.objects.get(id=id)
    board.delete()
    messages.success(req, 'Board deleted successfully')
    return redirect('dashboard_boards')