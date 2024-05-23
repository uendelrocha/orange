var cabecalho =
    `<div class="cabecalho">
        <div id="logo">
            <h1>Orange</h1>
        </div>
        <div id="menu">
            
            <div><a href="../cadastro/index.html"> Cadastro</a></div>
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

var array = [{
    produto: "Notebook HP",
    preco: 2249.00,
    estoque: 13, 
    imagem: "computador1.jpg"   
},
{
    produto: "Notebook Samsung",
    preco: 2199.00,
    estoque: 58,  
    imagem: "computador2.jpg"  
},
{
    produto: "Notebook Dell",
    preco: 2499.00,
    estoque: 77,    
    imagem: "computador3.jpg"
},
{
    produto: "Notebook Lenovo",
    preco: 2375.00,
    estoque: 95,  
    imagem: "computador4.jpg"  
},
{
    produto: "Notebook Sony Vaio",
    preco: 2999.00,
    estoque: 43,   
    imagem: "computador5.jpg" 
}
];
document.getElementById('divProdutos').innerHTML = '';
for (i = 0; i < array.length; i++)
{
    var produto =
    `<div class="card">
        <div class="card-capa">
            <img src="../img/${array[i].imagem}" />
        </div>
        <div class="card-corpo">
            <div class="card-corpo-produto">${array[i].produto}</div> 
            <div>
                Preço: <b> R$ ${array[i].preco.toFixed(2)} </b> <br>
                Estoque: <b> ${array[i].estoque} </b> <br>
            </div>
        </div>
        <div class="card-add-carrinho">
            <i class="fa-solid fa-cart-plus"></i> Adicionar ao Carrinho
        </div>
    </div>`;
    document.getElementById('divProdutos').innerHTML += produto;
}
