from django.shortcuts import render

def usuarios(request):
      # Obtiene el texto del parámetro de consulta 'text' y lo decodifica
    return render(request, 'usuarios/usuarios.html',{})
