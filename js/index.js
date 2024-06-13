var cabecalho = `
    <img src="../img/logo_com_texto.png" alt="Orange" class="logo">
    <nav>
        <ul class="nav-links">
            <li><a href="../cadastro/index.html">Cadastro</a></li>
            <li><a href="../principal/index.html">Produtos</a></li>
            <li><a href="../carrinho/index.html">Carrinho</a></li>
            <div id="cart-icon">
                <i class="fas fa-shopping-cart" id="full-cart" style="display: none;"></i>
                <!-- <i class="far fa-empty" id="empty-cart"></i> -->
            </div>
            <li><a href="../login/index.html">Login</a></li>
        </ul>
        <div class="menu-toggle">
            <span class="menu-bar"></span>
            <span class="menu-bar"></span>
            <span class="menu-bar"></span>
        </div>
    </nav>
`;

document.getElementById('cabecalho').innerHTML = '';
document.getElementById('cabecalho').innerHTML = cabecalho;        

var rodape = `
    <button id="footer-button">Carrinho</button>
    <p>Desenvolvido por Alan Alves, Eduardo Lima e Uendel Rocha</p>
`;

document.getElementById('rodape').innerHTML = '';
document.getElementById('rodape').innerHTML = rodape;    

