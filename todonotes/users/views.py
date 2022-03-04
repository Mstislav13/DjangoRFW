from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, \
    UpdateModelMixin
from .serializers import AppUsersModelSerializer
from .models import AppUsers


class AppUsersViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin,
                      UpdateModelMixin):
    """
    класс - представлений
    """
    serializer_class = AppUsersModelSerializer
    queryset = AppUsers.objects.all()
