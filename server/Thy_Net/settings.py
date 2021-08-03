"""
Django settings for Thy_Net project.

Generated by 'django-admin startproject' using Django 3.0.5.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""


import os
from django.contrib.staticfiles import finders
from decouple import config, Csv
#from users import models
# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config("SECRET_KEY")


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config("DEBUG", cast=bool)


ALLOWED_HOSTS = config("ALLOWED_HOSTS",cast=Csv())

LOGIN_URL = 'login'
LOGOUT_URL = 'logout'

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'main',
    'users',
    'comments',
    'rest_framework',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
    'sslserver',
    

    'storages',
    'corsheaders',
    'django.contrib.sites',
    'social_django',
]



MIDDLEWARE = [
    
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'social_django.middleware.SocialAuthExceptionMiddleware',
    "django_ssl_auth.SSLClientAuthMiddleware",

]

ROOT_URLCONF = 'Thy_Net.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, '../client/build'), os.path.join(BASE_DIR,'../server/templates')]
        ,
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',

                'social_django.context_processors.backends',
                'social_django.context_processors.login_redirect',
            ],
        },
    },
]

WSGI_APPLICATION = 'Thy_Net.wsgi.application'

#CORS Access-Control-Allow-Origin
''' commented out for now
CORS_ALLOWED_ORIGINS = [
    "http://localhost:8080",
    "http://localhost:3000"
]
'''

CORS_ORIGIN_ALLOW_ALL = True 

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    ]
}


# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

AUTH_USER_MODEL = "users.NodeUser"

# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True


#AWS
AWS_ACCESS_KEY_ID = config("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = config("AWS_SECRET_ACCESS_KEY")
AWS_STORAGE_BUCKET_NAME = config("AWS_STORAGE_BUCKET_NAME")
AWS_S3_CUSTOM_DOMAIN = '%s.s3.amazonaws.com' % AWS_STORAGE_BUCKET_NAME
AWS_S3_OBJECT_PARAMETERS = {
    'CacheControl': 'max-age=86400',
}
AWS_LOCATION = 'static'
AWS_DEFAULT_ACL = None

ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_AUTHENTICATION_METHOD = 'email'

AUTOCREATE_VALID_SSL_USERS = True
SSLCLIENT_LOGIN_URL = None

#ACCOUNT_DEFAULT_HTTP_PROTOCOL='https'


#STATIC_URL = 'https://%s/%s/' % (AWS_S3_CUSTOM_DOMAIN, AWS_LOCATION) # DEbug
STATIC_URL = '/static/'


#Create Dev and Production Mode
#STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
#DEFAULT_FILE_STORAGE = 'Thy_Net.storage_backend.MediaStorage'

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/
STATICFILES_FINDERS = [
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
]
 #Where files from the static ROOT are served during Production
#STATIC_ROOT = os.path.join(BASE_DIR,'../client/build') #The absolute path to the directory where collectstatic will collect files for deployment


# React App
REACT_APP_DIR = os.path.join(BASE_DIR, '../client/')

REACT_STATIC_DIR = [
    os.path.join(REACT_APP_DIR, 'build', 'static')
]

CSRF_COOKIE_NAME = "csrftoken"
CSRF_COOKIE_HTTPONLY = False
CSRF_TRUSTED_ORIGINS = ['localhost:8000']



STATICFILES_DIRS = [
   os.path.join(REACT_APP_DIR, "build"),
    os.path.join(REACT_APP_DIR, "build","static"),
    os.path.join(BASE_DIR,'static'),
]

MEDIA_ROOT = os.path.join(BASE_DIR,'static/images')
searched_locations = finders.searched_locations

AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
    'social_core.backends.facebook.FacebookOAuth2',
    'social_core.backends.google.GoogleOAuth2',
    'social_core.backends.twitter.TwitterOAuth',
    "django_ssl_auth.SSLClientAuthBackend",
 )

SITE_ID = 1
LOGIN_REDIRECT_URL = 'home'


#Google API Auth
SOCIAL_AUTH_GOOGLE_OAUTH_KEY = '650465844561-l0ksj39jhcqb1kq1br2hllbj5ous0is5.apps.googleusercontent.com'
SOCIAL_AUTH_GOOGLE_OAUTH_SECRET = 'eaKyPcO9yWcmz3do6bk6KEKD'

cid = '650465844561-l0ksj39jhcqb1kq1br2hllbj5ous0is5.apps.googleusercontent.com'

#For security, fix later
SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'APP': {
            'client_id': cid,
            'secret': SOCIAL_AUTH_GOOGLE_OAUTH_SECRET,
            'key': SOCIAL_AUTH_GOOGLE_OAUTH_KEY
        }
    }
}



