from PIL import Image
import argparse

# Create the argument parser
parser = argparse.ArgumentParser(description='Remove o fundo branco de uma imagem')

# Add the input_path argument
parser.add_argument('input_path', type=str, help='Arquivo de imagem com fundo branco a ser processado')

# Add the output_path argument
parser.add_argument('output_path', type=str, help='Arquivo de imagem de saída com fundo transparente')

# Parse the command line arguments
args = parser.parse_args()

# Caminho do arquivo de entrada e de saída
input_path = args.input_path
output_path = args.output_path


# Abrir a imagem original
image = Image.open(input_path).convert("RGBA")

# Processar a imagem para tornar o fundo transparente
datas = image.getdata()

new_data = []
for item in datas:
    # Mudança de fundo branco para transparente
    if item[:3] == (255, 255, 255):
        new_data.append((255, 255, 255, 0))
    else:
        new_data.append(item)

image.putdata(new_data)

# Salvar a imagem com fundo transparente
image.save(output_path, "PNG")

print("Imagem com fundo transparente criada com sucesso!")
