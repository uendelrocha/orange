// Variáveis globais
import { root_imagem, formatter } from "./comum.js";

// Initialize the application
import { renderList } from "./comum.js";
import { adicionarAoCarrinho } from "./carrinho.js";

export let produtos = [];

// Tornando as funções acessíveis globalmente
window.adicionarAoCarrinho = adicionarAoCarrinho;
window.comprar = comprar;

// Função genérica para renderizar produtos
export function renderProdutos() {
    const produtosContainer = document.getElementById('produtos');
    if (produtosContainer) {
        renderList(produtos, produtosContainer, produtoTemplate);
    }
}

// Template para produtos
function produtoTemplate(produto) {
    return `
        <div class="produto-card">
            <div class="produto-imagem">
                <img class="imagem" src="${root_imagem}${produto.imagem}" alt="${produto.produto}">
            </div>
            <div class="produto-nome">
                <h3 class="nome">${produto.produto}</h3>
            </div>
            <div class="produto-preco">
                <p class="preco">${formatter.format(produto.preco)}</p>
            </div>
            <div class="produto-estoque">
                <p class="estoque">${produto.estoque} disponíveis</p>
            </div>
            <div class="produto-adicionar">
                <button onclick="adicionarAoCarrinho(${produto.id})" ${produto.estoque === 0 ? 'disabled' : ''} class="botaoAdicionar">Adicionar ao Carrinho</button>
            </div>
            <div class="produto-comprar">
                <button onclick="comprar(${produto.id})" ${produto.estoque === 0 ? 'disabled' : ''} class="botaoComprar">Comprar</button>
            </div>
        </div>
    `;
}

// Função genérica para buscar os produtos da API
export function fetchProdutos() {
    fetch('http://127.0.0.1:5000/api/produtos')
        .then(response => response.json())
        .then(data => {
            produtos = data.map((produto, index) => ({
                id: index,
                produto: produto.produto,
                preco: produto.preco,
                estoque: produto.estoque, //Math.floor(Math.random() * 10) + 1,
                imagem: produto.imagem
            }));
            renderProdutos();
            saveProdutosToLocalStorage();
        });
}

// Função genérica para comprar um item
function comprar(id) {
    adicionarAoCarrinho(id, 1, false);
    window.location.href = '../carrinho/index.html';
}

export function getProdutosFromLocalStorage() {
    var result = [];
    const produtosStorage = localStorage.getItem('produtos');
    if (produtosStorage) {
        result = JSON.parse(produtosStorage);
    }

    return result;
}

// Função genérica para carregar os produtos do localStorage
export function loadProdutosFromLocalStorage() {
    console.log('Carregando produtos do localStorage');
    produtos = getProdutosFromLocalStorage();
    console.log('Produtos em LocalStorage: ' + produtos.length);
}

// Função genérica para salvar os produtos no localStorage
export function saveProdutosToLocalStorage() {
    console.log('Salvando produtos no localStorage');
    localStorage.setItem('produtos', JSON.stringify(produtos));
}

// Função genérica para atualizar o estoque de um produto
export function atualizarEstoque(produto, quantidade) {

    const produtoIndex = produtos.findIndex(p => p.id === produto.id);
    console.log('ProdutoIndex: ' + produtoIndex);
    if (produtoIndex !== -1) {
        console.log('Atualizando estoque do produto: ' + produto.produto);
        produtos[produtoIndex].estoque += quantidade;
        saveProdutosToLocalStorage();
    }
}



