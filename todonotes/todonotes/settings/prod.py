from .base import *

DEBUG = False

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'todonotes',
        'USER': 'admin',
        'PASSWORD': '123',
        'HOST': 'db',
        'PORT': '5432'
    }
}
