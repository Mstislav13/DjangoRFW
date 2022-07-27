from notesproject.models import Project
from django_filters import rest_framework as filters


class ProjectFilter(filters.FilterSet):
    """
    класс - ProjectFilter
    """
    title = filters.CharFilter(lookup_expr='contains')

    class Meta:
        """
        класс - Meta
        """
        model = Project
        fields = ['title']
