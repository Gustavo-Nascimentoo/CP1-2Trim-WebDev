# 🎬 CineVerse

> **CP1 — 2º Trimestre — WebDev — Criando o novo TV Time**

## 👤 Integrante

- **Gustavo Almeida Lopes do Nascimento**
- **RM:** 571070

---

## 📌 Sobre o projeto

O **CineVerse** é uma plataforma web desenvolvida em React para pessoas que acompanham filmes e séries.

O projeto surgiu a partir do desafio de criar um MVP inspirado no problema apresentado na proposta **"Criando o novo TV Time"**.

A plataforma busca facilitar o acompanhamento de séries e episódios, permitindo que o usuário organize seus conteúdos, registre o que já assistiu e descubra qual episódio deve assistir em seguida.

O visual do projeto teve como principal referência o **Letterboxd**, além de elementos observados no **Netflix** e no **Spotify**.

---

## 💡 Problema

Pessoas que acompanham várias séries podem ter dificuldade para lembrar:

- Quais séries estão acompanhando;
- Em qual temporada pararam;
- Qual foi o último episódio assistido;
- Qual episódio devem assistir em seguida;
- Quais conteúdos desejam assistir posteriormente.

---

## 🚀 Solução

O CineVerse centraliza essas informações em uma plataforma web.

A aplicação permite:

- 🔎 Descobrir e pesquisar séries;
- 📺 Visualizar detalhes de séries;
- 📚 Visualizar temporadas e episódios;
- ✅ Marcar episódios como assistidos;
- ▶️ Identificar o próximo episódio;
- 📊 Acompanhar o progresso das séries;
- 🔖 Organizar conteúdos para assistir;
- ⭐ Registrar avaliações;
- 📝 Registrar opiniões;
- 💬 Comentar conteúdos;
- ⚠️ Proteger comentários com spoilers;
- 📋 Criar listas;
- 👤 Visualizar perfil e estatísticas;
- 👥 Interagir com recursos de comunidade.

---

## ✨ Funcionalidades

### 🔎 Descoberta e busca

- Séries em destaque na página inicial;
- Busca de séries pelo nome;
- Exibição dos resultados encontrados;
- Página de detalhes das séries.

### 📺 Acompanhamento de séries

- Adicionar séries à lista de acompanhamento;
- Remover séries da lista;
- Visualizar temporadas;
- Visualizar episódios;
- Marcar episódios como assistidos;
- Desmarcar episódios;
- Visualizar o progresso;
- Identificar o próximo episódio.

### 📚 Biblioteca e listas

- Histórico de conteúdos assistidos;
- Conteúdos que o usuário deseja assistir;
- Criação de listas personalizadas;
- Organização dos conteúdos.

### ⭐ Avaliações

- Avaliação de conteúdos;
- Registro de opiniões;
- Visualização das avaliações.

### 💬 Comunidade

- Comentários;
- Comentários com spoiler;
- Exclusão dos próprios comentários;
- Usuários para seguir;
- Atividade da comunidade.

### 👤 Perfil

- Histórico;
- Estatísticas pessoais;
- Listas;
- Avaliações;
- Preferência relacionada à proteção contra spoilers.

---

## 🛠️ Tecnologias utilizadas

- ⚛️ React
- ⚡ Vite
- 🛣️ React Router DOM
- 🎨 CSS
- 🔎 TMDB API
- 🎯 React Icons
- 💾 localStorage
- 💻 JavaScript

---

## ⚛️ React

O projeto utiliza **componentização** para dividir a aplicação em componentes reutilizáveis.

Também são utilizados:

- Props;
- `useState`;
- `useEffect`;
- `useMemo`;
- Hooks customizados;
- Renderização de listas;
- Eventos;
- Formulários;
- Componentes reutilizáveis.

O código dos componentes utiliza **arrow functions**.

---

## 🛣️ Rotas

O CineVerse utiliza React Router para criar múltiplas páginas, layout compartilhado e rotas dinâmicas.

| Rota | Página |
|---|---|
| `/` | Home |
| `/busca` | Busca |
| `/minha-lista` | Minha lista |
| `/biblioteca` | Biblioteca |
| `/listas` | Listas |
| `/comunidade` | Comunidade |
| `/perfil` | Perfil |
| `/serie/:id` | Detalhes da série |
| `/serie/:id/temporada/:temporada` | Temporada |
| `*` | Página não encontrada |

---

## 🌐 API — TMDB

O projeto utiliza a **The Movie Database (TMDB)** para obter informações sobre séries.

A API é utilizada para:

- Séries em alta;
- Pesquisa de séries;
- Detalhes das séries;
- Temporadas;
- Episódios.

### Documentação

https://developer.themoviedb.org/docs/getting-started

A chave da API deve ser configurada através da variável de ambiente:

```env
VITE_TMDB_API_KEY=sua_chave_aqui
