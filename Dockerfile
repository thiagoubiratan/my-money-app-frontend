# Use uma imagem de node com uma versão específica
FROM node:20

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app/my-money-app-frontend

# Copie os arquivos de configuração (package.json e package-lock.json) para o diretório de trabalho
COPY package*.json ./

# Copie os arquivos de configuração (package.json e package-lock.json) para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install --force

# Copie todos os arquivos do projeto para o diretório de trabalho
COPY . .

# Construa o aplicativo React para produção
RUN npm run build

# Exponha a porta que a aplicação React vai rodar (pode variar dependendo da configuração do seu aplicativo)
EXPOSE 8888

# Comando para iniciar o servidor web do aplicativo React
CMD ["npm", "run", "dev"]
