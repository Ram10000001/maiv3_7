import psycopg2

connection = None

try:
    connection = psycopg2.connect(
        dbname="neuronas",
        user="postgres",
        password="R@ms123",
        host="localhost",
        port="5432"
    )
    print("Conexión exitosa")
except Exception as e:
    print(f"Error de conexión: {e}")
    print(f"Detalles del error: {e.args}")
finally:
    if connection:
        connection.close()

