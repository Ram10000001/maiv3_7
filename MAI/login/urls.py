from . import views
from django.urls import include, path

urlpatterns = [
    path('login/', views.login, name="login"),
    path('registro/', views.registro,name="registro"),
]
