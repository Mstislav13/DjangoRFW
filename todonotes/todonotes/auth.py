from rest_framework.authentication import SessionAuthentication


class SomeSessionAuthentication(SessionAuthentication):
    """
    класс - SomeSessionAuthentication
    """
    def enforce_csrf(self, request):
        """
        :param request:
        :return:
        """
        return
