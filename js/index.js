var cabecalho =
    `<div class="cabecalho">
        <div id="logo">
            <h1>Orange</h1>
        </div>
        <div id="menu">
            <div><a href="../principal/index.html"> Produtos</a></div>
            <div><a href="../carrinho/index.html"> Carrinho</a></div>
            <div><a href="../login/index.html"><button class="botoes">Login</button></a></div>
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
