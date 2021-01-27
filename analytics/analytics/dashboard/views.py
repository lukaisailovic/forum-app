from django.shortcuts import render
from django.http import HttpResponse
from .models import  User, Post,Board,Topic
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
    return render(req,'dashboard/index.html',{
        'stats': stats
    })