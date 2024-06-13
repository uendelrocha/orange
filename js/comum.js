import { 
    renderCarrinho,
    loadCarrinhoFromSessionStorage,
    quantidadeNoCarrinho,
} from './carrinho.js';

import { checkout } from './checkout.js';

import { 
    fetchProdutos,
    renderProdutos,
    loadProdutosFromLocalStorage,
    getProdutosFromLocalStorage
} from './produtos.js';

export const root_imagem = "../img/produtos/"
export const formatter = new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL'
})

// Função genérica para fechar um modal
export function closeModal(modalId = 'modal-checkout') {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
    renderCarrinho()
}

// Função genérica para mostrar um modal
export function showModal(modalId = 'modal-checkout', displayMode = 'flex') {
    const modal = document.getElementById(modalId);
    modal.style.display = displayMode;
}

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
export function showBalloon(msg, miliseconds = 1500) {

        // Create balloon element
        const balloon = document.createElement('div');
        balloon.textContent = msg;
        balloon.style.position = 'fixed';
        //balloon.style.bottom = '20px';
        //balloon.style.right = '20px';
        balloon.style.top = '50%';
        balloon.style.left = '25%';
        balloon.style.right = '25%';
        balloon.style.transform = "translate('-50%', '-50%')";
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


// Função genérica para inicializar a aplicação
document.addEventListener('DOMContentLoaded', () => {

    var element = null;
    element = document.getElementById('produtos');
    if (element) {
        console.log('Inicializando Produtos');
        // Carregar produtos do localStorage
        loadProdutosFromLocalStorage();
        loadCarrinhoFromSessionStorage();

        // Se não houver produtos no localStorage, buscar da API
        let qttyProdutos = getProdutosFromLocalStorage().length;
        console.log('Quantidade de produtos no localStorage: ' + qttyProdutos);
        if (qttyProdutos == 0) {
            console.log('Buscando produtos da API');
            fetchProdutos();
        } else {
            console.log('Produtos carregados do localStorage');
            renderProdutos();
        }
    }

    element = document.getElementById('carrinho');
    if (element) {
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

    renderPage();

});

export function renderPage() {
    var caption = '';
    var action = () => {};

    if (document.getElementById('produtos')) {
        caption = 'Ver carrinho';
        action = () => {
            window.location.href = '../carrinho/index.html';
        };
    } else if (document.getElementById('carrinho')) {
        caption = 'Concluir pedido';
        action = () => {
            // showModal('modal-checkout')
            checkout();
        };
    } else {
        caption = 'Continuar comprando...';
        action = () => {
            window.location.href = '../principal/index.html';
        };    
    }

    renderFooter(caption, action);
}
    
export function renderFooter(caption, action) {
    console.log('Renderizando footer')
    // Botão para limpar o carrinho
    const footerButton = document.getElementById('footer-button');
    if (footerButton) {  
        checkCarrinho(footerButton, caption, action);
    }
}

// Função genérica para renderizar produtos
function checkCarrinho(object, caption, action) {
    console.log('Verificando carrinho e atribuindo evento ao botão de rodapé')
    if (quantidadeNoCarrinho() > 0) {
        object.disabled = false;
        object.style.display = 'flex';
        object.textContent = caption;
        object.addEventListener('click', action);
        console.log('Carrinho com itens: evento habilitado')
    } else {
        object.textContent = 'Carrinho vazio';
        object.style.display = 'none';
        object.disabled = true;
        console.log('Carrinho vazio: evento desabilitado')
    }
}
