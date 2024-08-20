Comando para atulizar aplicação no docker
Parar o contêiner existente (se estiver em execução):
# docker stop my-money-app

Remover o contêiner existente:
# docker rm my-money-app

Construir a imagem do Docker a partir do Dockerfile (garanta que você esteja no diretório do seu aplicativo 
# docker build -t my-money-app .

Executar um novo contêiner a partir da imagem recém-criada:
# docker run -p 8888:8888 --name my-money-app -d my-money-app