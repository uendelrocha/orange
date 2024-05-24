let produtos = [];

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
            
        `;
        produtosContainer.appendChild(produtoElement);
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('Document loaded, initializing application...');
    
    fetchProdutos();
    renderProdutos();
});
