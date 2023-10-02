# Projeto Back-End com NodeJS, TypeScript, Express, SQL e SQLite

Bem-vindo ao projeto Back-End onde praticamos a criação de uma API vinculada a um banco de dados real. Este projeto é uma ótima oportunidade para aprimorar suas habilidades em NodeJS, TypeScript, Express, SQL e SQLite, além de trabalhar com o Knex para interagir com o banco de dados.

## Tabelas do Banco de Dados 📊

O banco de dados contém quatro tabelas essenciais:

### Tabela de Usuários 👤

- **Nome da Tabela:** `users`
- **Colunas:**
  - `id`
  - `name`
  - `email`
  - `password`
  - `created_at`

### Tabela de Produtos 🛒

- **Nome da Tabela:** `products`
- **Colunas:**
  - `id`
  - `name`
  - `price`
  - `description`
  - `image_url`

### Tabela de Registro de Compras 💸

- **Nome da Tabela:** `purchases`
- **Colunas:**
  - `id`
  - `buyer`
  - `total_price`
  - `created_at`

### Tabela de Registro de Produtos Comprados 🧾

- **Nome da Tabela:** `purchases_products`
- **Colunas:**
  - `purchase_id`
  - `product_id`
  - `quantity`

## Caminhos das Requisições (Paths) 🛣

Para interagir com a API, utilize os seguintes caminhos (Paths):

- Requisições de Usuários: `/users`
- Requisições de Produtos: `/products`
- Requisições de Compras: `/purchases`

## Endpoints Implementados ✅

Nós já implementamos os seguintes endpoints na nossa API:

- [x]  **Get all users:** Obtenha todos os usuários cadastrados.
- [x]  **Create user:** Crie um novo usuário.
- [x]  **Create product:** Adicione um novo produto ao catálogo.
- [x]  **Get all products:** Obtenha informações sobre todos os produtos disponíveis.
- [x]  **Edit product by id:** Atualize as informações de um produto com base no ID.
- [x]  **Create purchase:** Registre uma nova compra.
- [x]  **Delete purchase by id:** Exclua uma compra com base no ID.
- [x]  **Get purchase by id:** Obtenha detalhes de uma compra específica.

## Prints das Respostas das Requisições 📸

- **Get all users:** ![Imagem1](link-da-imagem-1)
- **Create user:** ![Imagem2](link-da-imagem-2)
- **Create product:** ![Imagem3](link-da-imagem-3)
- **Get all products:** ![Imagem4](link-da-imagem-4)
- **Edit product by id:** ![Imagem5](link-da-imagem-5)
- **Create purchase:** ![Imagem6](link-da-imagem-6)
- **Delete purchase by id:** ![Imagem7](link-da-imagem-7)
- **Get purchase by id:** ![Imagem8](link-da-imagem-8)

Sinta-se à vontade para atualizar os links das imagens e personalizar o README conforme necessário. Este é um guia interativo para o seu projeto Back-End, tornando-o mais amigável para colaboradores e usuários. 🚀