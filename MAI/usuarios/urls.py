from . import views
from django.urls import path

urlpatterns = [
    path('usuarios/', views.usuarios, name="usuarios"),
]