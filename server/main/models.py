from django.db import models
from django.utils.html import format_html
from django.contrib.auth.models import User
from django.conf import settings

# Create your models here.
class Node(models.Model):
    name = models.CharField(max_length=30,default='')
    interview = models.TextField()
    image = models.ImageField(blank=True)

    #Each node has one or 0 owners, and 0 or more users that have favorited it.
    node_user = models.OneToOneField(settings.AUTH_USER_MODEL, blank=True,null=True, on_delete= models.SET_NULL, related_name='user_owner')
    favorite = models.ForeignKey(settings.AUTH_USER_MODEL, blank=True,null=True, on_delete= models.SET_NULL, related_name='favorited')

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now_add=True)
    approved = models.BooleanField(default=False)

    def presentation(self):
        return format_html(
            "<img src={} > </img>",self.image
        )



    def image_url(self):
        return self.image.url






