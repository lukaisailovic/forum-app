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
    name = models.CharField(max_length=255)
    description = models.TextField
    created_at = models.DateTimeField(db_column='createdAt')
    updated_at = models.DateTimeField(db_column='updatedAt')

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
    userId = models.IntegerField
    boardId = models.IntegerField
    content = models.TextField
    created_at = models.DateTimeField(db_column='createdAt')
    updated_at = models.DateTimeField(db_column='updatedAt')

    class Meta:
        db_table = "topics"

