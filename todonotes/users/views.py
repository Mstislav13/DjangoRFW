from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, \
    UpdateModelMixin
from rest_framework.permissions import DjangoModelPermissions
from .serializers import AppUsersModelSerializer, AppUsersModelSerializerV2
from .models import AppUsers


class AppUsersViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin,
                      UpdateModelMixin):
    """
    класс - представлений
    """
    permission_classes = [DjangoModelPermissions]
    # serializer_class = AppUsersModelSerializer
    queryset = AppUsers.objects.all()

    def get_serializer_class(self):
        """
        :return:
        """
        if self.request.version == 'v2':
            return AppUsersModelSerializerV2
        return AppUsersModelSerializer
