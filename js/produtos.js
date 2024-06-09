let produtos = [];
let carrinho = [];
let root_imagem = "../img/estoque/"
const formatter = new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL'
})

function loadProdutosFromStorage() {
    const storedProdutos = localStorage.getItem('produtos');
    if (storedProdutos) {
        produtos = JSON.parse(storedProdutos);
        renderProdutos();
    }
}

// Fetch produtos from the server
function fetchProdutos() {
    console.log('Fetching produtos...');

    loadProdutosFromStorage();

    if (produtos.length === 0) {
        fetch('http://127.0.0.1:5000/api/produtos')
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
                saveProdutosToStorage(); // Save fetched products to localStorage
                renderProdutos();
            })
            .catch(error => console.error('Erro ao carregar produtos:', error));
    }
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
    if (produtosContainer) {
        produtosContainer.innerHTML = '';
        produtos.forEach(produto => {
            const elementoCard = document.createElement('div');
            elementoCard.className = 'produto-card';
            
            const elementoImagem = document.createElement('div');
            elementoImagem.className = 'produto-imagem';

            const elementoNome = document.createElement('div');
            elementoNome.className = 'produto-nome';

            const elementoPreco = document.createElement('div');
            elementoPreco.className = 'produto-preco';

            const elementoEstoque = document.createElement('div');
            elementoEstoque.className = 'produto-estoque';

            const elementoAdicionarCarrinho = document.createElement('div');
            elementoAdicionarCarrinho.className = 'produto-adicionar';

            const elementoComprar = document.createElement('div');
            elementoComprar.className = 'produto-comprar';

            prod_imagem = root_imagem.concat(produto.imagem);
            elementoImagem.innerHTML  = `<img class="imagem" src="${prod_imagem}" alt="${produto.produto}">`;
            elementoNome.innerHTML    = `<h3 class="nome">${produto.produto}</h3>`;
            elementoPreco.innerHTML   = `<p class="preco">${formatter.format(produto.preco)}</p>`;
            elementoEstoque.innerHTML = `<p class="estoque">${produto.estoque} disponíveis</p>`;
            elementoAdicionarCarrinho.innerHTML = `<button onclick="adicionarAoCarrinho(${produto.id})" ${produto.estoque === 0 ? 'disabled' : ''} class="botaoAdicionar">Adicionar ao Carrinho</button>`;
            elementoComprar.innerHTML = `<button onclick="comprar(${produto.id})" ${produto.estoque === 0 ? 'disabled' : ''} class="botaoComprar">Comprar</button>`;
            
            elementoCard.appendChild(elementoImagem);
            elementoCard.appendChild(elementoNome);
            elementoCard.appendChild(elementoPreco);
            elementoCard.appendChild(elementoEstoque);
            elementoCard.appendChild(elementoAdicionarCarrinho);
            elementoCard.appendChild(elementoComprar)
            
            produtosContainer.appendChild(elementoCard);
        });
    }
}

function showBalloon() {
    // Create balloon element
    const balloon = document.createElement('div');
    balloon.textContent = 'Produto adicionado ao carrinho!';
    balloon.style.position = 'fixed';
    balloon.style.bottom = '20px';
    balloon.style.right = '20px';
    balloon.style.backgroundColor = 'lightgreen';
    balloon.style.padding = '10px';
    balloon.style.borderRadius = '5px';

    // Append balloon to body
    document.body.appendChild(balloon);

    // Remove balloon after 1 second
    setTimeout(() => {
        balloon.remove();
    }, 1000);
};

// Add product to cart
function adicionarAoCarrinho(id, mostrarBalao = true) {
    const produto = produtos.find(p => p.id === id);
    if (produto && produto.estoque > 0) {
        produto.estoque--;
        const itemCarrinho = carrinho.find(item => item.id === id);
        if (itemCarrinho) {
            itemCarrinho.quantidade++;
        } else {
            carrinho.push({ ...produto, quantidade: 1 });
        }
        // Save updated products to localStorage
        saveProdutosToStorage();
        // Save updated cart to sessionStorage
        saveCarrinho();
        // Redirect to the cart page

        if (mostrarBalao) {
            showBalloon();
        }
    }
}

function comprar(id) {
    adicionarAoCarrinho(id, false);
    window.location.href = '../carrinho/index.html';
    }

// Remove produto from carrinho
function removerDoCarrinho(id) {
    const produtoIndex = carrinho.findIndex(item => item.id === id);
    if (produtoIndex !== -1) {
        const produto = carrinho[produtoIndex];
        // Aumentar o estoque do produto removido
        const produtoOriginal = produtos.find(p => p.id === id);
        if (produtoOriginal) {
            produtoOriginal.estoque += produto.quantidade;
        }
        // Remover o produto do carrinho
        carrinho.splice(produtoIndex, 1);
    }

    saveProdutosToStorage(); // Save updated products to localStorage
    renderProdutos();
    saveCarrinho(); // Save updated cart to sessionStorage
}

function saveProdutosToStorage() {
    localStorage.setItem('produtos', JSON.stringify(produtos));
}

// Clear the cart and storage
function esvaziarCarrinho() {
    carrinho = [];
    produtos.forEach(produto => {
        const itemCarrinho = carrinho.find(item => item.id === produto.id);
        if (itemCarrinho) {
            produto.estoque += itemCarrinho.quantidade;
        }
    });
    localStorage.clear();
    sessionStorage.clear();
    renderProdutos();
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('Document loaded, initializing application...');
    loadProdutosFromStorage(); // Load products from localStorage first
    loadCarrinho();
    fetchProdutos(); // Fetch from API if localStorage is empty

    // Set up the clear cart button
    const clearCartButton = document.getElementById('esvaziarCarrinhoButton');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', esvaziarCarrinho);
    }
});
