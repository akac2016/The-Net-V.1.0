"""Thy_Net URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin 
from django.contrib.auth import views as auth_views
from django.urls import path
from main import views as main_views
from users import views as user_views
from comments import views as comment_views
from rest_framework import routers, serializers




urlpatterns = [



    #Main URLs
    #path('', main_views.FrontendAppView,name = 'home'), # Edited
    path('', main_views.home, name='home'),  # Edited
    path('home/', main_views.home, name='home'),  # Edited
    path('form/', main_views.node_form, name='new_node'),
    path('post_form/', main_views.form_ajax, name='form_ajax'),
    path("nodes/", main_views.nodes_ajax, name = "nodes"),
    path("nodes/<int:pk>", main_views.nodes_ajax_id, name = "specificnode"),
    path("images/<int:pk>", main_views.get_node_image, name = "nodeimage"),

    #User URLs
    path('admin/', admin.site.urls),
    path('signup/', user_views.signup_view, name ="signup"),
    path('login/',auth_views.LoginView.as_view(template_name='main/login.html'), name = 'login'),
    path('logout/',auth_views.LogoutView.as_view(next_page='/')),
    path('profile/',user_views.profile_view,name='profile'),
    
    #Comments
    path('comments/<int:pk>',comment_views.get_node_comment, name="comments"),
    path("comment_form/<int:pk>", comment_views.post_comment, name="comment_form"),

    #Search
    path('search/<str:first_name>',main_views.get_search_results, name="searchresults"),

    path('accounts/', include('allauth.urls')),
]
