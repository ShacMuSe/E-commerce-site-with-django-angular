from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db.models import Avg


class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    average_rating = models.DecimalField(max_digits=3, decimal_places=2, default=0)
    total_ratings = models.IntegerField(default=0)

    def __str__(self):
        return self.name
    
    def update_average_rating(self):
        ratings = self.ratings.all()
        total_ratings = ratings.count()
        if total_ratings > 0:
            average_rating = ratings.aggregate(Avg('rating'))['rating__avg']
        else:
            average_rating = 0
        self.average_rating = average_rating or 0
        self.total_ratings = total_ratings
        self.save()
    
class Rating(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='ratings')
    rating = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    # Add additional fields if needed, such as user, timestamp, etc.

    def __str__(self):
        return f"Rating for {self.product.name}: {self.rating}"


class Order(models.Model):
    user = models.ForeignKey('authentication.User', on_delete=models.CASCADE)
    products = models.ManyToManyField(Product, through='OrderItem')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()

    def __str__(self):
        return f"{self.product.name} x {self.quantity}"
