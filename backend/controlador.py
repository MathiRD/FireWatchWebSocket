from flask import Flask, jsonify
import subprocess, os, signal

app = Flask(__name__)
processo = None

@app.route('/start')
def iniciar():
    global processo
    if not processo:
        processo = subprocess.Popen(['python','sensor.py'], cwd=os.path.dirname(__file__))
        return jsonify({'status':'sensor iniciado'})
    return jsonify({'status':'já em execução'})

@app.route('/stop')
def parar():
    global processo
    if processo:
        os.kill(processo.pid, signal.SIGTERM)
        processo = None
        return jsonify({'status':'sensor parado'})
    return jsonify({'status':'sensor já parado'})

if __name__=='__main__':
    app.run(port=5000)