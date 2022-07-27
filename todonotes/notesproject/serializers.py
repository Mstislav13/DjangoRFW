from rest_framework.serializers import ModelSerializer
from .models import Project, Todo
from users.serializers import AppUsersModelSerializer


class ProjectSerializer(ModelSerializer):
    """
    класс - ProjectSerializer
    """
    # users = AppUsersModelSerializer(many=True)

    class Meta:
        """
        класс - Meta
        """
        model = Project
        fields = ['id', 'title', 'desc', 'project_link', 'users',
                  'created', 'updated']


class TodoSerializer(ModelSerializer):
    """
    класс - TodoSerializer
    """
    class Meta:
        """
        класс - Meta
        """
        model = Todo
        fields = ['id', 'title', 'desc', 'project', 'user', 'status',
                  'closed', 'created', 'updated']


class HiddenSerializer(ModelSerializer):
    """
    класс - HiddenSerializer
    """
    class Meta:
        """
        класс - Meta
        """
        model = Todo
        fields = []
