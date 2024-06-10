import { renderCarrinho, esvaziarCarrinho, loadCarrinhoFromSessionStorage } from './carrinho.js';
import { produtos, fetchProdutos, loadProdutosFromLocalStorage } from './produtos.js';

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
function showModal() {
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
    console.log('Inicializando Produtos');

    const produtosDiv = document.getElementById('produtos');
    if (produtosDiv) {
        // Carregar produtos do localStorage
        loadProdutosFromLocalStorage();
        loadCarrinhoFromSessionStorage();
        fetchProdutos();
    }

    const carrinhoDiv = document.getElementById('carrinho');
    if (carrinhoDiv) {
        loadCarrinhoFromSessionStorage();
        renderCarrinho();
    }

    // Botão para limpar o carrinho
    const clearCartButton = document.getElementById('esvaziarCarrinhoButton');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', esvaziarCarrinho);
    }
});
