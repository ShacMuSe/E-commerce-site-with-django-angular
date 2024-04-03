from django.urls import path
from .views import CategoryListView, ProductListView, OrderListView, RateProductView, ProductDeleteView, ProductCommentsListView, ProductDetailView, ProductEditView

urlpatterns = [
    path('categories/', CategoryListView.as_view()),
    path('', ProductListView.as_view()),
    path('<int:pk>', ProductDetailView.as_view()),
    path('<int:pk>/edit', ProductEditView.as_view()),
    path('<int:pk>/delete',ProductDeleteView.as_view()),
    path('orders/', OrderListView.as_view()),
    path('<int:pk>/rate', RateProductView.as_view()),
    path('products/<int:product_id>/comments/', ProductCommentsListView.as_view()),

]
