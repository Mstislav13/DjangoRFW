from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import HiddenField
from .models import AppUsers


class AppUsersModelSerializer(ModelSerializer):
    """
    класс - сериализатор
    """
    class Meta:
        """
        класс - модель сериализатора
        """
        model = AppUsers
        fields = ['id', 'username', 'first_name', 'last_name', 'email']


class AppUsersModelSerializerV2(ModelSerializer):
    """
    класс - сериализатор_2
    """
    class Meta:
        """
        класс - модель сериализатора_2
        """
        model = AppUsers
        fields = ['id', 'username', 'first_name', 'last_name']
