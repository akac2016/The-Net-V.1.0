from django.shortcuts import render
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect
from main.models import Node
from main.forms import NewNode
from users.models import NodeUser
from django.http import JsonResponse, HttpResponseForbidden, HttpResponseBadRequest
from rest_framework import serializers
from django.views.generic import View
from django.http import HttpResponse
from django.conf import settings
from django.middleware.csrf import get_token
import os
import logging
from django.contrib.staticfiles import finders #For Debug
from django.http.response import HttpResponseRedirect
from django.views.generic.list import ListView

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
            return HttpResponseRedirect('/')

        else:
            return HttpResponseBadRequest("<p> Invalid Form </p>")

        
        #return JsonResponse({'responseText':False})
        
    else:
        return HttpResponseForbidden("<p> Bad Request </p>")
    

def csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})

def get_node_image(request, pk):
    if (request.method == "GET"):
        node = Node.objects.get(pk=pk)
        return node.image_url()
'''
def get_node_image(request, pk):
    if (request.method == "GET"):
        return JsonResponse({"Hmmmmmm": "Hmmmmm"})
        # return JsonResponse({imageU})
'''
#Serializer Class
class NodeSerializer(serializers.BaseSerializer):
    def to_representation(self,instance):
        return{

            'name':instance.name,
            "pk": instance.pk,
            'interview': instance.interview,
            'image': instance.image.url
        }

#Profile Search Result Class
class ProfileSearchView(ListView):
    template_name = '/main/list.html'
    model = NodeUser

    def get_queryset(self, first_name):
        node_users = self.model.objects.all()
        if first_name:
            node_users = node_users.filter(first_name__icontains=first_name)
        return node_users


#Nodes Page
def nodes_ajax(request):
    if request.method == "GET":
        queryset = Node.objects.all()
        serializer = NodeSerializer(queryset, many=True)
        return JsonResponse(serializer.data,safe=False)

def nodes_ajax_id(request,pk):
    if request.method == 'GET':
        node = Node.objects.get(pk=pk)
        serializer = NodeSerializer(node)
        return JsonResponse(serializer.data,safe=False)


def home(request):
    return render(request,'index.html')

#Search Results

def get_search_results(request, first_name):
    psv = ProfileSearchView()
    results = psv.get_queryset(first_name)
    ret = '\n '.join([user.first_name for user in results])
    print(ret)
    return HttpResponse(ret)







