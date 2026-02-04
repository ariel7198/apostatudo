## Desafio Técnico — Gestão de Profissionais e Níveis

Este projeto foi desenvolvido como resposta a um **desafio técnico**, com foco em **organização, clareza de decisões técnicas e qualidade da implementação**.

A aplicação entrega uma solução completa **fullstack**, composta por backend com API REST e frontend em formato SPA, seguindo boas práticas de desenvolvimento.

---

## Contexto

A aplicação consiste em um **sistema de cadastro de profissionais**, associados a diferentes níveis.

A solução contém:
- **Backend** com API REST
- **Frontend** em formato **SPA (Single Page Application)** consumindo essa API

---

## Tecnologias utilizadas

### Backend
- Node.js 20+
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- Railway (deploy)

### Frontend
- Nuxt 3
- Vue 3 (Composition API)
- TypeScript
- Tailwind CSS
- Lucide Icons
- Vercel (deploy)

---

## Estrutura do projeto

O projeto está organizado em um único repositório (monorepo):

O frontend consome o backend através de uma API REST.
---

## Backend — API REST

A API segue padrões RESTful, utilizando corretamente os métodos HTTP e códigos de status.


## Frontend — SPA

Interface desenvolvida como SPA utilizando Nuxt 3.

### Telas implementadas

#### Níveis
- Listagem
- Criação
- Edição
- Remoção

#### Profissionais
- Listagem
- Criação
- Edição
- Remoção
- Associação com níveis

A navegação utiliza páginas e modais, com feedback visual e estados de carregamento (skeleton loading).

---

## Como rodar o projeto

### Pré-requisitos
- Node.js 20 ou superior
- PostgreSQL
- npm ou pnpm

---

### Backend

Acesse a pasta do backend:

## 🌐 Deploy

### Backend
- Deploy realizado no Railway
- Banco de dados PostgreSQL em produção
- Variáveis de ambiente configuradas no painel da plataforma

### Frontend
- Deploy realizado no Vercel
- URL da API configurada via variável de ambiente

---

## Como testar a aplicação

1. Acesse o frontend pelo navegador
2. Cadastre níveis
3. Cadastre profissionais
4. Edite profissionais e níveis
5. Associe profissionais a níveis
6. Remova registros
7. Verifique feedbacks visuais e mensagens de erro

---

## Principais decisões técnicas

- Uso do Prisma ORM para migrations e tipagem forte
- Separação clara entre frontend e backend
- Uso de variáveis de ambiente para configuração
- API REST bem definida e consistente
- Interface simples, funcional e responsiva

---

## Observações finais

- O projeto não utiliza Docker
- Todo o setup manual está documentado neste arquivo
- O foco foi entregar uma solução clara, organizada e funcional dentro do prazo proposto

--- 

Obrigado pela oportunidade e pela avaliação.