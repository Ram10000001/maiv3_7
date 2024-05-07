# En tu archivo views.py
from django.shortcuts import render
from urllib.parse import unquote

def login(request):

    return render(request, 'login/login.html', {})


def registro(request):

    return render(request, 'login/registro.html', {})

