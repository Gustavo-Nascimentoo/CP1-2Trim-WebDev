# CineVerse

> CP1 — 2º Trimestre — WebDev — "Criando o novo TV Time"

## Integrantes do grupo

- [Nome completo 1]


## Problema

O TV Time encerrou suas atividades em julho de 2026 e apagou os dados de
todos os usuários. Quem acompanhava várias séries ao mesmo tempo perdeu a
forma mais simples de responder a uma pergunta recorrente: **"em que
episódio eu parei?"**.

## Solução

O **CineVerse** é uma plataforma web para descobrir séries, marcar quais
delas você está acompanhando e registrar episódio a episódio o que já foi
assistido. A partir disso, a aplicação calcula e exibe, para cada série,
exatamente qual é o próximo episódio a assistir — sem precisar lembrar de
nada.

### Funcionalidades

- Descobrir séries em alta na semana (Home).
- Buscar séries pelo nome.
- Ver detalhes de uma série: sinopse, nota, ano e lista de temporadas.
- Marcar/desmarcar uma série como "acompanhando".
- Marcar/desmarcar episódios de uma temporada como assistidos, com barra
  de progresso.
- Ver, na página "Minha lista", o próximo episódio não assistido de cada
  série acompanhada (ou "Você está em dia!" quando não há pendências).
- Remover uma série da lista de acompanhamento.

## Tecnologias

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router DOM v6](https://reactrouter.com/) — rotas, layout e rotas
  dinâmicas
- [react-icons](https://react-icons.github.io/react-icons/) — ícones
- `localStorage` — persistência do progresso do usuário (sem back-end)

## API usada

[TMDB — The Movie Database](https://developer.themoviedb.org/docs/getting-started)
(`/trending/tv/week`, `/search/tv`, `/tv/{id}`,
`/tv/{id}/season/{season_number}`).

## Uso de IA

Este projeto foi desenvolvido seguindo a metodologia de **Spec Driven
Development**: a especificação (`docs/requirements.md` e
`docs/architecture.md`) foi definida antes da implementação do código,
guiando as decisões técnicas e de produto tomadas pelo grupo.

A IA (Claude) foi utilizada como apoio em:

- Estruturação da especificação (requisitos, user stories, arquitetura de
  componentes e rotas) a partir do problema escolhido pelo grupo.
- Geração do código inicial dos componentes, páginas, hooks e estilos,
  seguindo a arquitetura definida na especificação.

A IA (Chatgpt) foi utilizada como apoio em:

Arrumar problemas de deploy no Vercel

- As decisões do site sobre design e outros tipos de arquitetura foram
  escolhidos por mim

## Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- Uma chave de API gratuita do TMDB ([criar conta e gerar chave aqui](https://www.themoviedb.org/settings/api))

### Passo a passo

```bash
# 1. Instale as dependências
npm install

# 2. Crie o arquivo de variáveis de ambiente a partir do exemplo
cp .env.example .env

# 3. Abra o arquivo .env e cole sua chave da TMDB (API Key v3 auth)
#    VITE_TMDB_API_KEY=sua_chave_aqui

# 4. Rode o projeto em modo desenvolvimento
npm run dev
```

O terminal vai mostrar um endereço local (algo como
`http://localhost:5173`) — abra-o no navegador.

### Build de produção

```bash
npm run build
npm run preview
```

### Deploy

O projeto está pronto para deploy na [Vercel](https://vercel.com/):
importe o repositório do GitHub, defina o framework como **Vite** e
adicione a variável de ambiente `VITE_TMDB_API_KEY` nas configurações do
projeto na Vercel (Settings → Environment Variables) antes de publicar.

## Documentação completa

- [`docs/requirements.md`](docs/requirements.md) — objetivo, público,
  user stories, critérios de aceitação, estados e regras do produto.
- [`docs/architecture.md`](docs/architecture.md) — páginas, rotas,
  componentes, props, estados e efeitos.
- [`docs/references/references.md`](docs/references/references.md) —
  referências visuais e justificativas de design.
