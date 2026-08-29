const express = require('express');
const cors = require('cors');
const SerpApi = require('google-search-results-nodejs');
const app = express();

app.use(cors());

// Cole a chave da SerpApi aqui
const search = new SerpApi.GoogleSearch("87fc0595cccddd998d8c8854086b30bde6f44ed4055636777b317f0ad342d10a");

app.get('/buscar-whatsapp', (req, res) => {
    const nomeRestaurante = req.query.nome;
    
    const nomeLimpo = nomeRestaurante.toLowerCase().replace(/pizzaria|pizza|restaurante|lanchonete|hamburgueria|sushi|delivery|cia/gi, "").trim();
    const palavrasChave = nomeLimpo.split(" ").filter(p => p.length > 2);
    
    const params = {
      engine: "google", 
      // VOLTAMOS com a palavra "delivery" para forçar o Google a mostrar o mapa de restaurantes
      q: `${nomeLimpo} delivery Governador Valadares`, 
      gl: "br", 
      hl: "pt",
      num: 20 
    };

    search.json(params, (data) => {
        try {
            let linkDelivery = null;
            let tipoLink = "";

            console.log(`\n=== Buscando: ${nomeLimpo} ===`);
            console.log("Palavras-chave exigidas:", palavrasChave);

            if (data.knowledge_graph && data.knowledge_graph.website) {
                const siteOficial = data.knowledge_graph.website;
                if (siteOficial.includes("cardapioweb") || siteOficial.includes("anota.ai") || siteOficial.includes("goomer") || siteOficial.includes("linktr.ee")) {
                    linkDelivery = siteOficial;
                    tipoLink = "Menu Digital";
                    console.log("✅ Site encontrado na ficha do Google Maps:", linkDelivery);
                }
            }

            if (!linkDelivery && data.organic_results) {
                console.log(`Analisando ${data.organic_results.length} links da web...`);
                for (let resultado of data.organic_results) {
                    const url = resultado.link.toLowerCase();
                    const tituloPesquisa = (resultado.title || "").toLowerCase();

                    // LISTA AMPLIADA DE PLATAFORMAS (Incluindo Instagram)
                    const ehDominioValido = url.includes("anota.ai") || 
                                            url.includes("goomer.app") || 
                                            url.includes("menudino.com") || 
                                            url.includes("pedidos10") ||
                                            url.includes("cardapioweb.com") || 
                                            url.includes("linktr.ee") ||       
                                            url.includes("instabio.cc") ||
                                            url.includes("deliverydireto.com.br") ||
                                            url.includes("ola.click") ||
                                            url.includes("jotaja.com") ||
                                            url.includes("instagram.com"); 

                    if (ehDominioValido) {
                        let linkCorreto = false;

                        if (palavrasChave.length === 0) {
                            linkCorreto = true; 
                        } else {
                            linkCorreto = palavrasChave.some(palavra => url.includes(palavra) || tituloPesquisa.includes(palavra));
                        }

                        if (linkCorreto) {
                            linkDelivery = resultado.link; 
                            // Se for instagram, avisa o front-end para mudar a cor do botão
                            tipoLink = url.includes("instagram.com") ? "Instagram" : "Menu Digital";
                            console.log(`✅ Site orgânico correto encontrado (${tipoLink}):`, linkDelivery);
                            break;
                        }
                    }
                }
            }

            if (!linkDelivery && data.local_results && data.local_results.length > 0) {
                console.log(`Analisando ${data.local_results.length} resultados locais...`);
                for (let estabelecimento of data.local_results) {
                    if (estabelecimento.phone) {
                        const telefoneLimpo = "55" + estabelecimento.phone.replace(/\D/g, '');
                        linkDelivery = `https://wa.me/${telefoneLimpo}`;
                        tipoLink = "WhatsApp";
                        console.log("✅ WhatsApp encontrado:", estabelecimento.phone);
                        break;
                    }
                }
            }

            if (linkDelivery) {
                res.json({ encontrado: true, link: linkDelivery, tipo: tipoLink });
            } else {
                console.log("❌ Nenhum link ou telefone compatível encontrado.");
                res.json({ encontrado: false });
            }

        } catch (erro) {
            console.error("Erro ao processar dados:", erro);
            res.json({ encontrado: false });
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API conectada rodando na porta ${PORT}`);
});