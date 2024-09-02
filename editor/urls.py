from . import views
from django.urls import path

urlpatterns = [
    path('editor/', views.editor, name="editor"),
]
