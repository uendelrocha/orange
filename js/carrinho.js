// Variáveis globais de comum.js
import { root_imagem, formatter, renderPage } from "./comum.js";
import { produtos, renderProdutos } from "./produtos.js";

// Tornando as funções acessíveis globalmente
window.saveCarrinhoToSessionStorage = saveCarrinhoToSessionStorage;
window.aumentarQuantidade = aumentarQuantidade;
window.diminuirQuantidade = diminuirQuantidade;
window.removerDoCarrinho = removerDoCarrinho;
window.esvaziarCarrinho = esvaziarCarrinho;

// Initialize the application
import {
    renderList,
    showBalloon,
} from "./comum.js";

export let carrinho = [];


export function getItensDoCarrinho() {
    return carrinho;
}

// Função genérica para renderizar carrinho
export function renderCarrinho() {
    console.log('Renderizando carrinho');
    renderCartIcon();
    renderPage();
    const carrinhoContainer = document.getElementById('carrinho');
    if (carrinhoContainer) {
        const resumoContainer = document.getElementById('resumo-carrinho');
        renderList(carrinho, carrinhoContainer, carrinhoTemplate);
        // Calcula o total do carrinho
        // Acumula o valor total de cada item no carrinho
        let valor_subtotal = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
        let qtd_subtotal = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
        resumoContainer.innerHTML = `
            <div class="subtotal-quantidade">
                <h4 class="rotulo">Itens</h4>
                <p class="items-count">${qtd_subtotal}</p>
            </div>
            <div class="subtotal-valor">
                <h4 class="rotulo">Subtotal</h4>
                <p class="subtotal">${formatter.format(valor_subtotal)}</p>
            </div>
            <div class="subtotal-checkout">
                <button class="checkout-button" onclick="checkout()">Concluir pedido</button>
            </div>
            `;
    };
}


// Template para itens do carrinho
function carrinhoTemplate(item) {
    const produto = produtos.find(p => p.id === item.id);
    return `
    <div class="cart-order">
        <div class="cart-item">
            <div class="item-imagem">
                <img class="product-image" src="${root_imagem}${item.imagem}" alt="${item.produto}"></img>
            </div>
            <div class="product-details">
                <h3 class="product-name">${item.produto}</h3>
                <h4 class="price">${formatter.format(item.preco)}</h4>
                <p class="availability">${produto ? produto.estoque : ''} disponíveis</p>
                <div class="quantity">
                    <button class="minus" onclick="diminuirQuantidade(${item.id})">-</button>
                    <span class="quantity-number">${item.quantidade}</span>
                    <button class="plus" onclick="aumentarQuantidade(${item.id})">+</button>
                    <h4 class="item-total">${formatter.format(item.preco * item.quantidade)}</h4>
                </div>
                <button class="remove" onclick="removerDoCarrinho(${item.id})">Excluir</button>
            </div>
        </div>
    </div>
    `;
    
    
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
            showBalloon("Produto adicionado ao carrinho!");
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
    console.log('Removendo item do carrinho');
    const item = carrinho.find(item => item.id === id);
    const produto = produtos.find(p => p.id === id);
    if (item && produto) {
        console.log('Removendo item: ' + item);
        console.log('Removendo produto: ' + produto);
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
    //localStorage.clear();
    sessionStorage.clear();
    renderProdutos();
    renderCarrinho();
}



// Função genérica para carregar o carrinho do sessionStorage
export function loadCarrinhoFromSessionStorage() {
    console.log('Carregando carrinho do sessionStorage');
  const carrinhoStorage = sessionStorage.getItem('carrinho');
  if (carrinhoStorage) {
      carrinho = JSON.parse(carrinhoStorage);
      renderCarrinho();
  }
}

// Função genérica para salvar o carrinho no sessionStorage
export function saveCarrinhoToSessionStorage() {
  sessionStorage.setItem('carrinho', JSON.stringify(carrinho));
}

export function getCarrinhoFromSessionStore() {
    return JSON.parse(sessionStorage.getItem('carrinho'));
}

// Função genérica que retorna a quantidade de itens no carrinho
export function quantidadeNoCarrinho() {
    return carrinho.reduce((acc, item) => acc + item.quantidade, 0);
}

function renderCartIcon() {
    console.log('Renderizando ícone do carrinho');
    var cartItems = quantidadeNoCarrinho();
    console.log('Quantidade de itens no carrinho: ' + cartItems);
    var fullCartIcon = document.getElementById('full-cart');
    var emptyCartIcon = document.getElementById('empty-cart');
    if (cartItems > 0) {
        fullCartIcon.style.display = 'block';
        // emptyCartIcon.style.display = 'none';
        console.log('Ícone do carrinho cheio: ' + fullCartIcon);
    } else {
        fullCartIcon.style.display = 'none';
        //emptyCartIcon.style.display = 'block';
        console.log('Ícone do carrinho cheio: ' + emptyCartIcon);
    }    
}
