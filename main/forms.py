from django import forms
from .models import Node


class NewNode(forms.ModelForm):
    class Meta:
        model = Node
        exclude = ['created','updated']
        fields = ['interview','image']

        widgets = {
            'interview':forms.TextInput(attrs={
                'id':'interview',
                'required':True,
                'placeholder':'Say something...'
            }),
                'image':forms.FileInput(attrs={
            'id':'image',
            'required':True})

        }




