from django.urls import path
from . import views

urlpatterns = [
    path('',views.index, name='dashboard_index'),
    path('users',views.user_details, name='dashboard_users'),
    path('topics', views.topic_details, name='dashboard_topics'),
    path('posts', views.post_details, name='dashboard_posts'),
    path('posts/filtered/request', views.post_filtered_form_req, name='dashboard_posts_filtered_request'),
    path('posts/filtered/<int:id>/<str:model>', views.posts_filtered_display, name='dashboard_posts_filtered'),
    path('boards',views.boards,name='dashboard_boards'),
    path('boards/<int:id>', views.edit_board, name='dashboard_boards_modify'),
    path('boards/delete/<int:id>', views.delete_board, name='dashboard_boards_delete'),

]
