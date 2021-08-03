from .models import Comment
from django import forms
from django.db.models import TextField




class CommentForm(forms.ModelForm):
    name = forms.CharField(label = "Name: ")
    message = TextField()
    class Meta:
        model = Comment
        fields = ('name','message')



