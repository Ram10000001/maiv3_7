# En tu archivo views.py
from django.shortcuts import render
from urllib.parse import unquote
import re

def editor(request):
    # Obtiene el texto del parámetro de consulta 'text' y lo decodifica
    text = unquote(request.GET.get('text', ''))
    # Divide el texto en preguntas individuales
    questions = text.split('</div><div>')

    # Crea una lista de objetos de pregunta
    question_objects = [{'text': question,
                         'delete_link': '#',
                         'edit_link': '#'} for question in questions]

    return render(request, 'editor/editor.html', {'questions': question_objects})
