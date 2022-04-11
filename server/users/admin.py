from django.contrib import admin
from .models import NodeUser

# Register your models here.

class NodeUserAdmin(admin.ModelAdmin):
    list_display = ()
    actions = ['delete']
    list_filter = ["email"]
    search_fields = ("first_name",)

admin.site.register(NodeUser,NodeUserAdmin)
