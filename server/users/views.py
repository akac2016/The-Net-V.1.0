from django.shortcuts import render
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth import views as auth_views
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect
from django.contrib import messages
from .models import NodeUser
from .forms import NewUserForm
from django.contrib.auth.decorators import login_required
from rest_framework import serializers
from django.http import JsonResponse

# Signup View
def signup_view(request):
    #Check Request and Form Validity
    if request.method == "POST":
        form = NewUserForm(request.POST)
        if form.is_valid():
            #Save Form
            user = form.save()
            user.refresh_from_db()
            #Get User and Pass
            user.email = form.cleaned_data.get('email')
            raw_password = form.cleaned_data.get('password1')
            #Authenticate and Login
            authed_user = authenticate(username=user.email ,password =raw_password)
            login(request,authed_user)
            return redirect('home')
    else:
        form = NewUserForm()
    return render(request,'signup/signup.html',{'form':form})


#Logout View
def logout_view(request):
    logout(request)
    return render(request,'main/home.html')


class UserSerializer(serializers.BaseSerializer):
    def to_representation(self,instance):
        #Add image later
        ret = {

            'name':instance.get_full_name(),
            "emai": instance.email,
            'joined': instance.created,
        }

        return ret

#Profile view
@login_required
def profile_view(request):    
    if request.method == 'GET':
        user = request.user
        serializer = UserSerializer(user)
        return JsonResponse(serializer.data,safe=False)
    return ''
