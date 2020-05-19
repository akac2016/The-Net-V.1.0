from django.shortcuts import render
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect
from main.models import Node
from main.forms import NewNode
from django.http import JsonResponse, HttpResponseForbidden, HttpResponseBadRequest
from django.core import  serializers
from django.db.models.functions import Cast

#Homepage View
def home(request):
        if request.user.is_authenticated:
            return render(request,'main/home.html')
        else:
            return redirect('signup')


#NewNode Form
def node_form(request):
    form = NewNode()
    return render(request, 'main/form.html', {'form':form})


#Ajax
def form_ajax(request):
    if request.method == 'POST':
        form = NewNode(request.POST,request.FILES)
        if form.is_valid():
            interview = form.cleaned_data.get('interview')
            image = form.cleaned_data.get('image')
            obj = Node.objects.create(interview = interview, image = image)
            obj.save()


        else:
            return HttpResponseBadRequest("<p> Invalid Form </p>")


        return JsonResponse({'responseText':False})
    else:
        return HttpResponseForbidden("<p> Bad Request </p>")



#Nodes Page
def nodes_ajax(request):
    if request.method == "GET":
        obj = Node.objects.all()
        image_url = []


        data = serializers.serialize("json", obj, fields=("name","interview","image"))
        return JsonResponse(data,safe=False)









