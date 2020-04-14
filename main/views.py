from django.shortcuts import render
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect
from main.forms import NewNode

#Homepage View
def home(request):
        if request.user.is_authenticated:
            return render(request,'main/home.html')
        else:
            return redirect('signup')



#NewNode Form
def node_form(request):
    if request.method == "POST":
        form = NewNode(request.POST)
        if form.is_valid():
            form = form.cleaned_data
            form.save()

        return redirect('home')

    else:
        form = NewNode()
        return render(request, 'main/form.html', {'form':form})

