from django.db import models

# Create your models here.
class Node(models.Model):
    interview = models.CharField(max_length=30)
    image = models.ImageField()
    #ip = models.GenericIPAddressField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now_add=True)



