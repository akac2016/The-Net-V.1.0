from django.shortcuts import render, get_object_or_404

# Create your views here.
from main.models import Node
from .form import CommentForm







def post_comment(request,slug):
    template_name = 'post_detail.html'
    post = get_object_or_404(Node, slug=slug)
    comments = post.comments.filter(active=True)
    new_comment = None

    if request.method == "POST":
        comment_form = CommentForm(data=request.POST)
        if comment_form.is_valid():
            new_comment = comment_form.save(commit=False)


    else:
       comment_form = CommentForm()

    return render(request,template_name,{})
