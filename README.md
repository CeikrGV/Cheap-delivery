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
