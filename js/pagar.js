let produtos = [];
let carrinho = [];

// Salvar Carrinho para a sessionStorage
function saveCarrinho() {
    sessionStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Carregar Carrinho sessionStorage
function loadCarrinho() {
    const storedCarrinho = sessionStorage.getItem('carrinho');
    if (storedCarrinho) {
        carrinho = JSON.parse(storedCarrinho);
    }
}

// Render carrinho da DOM
function renderCarrinho() {
    const carrinhoContainer = document.getElementById('carrinho');
    const totalContainer = document.getElementById('total');
    carrinhoContainer.innerHTML = '';
    let total = 0;
    carrinho.forEach(item => {
        const produtoOriginal = produtos.find(p => p.id === item.id);
        const itemElement = document.createElement('div');
        itemElement.className = 'item-carrinho';
        itemElement.innerHTML = `
            <img src="${item.imagem}" alt="${item.produto}">
            <h3>&nbsp ${item.produto}&nbsp </h3>
            <p>&nbsp R$: ${item.preco.toFixed(2)} &nbsp</p>
            <p>&nbsp Quantidade: &nbsp </p>
            <span>  ${item.quantidade} &nbsp</span>
            
            
            
            <p>&nbsp Sub-Total R$: ${(item.preco * item.quantidade).toFixed(2)} &nbsp</p>
        `;
        carrinhoContainer.appendChild(itemElement);
        total += item.preco * item.quantidade;
    });
    totalContainer.innerHTML = `Total: R$ ${total.toFixed(2)}`;

    // Botão "Continuar comprando"
    const continuarComprandoButton = document.getElementById('continuar');
    if (continuarComprandoButton) {
        continuarComprandoButton.addEventListener('click', () => {
            window.location.href = '../principal/index.html'; // Redireciona para produtos.html
        });
    }

    // Botão "confirmar"
    const pagarButton = document.getElementById('confirmar');
    if (pagarButton) {
        pagarButton.addEventListener('click', () => {
            // Salvar carrinho no localStorage antes de prosseguir para a página de pagamento
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            // Redirecionar para a página pagar.html
            window.location.href = '../principal/pago.html';
        });
    }
}

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

// Salvar produtos na localStorage
function saveProdutosToStorage() {
    localStorage.setItem('produtos', JSON.stringify(produtos));
}

// Renderizar produtos na DOM
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
                <p>Estoque: ${produto.estoque} / ${produto.estoqueTotal}</p>
                <button onclick="adicionarAoCarrinho(${produto.id})" ${produto.estoque === 0 ? 'disabled' : ''}>Adicionar ao Carrinho</button>
                <button onclick="removerDoCarrinho(${produto.id})" ${produto.estoque === 0 ? 'disabled' : ''}>Remover do Carrinho</button>
            `;
            produtosContainer.appendChild(produtoElement);
        });
    }
}


document.addEventListener('DOMContentLoaded', () => {
    console.log('Document loaded, initializing application...');
    loadCarrinho();
    renderCarrinho();

    // Botal de limpeza
    const clearCartButton = document.getElementById('esvaziarCarrinhoButton');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', esvaziarCarrinho);
    }

    loadProdutosFromStorage(); 
    fetchProdutos(); 
});

// Função para aumentar a quantidade do produto no carrinho
function aumentarQuantidade(id) {
    const itemIndex = carrinho.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        const produto = produtos.find(p => p.id === id);
        if (produto && produto.estoque > 0) {
            carrinho[itemIndex].quantidade++;
            produto.estoque--;
            saveCarrinho();
            saveProdutosToStorage(); // Salvar produtos atualizados no localStorage
            renderCarrinho();
            renderProdutos();
        }
    }
}

// Função para diminuir a quantidade do produto no carrinho
function diminuirQuantidade(id) {
    const itemIndex = carrinho.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        const produto = produtos.find(p => p.id === id);
        if (carrinho[itemIndex].quantidade > 1) {
            carrinho[itemIndex].quantidade--;
            produto.estoque++;
        } else {
            produto.estoque += carrinho[itemIndex].quantidade;
            carrinho.splice(itemIndex, 1); // Remover item se a quantidade se tornar zero
        }
        saveCarrinho();
        saveProdutosToStorage(); 
        renderCarrinho();
        renderProdutos();
    }
}

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    if (produto && produto.estoque > 0) {
        const itemIndex = carrinho.findIndex(item => item.id === id);
        if (itemIndex !== -1) {
            carrinho[itemIndex].quantidade++;
        } else {
            carrinho.push({ ...produto, quantidade: 1 });
        }
        produto.estoque--;
        saveCarrinho();
        saveProdutosToStorage();
        renderCarrinho();
        renderProdutos();
    }
}

// Função para remover produto do carrinho
function removerDoCarrinho(id) {
    const itemIndex = carrinho.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        const produto = produtos.find(p => p.id === id);
        produto.estoque += carrinho[itemIndex].quantidade;
        carrinho.splice(itemIndex, 1);
        saveCarrinho();
        saveProdutosToStorage();
        renderCarrinho();
        renderProdutos();
    }
}


function fetchProdutos() {
    
}


function loadProdutosFromStorage() {
    const storedProdutos = localStorage.getItem('produtos');
    if (storedProdutos) {
        produtos = JSON.parse(storedProdutos).map(produto => ({
            ...produto,
            estoqueTotal: produto.estoqueTotal || produto.estoque // Clonar estoque original para uma propriedade separada
        }));
        renderProdutos();
    }
}
