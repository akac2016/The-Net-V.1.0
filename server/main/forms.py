from django import forms
from .models import Node
from django.contrib.auth.forms import UserCreationForm


class NewNode(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(NewNode,self).__init__(*args,**kwargs)

    class Meta:
        model = Node
        fields = ['name','interview','image']

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




