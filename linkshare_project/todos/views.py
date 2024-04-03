# views.py

from rest_framework import generics
from .models import Task
from .serializers import TaskSerializer
from rest_framework import status
from rest_framework.response import Response


class TaskViewSet(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def delete(self, request, *args, **kwargs):
        try:
            todo_item = self.get_object()
            todo_item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
