var cabecalho =
    `<div class="cabecalho">
        <div id="logo_top">
            <img src="../img/logo_top.png" alt="logo_top" />
        </div>
        <div id="menu">
            
                <li><a href="../cadastro/index.html">Cadastro</a></li>
                <li><a href="../principal/index.html">Produtos</a></li>
                <li><a href="../carrinho/index.html">Carrinho</a></li>
                <li><a href="../login/index.html"><button class="botoes">Login</button></a></li>
            
        </div>
    </div>`;

document.getElementById('divCabecalho').innerHTML = '';
document.getElementById('divCabecalho').innerHTML = cabecalho;        

var rodape =
    `<div class="rodape">
        <div>Desenvolvido por Alan Alves, Eduardo Lima e Uendel Rocha</div>            
    </div>`;

document.getElementById('divRodape').innerHTML = '';
document.getElementById('divRodape').innerHTML = rodape;    

