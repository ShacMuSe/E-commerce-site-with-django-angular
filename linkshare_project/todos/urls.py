# urls.py

from django.urls import path
from .views import TaskViewSet


urlpatterns = [
    path('', TaskViewSet.as_view()),
    path('delete/<int:pk>', TaskViewSet.as_view()),
]
