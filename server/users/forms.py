from django import forms
from .models import NodeUser
from django.contrib.auth.forms import UserCreationForm

class NewUserForm(UserCreationForm):
    email = forms.EmailField(label = "Email")
    #password = forms.CharField(widget=forms.PasswordInput)
    fullname = forms.CharField(label = "Full name (ex: Jane Doe)")

    class Meta:
        model = NodeUser
        fields = ("email","password1",'password2', "fullname")

    def save(self, commit=True):
        user = super().save(commit=False)

        first_name, last_name = self.cleaned_data["fullname"].split()
        user.first_name = first_name
        user.last_name = last_name
        user.email = self.cleaned_data["email"]
        if commit:
            user.save()
        return user