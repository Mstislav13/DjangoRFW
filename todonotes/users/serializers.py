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
        # fields = '__all__'
