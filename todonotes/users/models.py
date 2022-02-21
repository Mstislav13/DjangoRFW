from django.db import models
from django.contrib.auth.models import AbstractUser


class AppUsers(AbstractUser):
    """
    класс - модель пользователя
    """
    username = models.CharField(max_length=64, unique=True,
                                verbose_name='Логин')
    first_name = models.CharField(max_length=64, verbose_name='Имя')
    last_name = models.CharField(max_length=64, verbose_name='Фамилия')
    email = models.EmailField(unique=True, verbose_name='email')
