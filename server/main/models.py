from django.db import models
from django.utils.html import format_html
from django.contrib.auth.models import User

# Create your models here.
class Node(models.Model):
    name = models.CharField(max_length=30,default='')
    interview = models.TextField()
    image = models.ImageField()
    node_user = models.ForeignKey(User, blank=True,null=True, on_delete= models.SET_NULL)
    favorite = models.ForeignKey(User, blank=True,null=True, on_delete= models.SET_NULL) 
    #ip = models.GenericIPAddressField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now_add=True)
    approved = models.BooleanField(default=False)

    def presentation(self):
        return format_html(
            "<img src={} > </img>",self.image
        )



    def image_url(self):
        return self.image.url






