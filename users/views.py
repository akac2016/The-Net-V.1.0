from django.shortcuts import render
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect




# Signup View
def signup(request):
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



#Logout View
def logout(request):
    pass

