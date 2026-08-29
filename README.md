# 🍔 Delivery Direto (Extensão & API)

Um MVP (Produto Mínimo Viável) composto por uma extensão de navegador e uma API em Node.js. O objetivo do projeto é identificar restaurantes acessados no iFood e buscar automaticamente os canais de venda direta do estabelecimento (WhatsApp, Instagram ou cardápios digitais próprios), ajudando usuários a economizarem em taxas e apoiando o comércio local.

## 🚀 Funcionalidades

- **Detecção Inteligente:** O *content script* da extensão identifica dinamicamente mudanças de página em Single Page Applications (SPA) para buscar sempre o restaurante correto.
- **Motor de Busca Automatizado:** A API consulta o Google (via SerpApi) cruzando o nome do restaurante com a cidade de Governador Valadares.
- **Filtro de Falsos Positivos:** O algoritmo limpa o nome do restaurante e exige compatibilidade de palavras-chave para garantir que o link retornado pertença realmente à loja.
- **Suporte a Múltiplas Plataformas:** Identifica links de sistemas como Anota AI, Goomer, Cardápio Web, MenuDino, Pedidos10, além de agregadores (Linktree) e Instagram.
- **Botão Dinâmico:** A interface da extensão se adapta ao tipo de canal encontrado (ex: verde para WhatsApp, rosa para Instagram, laranja para site próprio).

## 🛠️ Tecnologias Utilizadas

**Front-end (Extensão Chrome):**
- JavaScript (Vanilla)
- Manipulação de DOM e `MutationObserver` (setInterval)
- Fetch API

**Back-end (API Rest):**
- Node.js
- Express
- CORS
- SerpApi (Google Search API)
- Hospedado no Render

## ⚙️ Como rodar o projeto localmente

### 1. Configurando a API (Back-end)
1. Clone este repositório:
   ```bash
   git clone [https://github.com/CeikrGV/api-delivery-direto.git](https://github.com/CeikrGV/api-delivery-direto.git)

2. Acesse a pasta do projeto e instale as dependências:

Bash
npm install

3. Crie uma conta no SerpApi e obtenha sua chave gratuita.

4. Adicione a sua chave no arquivo server.js (Lembre-se de não commitar a chave em repositórios públicos).

5. Inicie o servidor:

Bash
npm start

### 2. Instalando a Extensão (Front-end)
1. Abra o Google Chrome e acesse chrome://extensions/.

2. Ative o Modo do desenvolvedor no canto superior direito.

3. Clique em Carregar sem compactação e selecione a pasta onde estão os arquivos manifest.json e content.js.

4. Acesse o iFood, abra a página de um restaurante e o botão aparecerá no canto superior direito!

🛣️ Roadmap e Próximos Passos
O backlog do projeto e o mapeamento de novas funcionalidades estão sendo gerenciados no Taiga.io para facilitar a divisão de tarefas em sprints ágeis. Os próximos passos incluem:

[ ] Migrar a chave da SerpApi para variáveis de ambiente (.env).

[ ] Implementar Rate Limiting e configurar regras de CORS para aceitar requisições apenas do domínio do iFood.

[ ] Ampliar a lista de domínios de cardápios digitais mapeados.

[ ] Publicar a extensão oficialmente na Chrome Web Store.

Desenvolvido como projeto prático de Sistemas de Informação para validar conceitos de integração de APIs, desenvolvimento web e microsserviços na nuvem.
