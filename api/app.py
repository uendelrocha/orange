from flask import Flask, jsonify
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Permite solicitações de qualquer origem

# Dados de estoque
# Lê o arquivo JSON de produtos
with open("produtos.json", 'r') as arquivo:
    produtos = json.load(arquivo)
		

# Rota para obter todos os produtos
@app.route('/api/produtos', methods=['GET'])
def get_produtos():
    return jsonify(produtos)

# Rota para obter um produto específico por ID
@app.route('/api/produtos/<int:id>', methods=['GET'])
def get_produto(id):
    produto = next((p for p in produtos if p["id"] == id), None)
    if produto is None:
        return jsonify({"error": "Produto não encontrado"}), 404
    return jsonify(produto)

if __name__ == '__main__':
    app.run(debug=True)
		