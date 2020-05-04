from django.shortcuts import render, get_object_or_404
from django.core import serializers
from django.http import JsonResponse

# Create your views here.
from main.models import Node
from .form import CommentForm
from .models import Comment






# Post Comment
def post_comment(request,pk):

    if request.method == "POST":
        _node = get_object_or_404(Node, pk=pk)
        comment = Comment(node=_node)
        comment_form = CommentForm(request.POST,instance = comment)
        if comment_form.is_valid():
            comment_form.save()

    else:
       comment_form = CommentForm()
    return render(request,"main/comment.html",{'form':comment_form})

#


def get_node_comment(request,pk):
      _node= get_object_or_404(Node,pk=pk)
      comments = _node.comments.all()
      data = serializers.serialize("json", comments, fields=("name", "message"))
      return JsonResponse(data,safe=False)



