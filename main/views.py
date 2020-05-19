from django.shortcuts import render
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect
from main.models import Node
from main.forms import NewNode
from django.http import JsonResponse, HttpResponseForbidden, HttpResponseBadRequest
from rest_framework import serializers
from django.db.models.functions import Cast

#Homepage View
def home(request):
        return render(request,"main/home.html")

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


#Serializer Class
class NodeSerializer(serializers.BaseSerializer):
    def to_representation(self,instance):
        return{

            'name':instance.name,
            "id": instance.pk,
            'interview': instance.interview,
            'image': instance.image.url
        }



#Nodes Page
def nodes_ajax(request):
    if request.method == "GET":
        queryset = Node.objects.all()
        serializer = NodeSerializer(queryset, many=True)
        return JsonResponse(serializer.data,safe=False)










