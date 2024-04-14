from django.db import models
from django.contrib.auth.models import User

class Event(models.Model):
    event_id = models.IntegerField(primary_key=True)
    create_id = models.IntegerField()
    title = models.CharField(max_length=255)
    description = models.TextField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    status = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    participants = models.ManyToManyField(User, related_name='participants')
    actual_participants = models.IntegerField()

class Comment(models.Model):
    comment_id = models.IntegerField(primary_key=True)
    event_id = models.IntegerField()
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField()