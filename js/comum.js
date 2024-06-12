import { 
    renderCarrinho,
    loadCarrinhoFromSessionStorage,
} from './carrinho.js';

import { fetchProdutos, loadProdutosFromLocalStorage } from './produtos.js';

window.showModal = showModal;

export const root_imagem = "../img/produtos/"
export const formatter = new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL'
})

// Como o código de renderização de produtos e de carrinho é muito similar, podemos criar uma função genérica para renderizar qualquer lista de itens
export function renderList(list, container, template) {
    if (container) {
        container.innerHTML = '';
        list.forEach(item => {
            const element = document.createElement('div');
            element.className = 'item';
            element.innerHTML = template(item);
            container.appendChild(element);
        });
    };
}


// Função genérica para mostrar um balão de notificação
export function showBalloon(miliseconds = 1500) {

        // Create balloon element
        const balloon = document.createElement('div');
        balloon.textContent = 'Produto adicionado ao carrinho!';
        balloon.style.position = 'fixed';
        balloon.style.bottom = '20px';
        balloon.style.right = '20px';
        balloon.style.backgroundColor = 'darkorange';
        balloon.style.color = 'white';
        balloon.style.padding = '10px';
        balloon.style.borderRadius = '5px';
    
        // Append balloon to body
        document.body.appendChild(balloon);

        balloon.style.display = 'block';
        setTimeout(() => {
            balloon.style.display = 'none';
        }, miliseconds);
    }

// Função genérica para mostrar um modal
export function showModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
}

// Função genérica para fechar um modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Função genérica para inicializar a aplicação
document.addEventListener('DOMContentLoaded', () => {

    const produtosDiv = document.getElementById('produtos');
    if (produtosDiv) {
        console.log('Inicializando Produtos');
        // Carregar produtos do localStorage
        loadProdutosFromLocalStorage();
        loadCarrinhoFromSessionStorage();
        fetchProdutos();
    }

    const carrinhoDiv = document.getElementById('carrinho');
    if (carrinhoDiv) {
        console.log('Inicializando Carrinho');
        loadProdutosFromLocalStorage();
        loadCarrinhoFromSessionStorage();
        renderCarrinho();
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Botão para limpar o carrinho
    const footerButton = document.getElementById('footer-button');
    if (footerButton) {
        if (carrinhoDiv) {
            footerButton.textContent = 'Fechar Pedido';
            footerButton.addEventListener('click', showModal);
        } else if (produtosDiv) {
            footerButton.textContent = 'Carrinho';
            footerButton.addEventListener('click', () => {
                window.location.href = '../carrinho/index.html';
            });
        } else {
            footerButton.textContent = 'Continuar comprando';
            footerButton.addEventListener('click', () => {
                // window.history.back();
                window.location.href = '../principal/index.html';
            });
        }
        //footerButton.addEventListener('click', comprar);
    }
});
