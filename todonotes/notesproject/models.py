from django.db import models
from users.models import AppUsers


class Project(models.Model):
    """
    класс - Project
    """
    title = models.CharField(max_length=64, verbose_name='Наименование')
    desc = models.TextField(verbose_name='Описание')
    project_link = models.URLField(blank=True, verbose_name='Ссылка')
    users = models.ManyToManyField(AppUsers, verbose_name='Пользователи')
    created = models.DateTimeField(auto_now_add=True, verbose_name='Дата '
                                                                   'создания')
    updated = models.DateTimeField(auto_now=True, verbose_name='Дата '
                                                               'изменения')

    def __str__(self):
        """
        :return:
        """
        return self.title


class Todo(models.Model):
    """
    класс - Тodo
    """
    title = models.CharField(max_length=64, verbose_name='Наименование')
    desc = models.TextField(verbose_name='Описание')
    project = models.OneToOneField(Project, on_delete=models.CASCADE,
                                   verbose_name='Проект')
    user = models.ForeignKey(AppUsers, on_delete=models.CASCADE,
                             verbose_name='Создатель')
    status = models.BooleanField(default=True, verbose_name='Статус')
    closed = models.BooleanField(default=False, verbose_name='Закрыт')
    created = models.DateTimeField(auto_now_add=True, verbose_name='Дата '
                                                                   'создания')
    updated = models.DateTimeField(auto_now=True, verbose_name='Дата '
                                                               'изменения')

    def __str__(self):
        """
        :return:
        """
        return self.title
