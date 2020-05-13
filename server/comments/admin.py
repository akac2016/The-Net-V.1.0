from django.contrib import admin
from .models import Comment

# Register your models here.
@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('name','message','created_on','active')
    list_filter = ('active','created_on')
    search_fields = ('name','comments')
    actions = ['approve_comments']


def approve_comments(self,request,queryset):
    queryset.update(active=True)

