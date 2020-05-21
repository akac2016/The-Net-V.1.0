from django.shortcuts import render
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect
from main.models import Node
from main.forms import NewNode
from django.http import JsonResponse, HttpResponseForbidden, HttpResponseBadRequest
from rest_framework import serializers
from django.views.generic import View
from django.http import HttpResponse
from django.conf import settings
from django.middleware.csrf import get_token
import os
import logging
from django.contrib.staticfiles import finders #For Debug
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

def csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})

def get_node_image(request, pk):
    if (request.method == "GET"):
        return JsonResponse({"Hmmmmmm": "Hmmmmm"})
        # return JsonResponse({imageU})

#Serializer Class
class NodeSerializer(serializers.BaseSerializer):
    def to_representation(self,instance):
        return{

            'name':instance.name,
            "pk": instance.pk,
            'interview': instance.interview,
            'image': instance.image.url
        }



#Nodes Page
def nodes_ajax(request):
    if request.method == "GET":
        queryset = Node.objects.all()
        serializer = NodeSerializer(queryset, many=True)
        return JsonResponse(serializer.data,safe=False)


def home(request):
    return render(request,'index.html')

#Delete
class FrontendAppView(View):
    """
    Serves the compiled frontend entry point (only works if you have run `yarn
    run build`).
    """

    def get(self, request):
        logger = logging.getLogger(__name__)
        logger.info("HERE")
        try:
            with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            logging.exception('Production build of app not found')
            return HttpResponse(
                """
                This URL is only used when you have built the production
                version of the app. Visit http://localhost:3000/ instead, or
                run `yarn run build` to test the production version.
                """,
                status=501,
            )






