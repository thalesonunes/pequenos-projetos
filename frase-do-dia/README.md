# Frase do Dia / Quote of the Day
O projeto consiste em gerar frases aleatórias e seus respectivos autores.

# <img src="https://img.icons8.com/color/48/000000/html-5--v1.png"/><img src="https://img.icons8.com/color/48/000000/css3.png"/>![https://img.icons8.com/color/48/000000/javascript--v1.png](https://img.icons8.com/color/48/000000/javascript--v1.png)<img src="https://img.icons8.com/color/48/000000/json--v1.png"/><img src="https://img.icons8.com/color/48/000000/api.png"/>

#### Funcionalidades:

- Selecionar entre frases em português e inglês.
- Ouvir a frase.
- Copiar a frase para a área de transferência.
- Compartilhar via Twitter.
- Gerar novas frases.

#### Recursos utilizados:

- É consumido um API que gera randomicamente uma frase em inglês.
- É consumida arquivo .JSON criado no Realtime Database do Firebase, que contém várias frases em português. Este arquivo futuramente será gerenciada através de uma API própria.
- Utilização do SpeechSynthesisUtterance para fazer a leitura das frases.
