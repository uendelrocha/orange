// Variáveis globais de comum.js
import { root_imagem, formatter } from "./comum.js";
import { produtos, renderProdutos } from "./produtos.js";

// Tornando as funções acessíveis globalmente
window.saveCarrinhoToSessionStorage = saveCarrinhoToSessionStorage;
window.aumentarQuantidade = aumentarQuantidade;
window.diminuirQuantidade = diminuirQuantidade;
window.removerDoCarrinho = removerDoCarrinho;

// Initialize the application
import {
    renderList,
    showBalloon,
} from "./comum.js";

export let carrinho = [];

// Função genérica para renderizar carrinho
export function renderCarrinho() {
    const carrinhoContainer = document.getElementById('carrinho');
    if (carrinhoContainer) {
        const totalContainer = document.getElementById('total');
        renderList(carrinho, carrinhoContainer, carrinhoTemplate);
        let total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
        totalContainer.innerHTML = `Total: ${formatter.format(total)}`;
    };
}


// Template para itens do carrinho
function carrinhoTemplate(item) {
    const produto = produtos.find(p => p.id === item.id);
    return `
        <div class="item-carrinho">
            <img src="${root_imagem}${item.imagem}" alt="${item.produto}">
            <h3>${item.produto}</h3>
            <p>${formatter.format(item.preco)}</p>
            <p>Quantidade:</p>
            <span>${item.quantidade}</span>
            <button onclick="diminuirQuantidade(${item.id})">-</button>
            <button onclick="aumentarQuantidade(${item.id})">+</button>
            <button onclick="removerDoCarrinho(${item.id})">x</button>
            <p>${produto ? produto.estoque : ''} disponíveis</p>
            <p>Sub-Total: ${formatter.format(item.preco * item.quantidade)}</p>
        </div>
    `;
}

// Função genérica para adicionar um item ao carrinho
export function adicionarAoCarrinho(id, qtty = 1, mostrarBalao = true) {
    const produto = produtos.find(p => p.id === id);
    if (produto) {
        const item = carrinho.find(item => item.id === id);
        if (item) {
            item.quantidade += qtty;
        } else {
            carrinho.push({ ...produto, quantidade: qtty });
        }
        //produto.estoque--;
        //saveProdutosToStorage();
        //renderProdutos();
        saveCarrinhoToSessionStorage();
        renderCarrinho();

        if (mostrarBalao) {
            showBalloon();
        }
    }
}

// Função genérica para aumentar a quantidade de um item no carrinho
export function aumentarQuantidade(id) {
    const item = carrinho.find(item => item.id === id);
    const produto = produtos.find(p => p.id === id);
    console.log('Produto: ' + produto);
    console.log("Item: " + item);
    if (item && produto && produto.estoque > 0) {
        item.quantidade++;
        //produto.estoque--;
        //saveProdutosToStorage();
        //renderProdutos();
        saveCarrinhoToSessionStorage();
        renderCarrinho();
    }
}

// Função genérica para diminuir a quantidade de um item no carrinho
export function diminuirQuantidade(id) {
    const item = carrinho.find(item => item.id === id);
    const produto = produtos.find(p => p.id === id);
    if (item && produto) {
        item.quantidade--;
        //produto.estoque++;
        if (item.quantidade === 0) {
            const itemIndex = carrinho.indexOf(item);
            carrinho.splice(itemIndex, 1);
        }
        //saveProdutosToStorage();
        //renderProdutos();
        saveCarrinhoToSessionStorage();
        renderCarrinho();
    }
}

// Função genérica para remover um item do carrinho
export function removerDoCarrinho(id) {
    const item = carrinho.find(item => item.id === id);
    const produto = produtos.find(p => p.id === id);
    if (item && produto) {
        //produto.estoque += item.quantidade;
        const itemIndex = carrinho.indexOf(item);
        carrinho.splice(itemIndex, 1);
        //saveProdutosToStorage();
        //renderProdutos();
        saveCarrinhoToSessionStorage();
        renderCarrinho();
    }
}

// Função genérica para esvaziar o carrinho
export function esvaziarCarrinho() {
    carrinho = [];
/*     produtos.forEach(produto => {
        const item = carrinho.find(item => item.id === produto.id);
        if (item) {
            produto.estoque += item.quantidade;
        }
    });
 */
    //saveCarrinhoToSessionStorage();
    localStorage.clear();
    sessionStorage.clear();
    renderProdutos();
    renderCarrinho();
}

// Função genérica para carregar o carrinho do sessionStorage
export function loadCarrinhoFromSessionStorage() {
  const carrinhoStorage = sessionStorage.getItem('carrinho');
  if (carrinhoStorage) {
      carrinho = JSON.parse(carrinhoStorage);
  }
}

// Função genérica para salvar o carrinho no sessionStorage
export function saveCarrinhoToSessionStorage() {
  sessionStorage.setItem('carrinho', JSON.stringify(carrinho));
}
