from django.db import models

# Create your models here.
class Node(models.Model):
    text = models.CharField(max_length=30)
    image = models.ImageField()



