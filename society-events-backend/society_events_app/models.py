from django.db import models
from django.conf import settings

class Event(models.Model):
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='events_created')
    title = models.CharField(max_length=255)
    description = models.TextField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    location = models.CharField(max_length=255)
    participants = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='events_participating', blank=True)
    actual_participants = models.IntegerField(null=True, blank=True, default=None)
    status = models.CharField(max_length=20, default='Upcoming')  # Consider auto-updating this with signals

    def _str_(self):
        return self.title
    
class Comment(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return 'Comment by {} on {}'.format(self.user.username, self.event.title)