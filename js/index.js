var array = [{
    produto: "Notebook HP",
    preco: 2249.00,
    estoque: 13,    
},
{
    produto: "Notebook Samsung",
    preco: 2199.00,
    estoque: 58,    
},
{
    produto: "Notebook Dell",
    preco: 2499.00,
    estoque: 77,    
},
{
    produto: "Notebook Lenovo",
    preco: 2375.00,
    estoque: 95,    
},
{
    produto: "Notebook Sony Vaio",
    preco: 2999.00,
    estoque: 43,    
}
];

for (i = 0; i < array.length; i++)
{
    var conteudo =
    `<div class="card">
        <div class="card-capa">
            <img src="img/produto.webp" />
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
    document.getElementById('divConteudo').innerHTML += conteudo;
}

