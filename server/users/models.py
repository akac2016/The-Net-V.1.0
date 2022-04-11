from django.contrib.auth.models import User, AbstractBaseUser, AbstractUser
from django.db.models import CharField,DateTimeField, EmailField, Model
from django.core.mail import send_mail
from django.contrib.auth.base_user import BaseUserManager

class UserManager(BaseUserManager):
    use_in_migrations = True

    #Create and save user
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    #Create and save user with no password
    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    #Create super user
    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class NodeUser(AbstractUser):

    username = None
    email = EmailField(max_length=100, unique=True)
    first_name = CharField(('first name'), max_length=30)
    last_name = CharField(('last name'), max_length=30, blank=True)
    created = DateTimeField(auto_now_add=True)
    updated = DateTimeField(auto_now_add=True)
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    unique = True

    def __unicode__(self):
        return u'%s' % self.get_short_name()

    def image_url(self):
        return self.image.url

    #First name *space* Last name
    def get_full_name(self):
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    #First name#
    def get_short_name(self):
        return self.first_name

    #TBI, sending users an email
    def email_user(self, subject, message, from_email=None, **kwargs):
        send_mail(subject, message, from_email, [self.email], **kwargs)