from django.shortcuts import render
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect


#Homepage View
def home(request):
        if request.user.is_authenticated:
            return render(request,'main/home.html')

        else:
            return redirect('signup')



