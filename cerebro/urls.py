from django.urls import path, include  # Asegúrate de importar 'include'
from . import views

urlpatterns = [
    path('enviar/', views.enviar, name="enviar"),
    path('recibir/', views.recibir, name="recibir"),
    path("chat/", views.renderizar_pagina, name="renderizar_pagina"),
    path("borrar/", views.borrar, name="borrar"),
    path('enviarPrompt/', views.enviarPrompt, name="enviarPrompt"),
]

