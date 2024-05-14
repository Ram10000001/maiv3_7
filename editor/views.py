# En tu archivo views.py
from django.shortcuts import render
from urllib.parse import unquote
import re

def editor(request):
    text = unquote(request.GET.get('text', ''))  # Obtiene el texto del parámetro de consulta 'text' y lo decodifica
    questions = text.split('</div><div>')  # Divide el texto en preguntas individuales

    # Agrega la clase 'pregunta-estilo' a los divs con la clase 'pregunta'
    questions = [re.sub(r'<div class="pregunta', '<div class="pregunta pregunta-box', question) for question in questions]

    return render(request, 'editor/editor.html', {'questions': questions})
