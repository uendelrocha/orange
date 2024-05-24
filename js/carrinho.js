let produtos = [];
let carrinho = [];

// Fetch produtos from the server
function fetchProdutos() {
    console.log('Fetching produtos...');
    fetch('http://localhost/orange/produtos.json')
        .then(response => {
            console.log('Response received:', response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Produtos carregados:', data);
            produtos = data;
            renderProdutos();
        })
        .catch(error => console.error('Erro ao carregar produtos:', error));
}

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

// Render produtos to the DOM
function renderProdutos() {
    const produtosContainer = document.getElementById('produtos');
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
        `;
        produtosContainer.appendChild(produtoElement);
    });
}

// Add produto to carrinho
function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    if (produto && produto.estoque > 0) {
        produto.estoque--;
        const itemCarrinho = carrinho.find(item => item.id === id);
        if (itemCarrinho) {
            itemCarrinho.quantidade++;
        } else {
            carrinho.push({ ...produto, quantidade: 1 });
        }
    }
    renderProdutos();
    renderCarrinho();
    saveCarrinho();
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
            <p>R$ ${item.preco.toFixed(2)}</p>
            <p>Quantidade: ${item.quantidade}</p>
        `;
        carrinhoContainer.appendChild(itemElement);
        total += item.preco * item.quantidade;
    });
    totalContainer.innerHTML = `Total: R$ ${total.toFixed(2)}`;
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('Document loaded, initializing application...');
    loadCarrinho();
    fetchProdutos();
    renderCarrinho();
});
