from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response

from .models import TodoList
from .serializers import TodoListSerializer


class TodoListAPIView(generics.ListCreateAPIView):
    serializer_class = TodoListSerializer

    def get_queryset(self):
        user = self.request.user
        return reversed(TodoList.objects.filter(owner=user))

    def create(self, request, *args, **kwargs):
        data = request.data
        data.update({"owner": request.user.pk})

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )