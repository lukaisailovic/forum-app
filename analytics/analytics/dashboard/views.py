from django.db.models import Count
from django.shortcuts import render
from django.db.models.functions import ExtractMonth

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

def user_details(req):
    usersPerMonth = User.objects.annotate(month=ExtractMonth('created_at')).values('month').annotate(
        count=Count('id')).order_by('month')
    # return HttpResponse(personsMonthlyData)
    return  render(req,'dashboard/users.html',{'usersPerMonth':list(usersPerMonth)})