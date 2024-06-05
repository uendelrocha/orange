<?php
// Configuração do cabeçalho para permitir o acesso via API
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Dados dos produtos
$produtos = [
    [
        "id" => 1,
        "produto" => "O-Pad Retina",
        "preco" => 2249.00,
        "estoque" => 13,
        "imagem" => "../img/retina.jpeg"
    ],
    [
        "id" => 2,
        "produto" => "Notebook Orange Book Pro",
        "preco" => 2199.00,
        "estoque" => 58,
        "imagem" => "../img/notebook.jpeg"
    ],
    [
        "id" => 3,
        "produto" => "O-Phone 24",
        "preco" => 2499.00,
        "estoque" => 77,
        "imagem" => "../img/phone.jpeg"
    ],
    [
        "id" => 4,
        "produto" => "Chrome-Cast Orange",
        "preco" => 2375.00,
        "estoque" => 95,
        "imagem" => "../img/chrome-cast.jpeg"
    ],
    [
        "id" => 5,
        "produto" => "Smart TV Orange Ultra View",
        "preco" => 2999.00,
        "estoque" => 43,
        "imagem" => "../img/smart-tv.jpeg"
    ]
];

// Obtendo o método HTTP
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Retornar todos os produtos ou um produto específico
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $produto = array_filter($produtos, function($produto) use ($id) {
                return $produto['id'] === $id;
            });
            $produto = array_values($produto); // Reindexar o array
            if (count($produto) > 0) {
                echo json_encode($produto[0]);
            } else {
                echo json_encode(['error' => 'Produto não encontrado']);
            }
        } else {
            echo json_encode($produtos);
        }
        break;

    case 'POST':
        // Adicionar um novo produto (Simulado)
        $data = json_decode(file_get_contents('php://input'), true);
        $newProduto = [
            'id' => end($produtos)['id'] + 1, // Incrementar ID
            'produto' => $data['produto'],
            'preco' => $data['preco'],
            'estoque' => $data['estoque'],
            'imagem' => $data['imagem']
        ];
        $produtos[] = $newProduto;
        echo json_encode(['message' => 'Produto criado com sucesso', 'produto' => $newProduto]);
        break;

    case 'PUT':
        // Atualizar um produto (Simulado)
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $data = json_decode(file_get_contents('php://input'), true);
            $produtoAtualizado = null;
            foreach ($produtos as &$produto) {
                if ($produto['id'] === $id) {
                    $produto['produto'] = $data['produto'];
                    $produto['preco'] = $data['preco'];
                    $produto['estoque'] = $data['estoque'];
                    $produto['imagem'] = $data['imagem'];
                    $produtoAtualizado = $produto;
                    break;
                }
            }
            if ($produtoAtualizado) {
                echo json_encode(['message' => 'Produto atualizado com sucesso', 'produto' => $produtoAtualizado]);
            } else {
                echo json_encode(['error' => 'Produto não encontrado']);
            }
        }
        break;

    case 'DELETE':
        // Deletar um produto (Simulado)
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $index = -1;
            foreach ($produtos as $key => $produto) {
                if ($produto['id'] === $id) {
                    $index = $key;
                    break;
                }
            }
            if ($index !== -1) {
                array_splice($produtos, $index, 1);
                echo json_encode(['message' => 'Produto deletado com sucesso']);
            } else {
                echo json_encode(['error' => 'Produto não encontrado']);
            }
        }
        break;

    default:
        echo json_encode(['error' => 'Método não suportado']);
        break;
}
?>
