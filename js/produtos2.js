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
    
    saveCarrinho();
}



// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('Document loaded, initializing application...');
    loadCarrinho();
    fetchProdutos();
    
});
