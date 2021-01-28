from django.db.models import Count
from django.shortcuts import render
from django.db.models.functions import ExtractMonth

from django.http import HttpResponse
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
