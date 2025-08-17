GitHub Search 

Aplicação desenvolvida em React + TypeScript + Vite que efetua a busca de usuários do GitHub.
Permite pesquisar por um perfil, visualizar seus dados principais e explorar repositórios de uma forma clara e organizada, contendo filtros 
para melhor busca e com uma interface intuitiva e de facil uso.

Funcionalidades:
Buscar usuários do GitHub por nome.
Exibir detalhes do usuário (seguidores, quem segue, avatar, e-mail caso disponível).
Lista repositórios com ordenação por nome, estrelas e data de atualização.
Tratamentos de erros e estados de carregamento.
Layout responsivo com suporte a dark mode.

Tecnologias utilizadas:
React 18 + hooks
TypeScript
Vite
React Router DOM (para gerenciamento das rotas)
Context API (para estado global)
Tailwind (para estilização e responsividade)
Jest + Testing Library (para testes automatizados)
Fontawesome (utilizado apenas para ícones no projeto)

src/
├── components/   Componentes reutilizáveis (Search, Error, DataUser, RepoDetails, etc.)
├── context/      Context API (UserProvider, UserContext)
├── routes/       Rotas principais da aplicação (Home, etc.)
├── types/        Tipagens TypeScript
├── api/          Funções de acesso à API do GitHub
└── tests/        Testes unitários
obs:
Optei por utilizar a pasta routes/ no lugar de pages/ para deixar explícito que cada arquivo dentro dela representa uma rota principal da aplicação (ex: Home). Assim, a estrutura reflete melhor a responsabilidade de cada módulo e evita confusão com componentes auxiliares.

Como rodar o projeto 
Pré requisitos
Node.js (>=18)
npm ou yarn

Instalação 
npm install

Ambiente de desenvolvimento
npm run dev

Rodar Testes 
npm test

Testes
Foram implementados testes unitários para os principais componente e rotas.
Atualmente, os 22 efetuados estão aptos.

Observações
Este projeto foi desenvolvido com foco em:
Clareza no código (clean code e separação de responsabilidades).
Experiencia do usuário (retorno visual em carregamentos e erros (Não utilizei setTimeout para simular carregamentos, pois optei por trabalhar diretamente com estados de loading e respostas reais da API. Isso garante feedback imediato e evita atrasos artificiais para o usuário. Caso seja necessário, a aplicação pode ser facilmente ajustada para incluir simulações de latência.)
Escalabilidade (estrutura organizada e tipagens fortes com TypeScript)

