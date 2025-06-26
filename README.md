# FireWatch - Monitoramento de Incêndios Florestais

## Descrição
Sistema distribuído simulando sensores que detectam incêndios em áreas florestais. Usa TCP para transporte de dados e WebSocket para dashboard em tempo real.

## Tecnologias
- Python (socket, asyncio, websockets, flask)
- JavaScript (Chart.js, WebSocket, Fetch API)
- HTML/CSS

## Instalação
1. Clone este repositório:
   ```bash
   git clone https://github.com/MathiRD/FireWatchWebSocket.git
   ```
2. Vá para o diretório backend e instale as dependências:
   ```bash
   cd firewatch/backend
   pip install -r requirements.txt
   ```

## Uso
1. Inicie o controlador Flask:
   ```bash
   python controlador.py
   ```
2. Em outro terminal, execute o servidor:
   ```bash
   python servidor.py
   ```
3. Abra o dashboard no navegador:
   - Clique duas vezes em `firewatch/frontend/index.html`
   - **Ou**, inicie um servidor HTTP simples dentro da pasta `frontend`:
     ```bash
     cd firewatch/frontend
     python -m http.server 8000
     ```
     e abra `http://localhost:8000` no navegador.

## Integrantes
- Matheus Durigon - RA 1134695
- Erick De Nardi  - RA 1134724
