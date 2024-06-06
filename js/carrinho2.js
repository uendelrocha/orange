let produtos = [];
let carrinho = [];

// Save carrinho to sessionStorage
function saveCarrinho() {
    sessionStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Load carrinho from sessionStorage
function loadCarrinho() {
    const storedCarrinho = sessionStorage.getItem('carrinho');
    if (storedCarrinho) {
        carrinho = JSON.parse(storedCarrinho);
    }
}

// Render carrinho to the DOM
function renderCarrinho() {
    const carrinhoContainer = document.getElementById('carrinho');
    const totalContainer = document.getElementById('total');
    carrinhoContainer.innerHTML = '';
    let total = 0;
    carrinho.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item-carrinho';
        itemElement.innerHTML = `
            <img src="${item.imagem}" alt="${item.produto}">
            <h3>${item.produto}</h3>
            <p> &nbsp; R$: ${item.preco.toFixed(2)}</p>
            <p> &nbsp; Quantidade: ${item.quantidade}</p>
        `;
        carrinhoContainer.appendChild(itemElement);
        total += item.preco * item.quantidade;
    });
    totalContainer.innerHTML = `Total: R$ ${total.toFixed(2)}`;
}

// Clear the cart and update UI
function esvaziarCarrinho() {
    // Atualizar o estoque dos produtos no carrinho
    carrinho.forEach(item => {
        const produtoOriginal = produtos.find(p => p.id === item.id);
        if (produtoOriginal) {
            produtoOriginal.estoque += item.quantidade;
        }
    });

    // Esvaziar o carrinho
    carrinho = [];
    sessionStorage.removeItem('carrinho');
    renderCarrinho();
    saveProdutosToStorage(); // Salvar os produtos atualizados no localStorage
    renderProdutos(); // Atualizar a renderização dos produtos
}

// Save produtos to localStorage
function saveProdutosToStorage() {
    localStorage.setItem('produtos', JSON.stringify(produtos));
}

// Render produtos to the DOM
function renderProdutos() {
    const produtosContainer = document.getElementById('produtos');
    if (produtosContainer) {
        produtosContainer.innerHTML = '';
        produtos.forEach(produto => {
            const produtoElement = document.createElement('div');
            produtoElement.className = 'produto';
            produtoElement.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.produto}">
                <h3>${produto.produto}</h3>
                <p>R$ ${produto.preco.toFixed(2)}</p>
                <p>Estoque: ${produto.estoque}</p>
                <button onclick="adicionarAoCarrinho(${produto.id})" ${produto.estoque === 0 ? 'disabled' : ''}>Adicionar ao Carrinho</button>
                <button onclick="removerDoCarrinho(${produto.id})">Remover do Carrinho</button>
            `;
            produtosContainer.appendChild(produtoElement);
        });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('Document loaded, initializing application...');
    loadCarrinho();
    renderCarrinho();

    // Set up the clear cart button
    const clearCartButton = document.getElementById('esvaziarCarrinhoButton');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', esvaziarCarrinho);
    }

    loadProdutosFromStorage(); // Load products from localStorage first
    fetchProdutos(); // Fetch from API if localStorage is empty
});

// Placeholder functions for adicionarAoCarrinho and removerDoCarrinho
function adicionarAoCarrinho(id) {
    // Implementar lógica para adicionar produto ao carrinho e atualizar estoque
}

function removerDoCarrinho(id) {
    // Implementar lógica para remover produto do carrinho e atualizar estoque
}

// Placeholder function for fetchProdutos and loadProdutosFromStorage
function fetchProdutos() {
    // Implementar lógica para buscar produtos da API
}

function loadProdutosFromStorage() {
    // Implementar lógica para carregar produtos do localStorage
}
