from . import views
from django.urls import path

urlpatterns = [
    # path('uwu/', views.uwu, name="uwu"),
    path('enviar/', views.enviar, name="enviar"),
    path('recibir/', views.recibir, name="recibir"),
    path("chat/", views.renderizar_pagina, name="renderizar_pagina"),
    path("borrar/", views.borrar, name="borrar"),

]
