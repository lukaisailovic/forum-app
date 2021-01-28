from django.db import models

class User(models.Model):
    id = models.IntegerField
    username = models.CharField(max_length=255)
    created_at = models.DateTimeField(db_column='createdAt')
    updated_at = models.DateTimeField(db_column='updatedAt')
    class Meta:
        db_table = "users"

class Board(models.Model):
    id = models.IntegerField
    name = models.CharField(max_length=255,db_column='name',)
    description = models.TextField(max_length=255,db_column='description')
    created_at = models.DateTimeField(auto_now_add=True,db_column='createdAt')
    updated_at = models.DateTimeField(auto_now=True,db_column='updatedAt')

    class Meta:
        db_table = "boards"


class Post(models.Model):
    id = models.IntegerField
    user_id = models.IntegerField(db_column='userId')
    topic_id = models.IntegerField(db_column='topicId')
    content = models.TextField(db_column='content')
    created_at = models.DateTimeField(db_column='createdAt')
    updated_at = models.DateTimeField(db_column='updatedAt')

    class Meta:
        db_table = "posts"

class Topic(models.Model):
    id = models.IntegerField
    title = models.CharField(max_length=255)
    user_id = models.IntegerField(db_column='userId')
    board_id = models.IntegerField(db_column='boardId')
    content = models.TextField(db_column='content')
    created_at = models.DateTimeField(db_column='createdAt')
    updated_at = models.DateTimeField(db_column='updatedAt')

    class Meta:
        db_table = "topics"

