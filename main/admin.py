from django.contrib import admin
from .models import Node
# Register your models here.


class NodeAdmin(admin.ModelAdmin):
    list_display = ('image','interview','approved')
admin.site.register(Node,NodeAdmin)
