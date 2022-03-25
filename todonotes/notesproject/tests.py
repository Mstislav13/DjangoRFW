from django.test import TestCase
from random import randrange
from rest_framework import status
from rest_framework.test import APIClient, APITestCase, APIRequestFactory, \
    force_authenticate
from users.models import AppUsers
from .models import Todo
from .views import ProjectViewSet, TodoViewSet
from mixer.backend.django import mixer


class TestTodoCase(APITestCase):
    """
    класс - TodoTest
    """
    def setUp(self):
        """
        :return:
        """
        self.admin = AppUsers.objects.create_superuser('admin',
                                                       'admin@mail.com', '123')
        self.client.login(username='admin', password='123')
        self.factory = APIRequestFactory()

    def test_todo_factory(self):
        """
        :return:
        """
        view = TodoViewSet.as_view({'get': 'list'})
        request = self.factory.get('/api/todo/')
        res = view(request)
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

        request = self.factory.get('/api/todo/')
        force_authenticate(request, self.admin)
        res = view(request)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_project_factory(self):
        """
        :return:
        """
        view = ProjectViewSet.as_view({'get': 'list'})
        request = self.factory.get('/api/projects/')
        res = view(request)
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

        request = self.factory.get('/api/projects/')
        force_authenticate(request, self.admin)
        res = view(request)
        self.assertEqual(res.status_code, status.HTTP_200_OK)


class TestTodoUserCase(APIClient):
    """
    класс - TodoUserTest
    """
    def setUp(self):
        """
        :return:
        """
        self.user = AppUsers.objects.create(username='test_user1',
                                            first_name='Tom',
                                            last_name='Cruz',
                                            email='test_user1@mail.com')
        self.client = APIClient()

    def test_get_users(self):
        """
        :return:
        """
        response = self.client.get(f'/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_user(self):
        """
        :return:
        """
        response = self.client.put(f'/api/users/{self.user.id}/',
                                   {'username': 'abracadabra',
                                    'email': 'abra@mail.com',
                                    'password': '123'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        """
        :return:
        """
        AppUsers.objects.create_superuser('admin', 'admin@mail.com', '123')
        self.client.login(username='admin', password='123')
        response = self.client.put(f'/api/users/{self.user.id}/',
                                   {'username': 'new_user',
                                    'first_name': 'Anna',
                                    'last_name': 'Cruz',
                                    'email': 'cruz@mail.com'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user = AppUsers.objects.get(id=self.user.id)
        self.assertEqual(user.username, 'new_user')
        self.assertEqual(user.email, 'cruz@mail.com')
        self.client.logout()
        res = self.client.get('/api/users/')
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)


class TestMixerCase(APITestCase):
    """
    класс - MixerTest
    """
    def setUp(self):
        """
        :return:
        """
        self.num_projects = 50
        self.num_todos = 1000
        self.project_users = []
        self.todo_titles = []

    def test_todo_delete(self):
        """
        :return:
        """
        for _ in range(self.num_todos):
            todo = mixer.blend(Todo)
            self.todo_titles.append(todo.title)

        todo_to_close = Todo.objects.get(id=randrange(self.num_todos))
        self.assertEqual(todo_to_close.status, True)
        self.assertEqual(todo_to_close.closed, False)

        todo_to_close.status = False
        todo_to_close.closed = True
        self.assertEqual(todo_to_close.status, False)
        self.assertEqual(todo_to_close.closed, True)
