from django.urls import path
from . import views

urlpatterns = [
    path('',views.index, name='dashboard_index'),
    path('users',views.user_details, name='dashboard_users'),
    path('topics', views.topic_details, name='dashboard_topics'),

]
