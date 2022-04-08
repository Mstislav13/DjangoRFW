import graphene
from graphene_django import DjangoObjectType

from notesproject.models import Project, Todo
from users.models import AppUsers


class AppUsersType(DjangoObjectType):
    """
    класс - AppUsersType
    """
    class Meta:
        """
        класс - Meta
        """
        model = AppUsers
        fields = '__all__'


class ProjectType(DjangoObjectType):
    """
    класс - ProjectType
    """
    class Meta:
        """
        класс - Meta
        """
        model = Project
        fields = '__all__'


class TodoType(DjangoObjectType):
    """
    класс - TodoType
    """
    class Meta:
        """
        класс - Meta
        """
        model = Todo
        fields = '__all__'


class Query(graphene.ObjectType):
    """
    класс - Query
    """
    all_users = graphene.List(AppUsersType)
    all_projects = graphene.List(ProjectType)
    all_todos = graphene.List(TodoType)

    user_by_id = graphene.Field(AppUsersType, id=graphene.Int(required=True))
    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))
    todo_by_id = graphene.Field(TodoType, id=graphene.Int(required=True))

    def resolve_all_users(self, info):
        """
        :param info:
        :return:
        """
        return AppUsers.objects.all()

    def resolve_all_projects(self, info):
        """
        :param info:
        :return:
        """
        return Project.objects.all()

    def resolve_all_todos(self, info):
        """
        :param info:
        :return:
        """
        return Todo.objects.all()

    def resolve_user_by_id(self, info, id):
        """
        :param info:
        :param id:
        :return:
        """
        try:
            return AppUsers.objects.get(pk=id)
        except AppUsers.DoesNotExist:
            return None

    def resolve_project_by_id(self, info, id):
        """
        :param info:
        :param id:
        :return:
        """
        try:
            return Project.objects.get(pk=id)
        except Project.DoesNotExist:
            return None

    def resolve_todo_by_id(self, info, id):
        """
        :param info:
        :param id:
        :return:
        """
        try:
            return Todo.objects.get(pk=id)
        except Todo.DoesNotExist:
            return None


schema = graphene.Schema(query=Query)
