from django.contrib.auth.models import User,CharField,DateTimeField, EmailField


class NodeUser(models.Model):

    email_id = EmailField(max_length=100)
    username = CharField(max_length=100)
    name = CharField(max_length=100)
    created = DateTimeField(auto_now_add=True)
    updated = DateTimeField(auto_now_add=True)


    def image_url(self):
        return self.image.url