import { esvaziarCarrinho, getItensDoCarrinho } from "./carrinho.js";
import { atualizarEstoque } from "./produtos.js";
import { closeModal, showBalloon, showModal } from "./comum.js";

window.checkout = checkout;

export function confirmarCompra() {
  // Obter a forma de pagamento selecionada
  var pagamento = document.querySelector('input[name="pagamento"]:checked').value;

  // Obter os itens do carrinho
  var itens = getItensDoCarrinho();

  // Atualizar o estoque para cada item
  for (var i = 0; i < itens.length; i++) {
      atualizarEstoque(itens[i], -itens[i].quantidade);
  }

  // Exibir mensagem de sucesso
  showBalloon("Pagar com " + pagamento + " realizado com sucesso!", 5000);

  // Limpar o carrinho e atualizar a tela
  esvaziarCarrinho();
  closeModal('resumo-carrinho');

  // Redirecionar para a tela de produtos
  window.location.href = '../principal/index.html';

  //atualizarTela();
}

// Função genérica para mostrar um modal
function show() {
  const modal_checkout = `
    <div id="modal-checkout" class="modal-content">
        <span class="close">&times;</span>
        <div id="checkout-content"></div>
    </div>
  `;
  
  // document.getElementById('modal-checkout').innerHTML = modal_checkout; 
  document.getElementById('resumo-carrinho').innerHTML = modal_checkout;

  const checkoutContent = `
    <div class="modal-header">
      <h3>Forma de Pagamento</h3>
    </div>
    <div class="opcao-pagamento">
      <label>
          <input type="radio" name="pagamento" value="pix" checked> Pix<br>
      </label>
    </div>
    <div class="opcao-pagamento">
      <label>
          <input type="radio" name="pagamento" value="cartao"> Cartão de Crédito
      </label>
    </div>
    <div class="opcao-pagamento">
      <label>
          <input type="radio" name="pagamento" value="boleto"> Boleto
      </label>
    </div>
    <div class="confirmar-compra">
      <button id="confirmar-compra" class="checkout-button">Pagar</button>
    </div>
  `;


  document.getElementById('checkout-content').innerHTML = checkoutContent;

  // Fechar o modal quando o usuário clicar fora dele
  window.onclick = function(event) {
    const modalCheckout = document.getElementById('modal-checkout');
    if (event.target == modalCheckout) {
        modalCheckout.style.display = 'none';
    }
  }

  // Fechar o modal quando o usuário clicar no botão de fechamento
  document.querySelector('#modal-checkout .close').onclick = function() {
    closeModal('modal-checkout');
  }

  document.getElementById('confirmar-compra').onclick = confirmarCompra;

  showModal("modal-checkout");
}

export function checkout() {
  if (getItensDoCarrinho().length === 0) {
    showBalloon("Seu carrinho está vazio!");
    return;
  } else {
    show();
  }
}
