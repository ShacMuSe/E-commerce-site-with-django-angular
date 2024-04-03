from rest_framework import generics, status
from .models import Category, Product, Order, Rating
from .serializers import CategorySerializer, ProductSerializer, OrderSerializer, RatingSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from comment.serializers import CommentSerializer
from comment.models import Comment


class CategoryListView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductListView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetailView(APIView):
    def get(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
            serializer = ProductSerializer(product)
            return Response(serializer.data)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
class ProductEditView(generics.RetrieveUpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class OrderListView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class ProductDeleteView(generics.DestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class ProductCommentsListView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        product_id = self.kwargs['product_id']
        return Comment.objects.filter(product_id=product_id)




class RateProductView(APIView):
    def post(self, request):
        product_id = request.data.get('product_id')
        rating_value = request.data.get('rating')

        # Validate input
        if not product_id or not rating_value:
            return Response({"error": "Missing product_id or rating in request body"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        # Create a new rating object
        rating = Rating.objects.create(product=product, rating=rating_value)

        # Update product's average rating
        product.update_average_rating()

        return Response(RatingSerializer(rating).data, status=status.HTTP_201_CREATED)
