from django.shortcuts import render
from urllib.parse import unquote
import re
from django.http import JsonResponse

from django.shortcuts import render, redirect
from urllib.parse import unquote

def editor(request):
    if request.method == 'POST':
        # Obtiene el texto del cuerpo de la solicitud
        text = unquote(request.POST.get('text', ''))
        
        # Divide el texto en preguntas individuales
        questions = text.split('</div><div>')
        
        # Almacena las preguntas en la sesión
        request.session['questions'] = questions
        
        # Redirige a la misma vista con una solicitud GET
        return redirect('editor')  # Nombre de la ruta de la vista o URL del editor

    elif request.method == 'GET':
        # Recupera las preguntas de la sesión
        questions = request.session.get('questions', [])
        
        # Crea una lista de objetos de pregunta
        question_objects = [{'text': question} for question in questions]

        # Renderiza la página con las preguntas
        return render(request, 'editor/editor.html', {'questions': question_objects})

    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)


"""def editor(request):
    # Obtiene el texto del parámetro de consulta 'text' y lo decodifica
    text = unquote(request.GET.get('text', ''))
    # Divide el texto en preguntas individuales
    questions = text.split('</div><div>')

    # Crea una lista de objetos de pregunta
    question_objects = [{'text': question} for question in questions]

    return render(request, 'editor/editor.html', {'questions': question_objects })
"""