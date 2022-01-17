from django.db import models
from main.models import Node

# Create your models here.
class Comment(models.Model):
    name = models.CharField(max_length = 30)
    message = models.TextField()
    node  = models.ForeignKey(Node, on_delete=models.CASCADE, related_name ="comments")
    created_on = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=False)

    class Meta:
        ordering = ['created_on']

    # String representation of the comment(how it'll appear in requests)
    def __str__(self):
        return 'Comment: {} by: {}'.format(self.message,self.name)

