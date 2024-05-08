def repeated_composite_to_json(repeated_composite):
    # Itera sobre el objeto RepeatedComposite y une todas las cadenas de texto
    json_text = ''.join(repeated_composite)
    return json_text


def repeated_composite_to_json(repeated_composite):
    # Convierte el objeto RepeatedComposite a una cadena de texto
    text = str(repeated_composite)
    # Encuentra el índice donde comienza el JSON
    start_index = text.find('{')
    # Extrae la parte del texto que es JSON
    json_text = text[start_index:]

    return json_text


def eliminar_cadenas(s):
    s = s.replace("```json", "")
    s = s.replace("```", "")
    return s



