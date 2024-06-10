from PIL import Image
import argparse

# Create the argument parser
parser = argparse.ArgumentParser(description='Convert logo image to favicon.ico')

# Add the input_path argument
parser.add_argument('input_path', type=str, help='Path to the input logo image')

# Add the output_path argument
parser.add_argument('output_path', type=str, help='Path to save the favicon.ico')

# Parse the command line arguments
args = parser.parse_args()

# Caminho do arquivo de entrada e de saída
input_path = args.input_path
output_path = args.output_path

# Lista de tamanhos típicos de favicon
favicon_sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]

# Abrir a imagem original
original_image = Image.open(input_path)

# Criar uma lista de imagens redimensionadas
images = [original_image.resize(size, Image.LANCZOS) for size in favicon_sizes]

# Salvar todas as imagens no formato ICO
for i, image in enumerate(images):
  image.save(f'{output_path[:-4]}_{favicon_sizes[i][0]}x{favicon_sizes[i][1]}.ico', format='ICO')
  #original_image.save(output_path, format='ICO', sizes=favicon_sizes)

print("Favicon.ico criado com sucesso!")
