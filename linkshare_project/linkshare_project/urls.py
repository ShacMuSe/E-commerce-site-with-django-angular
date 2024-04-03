
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('authentication.urls')),
    path('api/todos/', include('todos.urls')),
    path('api/shop/', include('shop.urls')),
    path('api/comments/', include('comment.urls')),
]
