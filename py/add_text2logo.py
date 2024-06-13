from PIL import Image, ImageDraw, ImageFont

# Caminho do arquivo de entrada e de saída
input_path = "./logo_transparente.png"  # Substitua pelo caminho real do seu arquivo logo_transparente.png
output_path = "./logo_com_texto.png"  # Substitua pelo caminho desejado para salvar o logo_com_texto.png

# Abrir a imagem original
image = Image.open(input_path).convert("RGBA")

# Tamanho da imagem original
width, height = image.size

# Adicionar espaço à direita para o texto
new_width = width + 150  # Ajuste conforme necessário para o texto
new_image = Image.new("RGBA", (new_width, height), (255, 255, 255, 0))
new_image.paste(image, (0, 0))

# Adicionar a palavra "Orange" estilizada
draw = ImageDraw.Draw(new_image)
try:
    # Carregar uma fonte padrão do PIL
    font = ImageFont.truetype("arial", 40)  # Você pode ajustar o tamanho da fonte conforme necessário
except IOError:
    # Usar uma fonte padrão se a fonte personalizada não estiver disponível
    font = ImageFont.load_default()

# Definir a posição do texto
text = "Orange"
text_color = (255, 102, 0, 255)  # Cor laranja
text_position = (width + 10, (height - 40) // 2)  # Ajustar a posição conforme necessário

# Adicionar o texto à nova imagem
draw.text(text_position, text, font=font, fill=text_color)

# Salvar a imagem com o texto
new_image.save(output_path, "PNG")

print("Imagem com texto criada com sucesso!")
