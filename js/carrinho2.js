
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
            <h3>${item.produto}  </h3>  <!-- Espaço adicionado aqui -->
            <p> &nbsp R$: ${item.preco.toFixed(2)}  </p>  <!-- Espaço adicionado aqui -->
            <p>  &nbsp Quantidade: ${item.quantidade}</p> <!-- Espaço adicionado aqui -->
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
   
    renderCarrinho();
});
