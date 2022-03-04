from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.viewsets import ModelViewSet
from notesproject.models import Project, Todo
from notesproject.serializers import ProjectSerializer, TodoSerializer


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    """
    класс - для постраничного вывода размер страницы 10 записей
    """
    default_limit = 10


class TodoLimitOffsetPagination(LimitOffsetPagination):
    """
    класс - для постраничного вывода размер страницы 20
    """
    default_limit = 20


class ProjectViewSet(ModelViewSet):
    """
    класс - представлений
    """
    serializer_class = ProjectSerializer
    pagination_class = ProjectLimitOffsetPagination
    fields_filter = ['title']

    def get_queryset(self):
        """
        :return:
        """
        if 'tc' in self.request.query_params:
            return Project.objects.filter(
                title__icontains=self.request.query_params['tc'])
        return Project.objects.all()


class TodoViewSet(ModelViewSet):
    """
    класс - представлений
    """
    serializer_class = TodoSerializer
    pagination_class = TodoLimitOffsetPagination
    fields_filter = ['project']

    def get_queryset(self):
        """
        :return:
        """
        if 'proj' in self.request.query_params:
            return Todo.objects.filter(
                project__title__icontains=self.request.query_params['proj'])
        return Todo.objects.all()

    def ruin(self, request, pk):
        """
        :param request:
        :param pk:
        :return:
        """
        todo_item = get_object_or_404(Todo, pk=pk)
        serializer = TodoSerializer(todo_item)
        todo_item.is_active = False
        todo_item.is_closed = True
        todo_item.save()
        return Response(serializer.data)
