from django.contrib import admin
from .models import Node
# Register your models here.


class NodeAdmin(admin.ModelAdmin):
    list_display = ("presentation",)
    actions = ['approve_node']
    list_filter = ["approved","name"]
    search_fields = ("name",)


def approve_node(self, request, queryset):
    queryset.update(approved=True)


admin.site.register(Node,NodeAdmin)

