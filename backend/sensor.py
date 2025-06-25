import socket
import time
import random
from datetime import datetime

def gerar_dados_sensor():
    temperatura = round(random.uniform(25, 60), 1)
    umidade = round(random.uniform(10, 90), 1)
    fumaca = random.choice([0, 1])

    alertas = []
    if temperatura > 45:
        alertas.append(f"Temperatura crítica: {temperatura}ºC")
    elif temperatura > 35:
        alertas.append(f"Temperatura elevada: {temperatura}ºC")
    if umidade < 20:
        alertas.append(f"Umidade muito baixa: {umidade}%")
    if fumaca:
        alertas.append("Fumaça detectada!")

    dados = {
        "timestamp": datetime.now().strftime("%H:%M:%S"),
        "temperatura": temperatura,
        "umidade": umidade,
        "fumaca": fumaca,
        "alertas": alertas
    }
    return dados

def sensor():
    while True:
        dados = gerar_dados_sensor()
        mensagem = (
            f"{dados['timestamp']} !! Alerta\n"
            f"Temperatura: {dados['temperatura']}ºC, Umidade: {dados['umidade']}%, Fumaça: {'Sim' if dados['fumaca'] else 'Não'}\n"
        )
        if dados['alertas']:
            mensagem += "ALERTAS: " + "; ".join(dados['alertas'])
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.connect(('localhost', 9090))
            s.sendall(mensagem.encode())
        print(f"[Sensor] Dados enviados:\n{mensagem}\n")
        time.sleep(10)

if __name__ == "__main__":
    sensor()