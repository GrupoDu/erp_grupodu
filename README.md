# ERP Grupo Du

Esse repositório guarda todo o backend do **ERP** do Grupo Du. Uma única API para todo o ecossistema do Grupo Du.

---

## Stack de desenvolvimento

- Node.js
- TypeScript
- PostgreSQL
- Prisma ORM
- Express.js
- ESLint
- Prettier
- Socket.io

---

## Rodando o projeto

Primeiro é necessário configura o `.env` com as variáveis necessárias:

- DATABASE_URL: URL do banco de dados
- DIRECT_URL: URL direta para o banco de dados
- DEV_PORT: Porta da aplicação em desenvolvimento
- FRONTEND_URL: URL para o frontend em produção
- DEV_URL: URL local do frontend
- NODE_ENV: Ambiente atual (development || production)
- JWT_SECRET: Secret do access token
- REFRESH_SECRET: Secret para refresh token
- SALT_ROUNDS: Salt para o bycript
- TRELLO_KEY: Key do trello
- TRELLO_TOKEN: Token do trello
- TRELLO_LIST_ID: ID da lista do trello

---

Depois de configuras as variáveis de ambiente, execute um dos seguintes comandos para instalar as dependências:

```
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

Após instalar as dependências, execute o comando `npx prisma migrate dev` para criar o banco de dados e o comando `npm run dev` para rodar o projeto.

> [!HINT]
> Também é possível usar o script `npm run prisma:pull`, `pnpm prisma:pull` ou `yarn prisma:pull` para criar o banco de dados e gerar o prisma client.
