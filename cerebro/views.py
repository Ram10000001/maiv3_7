from django.shortcuts import render
from .models import Pregunta
from django.http import JsonResponse
# from .corpus import tous
from .geminitools import procesar_preg
import json

def enviar(request):  # Envia la respuesta del usuario y la guarda en BD
    if request.method == 'POST':
        userText = request.POST.get('userText')  # Obtiene el prompt desde JS
        procesar_preg(userText)
        return JsonResponse({'respuesta': userText})
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)


def recibir(request):  # Obtiene la ultima respuesta de Gemini guardada en la BD
    if request.method == 'POST':
        ultimaRespuesta = Pregunta.objects.latest('id').parts
        return JsonResponse({'respuesta': ultimaRespuesta})
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)


def enviarAPrompt(request):  # Envia las variables materia y grado al prompt
    if request.method == 'POST':
        data = json.loads(request.body)
        request.session['materia'] = data.get('materia')
        request.session['nombre'] = data.get('nombre')
        return JsonResponse({'status': 'ok'})
    else:
        return JsonResponse({'status': 'bad request'}, status=400)


def renderizar_pagina(request):
    return render(request, "cerebro/res.html", {})


def borrar(request):
    return render(request, 'cerebro/borrar.html', {})

#Borrar despues
def api_test(request):
    data = {'message': 'Hello from Django!'}
    return JsonResponse(data)