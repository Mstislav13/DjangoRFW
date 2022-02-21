from rest_framework.viewsets import ModelViewSet
from .serializers import AppUsersModelSerializer
from .models import AppUsers


class AppUsersViewSet(ModelViewSet):
    """
    класс - представлений
    """
    serializer_class = AppUsersModelSerializer
    queryset = AppUsers.objects.all()
