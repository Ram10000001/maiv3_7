# En tu archivo views.py
from django.shortcuts import render
from urllib.parse import unquote

def editor(request):
    text = unquote(request.GET.get('text', ''))  # Obtiene el texto del parámetro de consulta 'text' y lo decodifica
    questions = text.split('</div><div>')  # Divide el texto en preguntas individuales
    return render(request, 'editor/editor.html', {'questions': questions})
