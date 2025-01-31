# My Money Frontend

## Descrição

Este é o frontend do projeto **My Money**, uma aplicação baseada em React e Redux para gerenciamento financeiro. Ele utiliza o **AdminLTE** como tema de interface e está configurado com **Webpack** para o build e desenvolvimento.

## Tecnologias Utilizadas

- **React 15.4.2**
- **Redux 3.6.0** (com Redux Thunk, Redux Promise e Redux Multi)
- **React-Router 3.0.2**
- **Axios 0.15.3**
- **AdminLTE 2.3.6**
- **Chart.js 2.9.3 e React-Chartjs-2 2.9.0**
- **Lodash 4.17.4**
- **Font Awesome 4.7.0 e Ionicons 3.0.0**

## Instalação

Para instalar as dependências do projeto, execute:

```sh
npm install
```

## Scripts Disponíveis

### Desenvolvimento

```sh
npm run dev
```

Este comando inicia o servidor de desenvolvimento do Webpack com suporte a Hot Module Replacement (HMR).

### Build para Produção

```sh
npm run build
```

Este comando gera os arquivos otimizados para produção.

### Produção (Build e Otimização)

```sh
npm run production
```

Executa o Webpack no modo de produção, otimizando o código para melhor desempenho.

## Estrutura do Projeto

- `src/` - Contém o código-fonte do projeto.
- `public/` - Contém arquivos estáticos.
- `webpack.config.js` - Arquivo de configuração do Webpack.
- `package.json` - Gerenciador de dependências e scripts do projeto.

## Licença

Este projeto está licenciado sob a licença ISC.

