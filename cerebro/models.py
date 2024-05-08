from django.db import models

# Create your models here.
class Pregunta(models.Model):
    role = models.TextField(null = True, blank = True)
    parts = models.TextField(max_length = 2000)
    #fecha = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    
    def __str__(self):
        return self.texto
    