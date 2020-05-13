from django.shortcuts import render
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect
from django.contrib import messages



# Signup View
def signup_view(request):
    #Check Request and Form Validity
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            #Save Form
            form.save()
            #Get User and Pass
            username = form.cleaned_data.get("username")
            raw_password = form.cleaned_data.get('password1')
            #Authenticate and Login
            user = authenticate(username=username,password =raw_password)
            login(request,user)
            return redirect('home')
    else:
        form = UserCreationForm()
    return render(request,'signup/signup.html',{'form':form})


#Login View
def login_view(request):
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request,username=username,password=password)
        if user is not None:
            login(request,user)
            return render(request,'main/home.html')
        else:
            messages.error(request,'username or password not correct')
            return redirect('login')

#Logout View
def logout_view(request):
    logout(request)
    return render(request,'main/home.html')
