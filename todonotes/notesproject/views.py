from rest_framework.viewsets import ModelViewSet
from notesproject.models import Project, Todo
from notesproject.serializers import ProjectSerializer, TodoSerializer


class ProjectViewSet(ModelViewSet):
    """
    класс - представлений
    """
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()


class TodoViewSet(ModelViewSet):
    """
    класс - представлений
    """
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
