from django.urls import path
from . import views

urlpatterns = [
    path("chat/", views.renderizar_pagina, name="renderizar_pagina"),
    path('enviar/', views.enviar, name="enviar"),
    path('recibir/', views.recibir, name="recibir"),
    path("borrar/", views.borrar, name="borrar"),
    path('enviarAPrompt/', views.enviarAPrompt, name="enviarAPrompt"),
]
