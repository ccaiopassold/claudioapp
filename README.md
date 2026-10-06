# ClaudioCK

> **Organize seu dia. Construa sua rotina.**

O **ClaudioCK** é uma aplicação de organização pessoal desenvolvida para ajudar o usuário a gerenciar **hábitos e compromissos** em um único lugar.

O projeto foi desenvolvido com foco em uma experiência simples, organizada e adaptada para dispositivos móveis, funcionando como uma **PWA (Progressive Web App)**.

## Acesse o projeto

**Aplicação:** https://claudioapp.vercel.app/

**Repositório:** https://github.com/ccaiopassold/claudioapp

---

## Funcionalidades

### Autenticação

* Cadastro de usuários
* Login de usuários
* Autenticação utilizando **JWT**
* Senhas armazenadas com hash utilizando **bcryptjs**
* Dados associados individualmente a cada usuário

### Hábitos

* Criar hábitos
* Visualizar hábitos
* Editar hábitos
* Excluir hábitos
* Marcar hábitos como concluídos
* Informar categoria, frequência e horário

### Compromissos

* Criar compromissos
* Visualizar compromissos
* Editar compromissos
* Excluir compromissos
* Alterar o estado do compromisso
* Informar título, data, horário, local e descrição

### PWA

* Instalação no celular
* Ícone próprio do aplicativo
* Tela de abertura
* Manifesto PWA
* Service Worker
* Cache de arquivos principais
* Interface adaptada para dispositivos móveis
* Possibilidade de adicionar o aplicativo à tela inicial

---

## Tecnologias utilizadas

### Frontend

* HTML5
* CSS3
* JavaScript
* PWA
* Service Worker
* Web App Manifest

### Backend

* Node.js
* Express
* JSON Web Token (JWT)
* bcryptjs
* CORS
* dotenv

### Banco de dados

* PostgreSQL
* Node-Postgres (`pg`)

### Hospedagem

* **Frontend:** Vercel
* **Backend:** Render
* **Banco de dados:** Render PostgreSQL

---

## Arquitetura

O ClaudioCK utiliza uma arquitetura separando a interface, a API e o banco de dados:

```text
┌─────────────────────┐
│       Usuário       │
│      Celular/Web    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│       Vercel        │
│      Frontend       │
│     HTML/CSS/JS     │
└──────────┬──────────┘
           │ HTTPS
           ▼
┌─────────────────────┐
│       Render        │
│       Backend       │
│   Node.js + Express │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│       Render        │
│     PostgreSQL      │
└─────────────────────┘
```

---

## Estrutura do projeto

```text
claudioapp/
│
├── assets/
│   └── img/
│       ├── claudio.png
│       ├── icon-192.png
│       └── icon-512.png
│
├── backend/
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── compromissoController.js
│   │   └── habitoController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── compromissoRoutes.js
│   │   └── habitoRoutes.js
│   │
│   └── server.js
│
├── index.html
├── manifest.json
├── script.js
├── service-worker.js
├── style.css
├── package.json
├── package-lock.json
└── .gitignore
```

---

## Banco de dados

O projeto utiliza PostgreSQL com três tabelas principais.

### `usuarios`

Armazena os dados das contas cadastradas.

```text
id
nome
email
senha
criado_em
```

### `habitos`

Armazena os hábitos vinculados aos usuários.

```text
id
usuario_id
nome
categoria
frequencia
horario
criado_em
```

### `compromissos`

Armazena os compromissos vinculados aos usuários.

```text
id
usuario_id
titulo
data
horario
local
descricao
concluido
```

Os hábitos e compromissos possuem relacionamento com o usuário por meio de `usuario_id`._
