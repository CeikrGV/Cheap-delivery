// Guarda a URL atual ao abrir a página
let urlAtual = location.href;

// Transformamos a lógica em uma função para podermos chamá-la várias vezes
function iniciarBusca() {
    let tentativas = 0;
    const intervalo = setInterval(() => {
        const tituloRestaurante = document.querySelector('h1'); 
        
        if (tituloRestaurante && tituloRestaurante.innerText.trim() !== "") {
            clearInterval(intervalo);
            const nome = tituloRestaurante.innerText.trim();
            console.log("Buscando contato na API para:", nome);
            
            fetch(`http://localhost:3000/buscar-whatsapp?nome=${encodeURIComponent(nome)}`)
                .then(response => response.json())
                .then(data => {
                    if (data.encontrado) {
                        // Limpa o botão antigo se ele já existir na tela
                        const btnAntigo = document.getElementById('btn-delivery-direto');
                        if (btnAntigo) btnAntigo.remove();

                        const botao = document.createElement('a');
                        botao.id = 'btn-delivery-direto'; // Damos um ID para conseguir achá-lo depois
                        
                        if (data.tipo === "WhatsApp") {
                            botao.innerText = "🤑 Peça direto no WhatsApp";
                            botao.style.background = "#25D366";
                        } else if (data.tipo === "Instagram") {
                            botao.innerText = "📸 Ver link na bio do Instagram";
                            botao.style.background = "#E1306C"; 
                        } else {
                            botao.innerText = "🤑 Peça no Site Próprio";
                            botao.style.background = "#FF4500"; 
                        }
                        
                        botao.href = data.link; 
                        botao.target = "_blank";
                        botao.style.cssText += "position: fixed; top: 20px; right: 20px; color: white; padding: 15px 20px; z-index: 99999; border-radius: 8px; font-weight: bold; font-family: sans-serif; text-decoration: none; box-shadow: 0 4px 6px rgba(0,0,0,0.3);";
                        
                        document.body.appendChild(botao);
                    }
                })
                .catch(erro => console.error("Erro ao conectar com a API:", erro));
        } else {
            tentativas++;
            if (tentativas >= 10) clearInterval(intervalo);
        }
    }, 1000);
}

// 1. Roda a busca a primeira vez que a página abre
iniciarBusca();

// 2. O Vigia: Fica verificando a cada 1 segundo se a URL mudou
setInterval(() => {
    if (location.href !== urlAtual) {
        urlAtual = location.href;
        console.log("Troca de restaurante detectada. Reiniciando...");
        
        // Apaga o botão do restaurante anterior imediatamente
        const btnAntigo = document.getElementById('btn-delivery-direto');
        if (btnAntigo) btnAntigo.remove();
        
        // Roda a busca para o novo restaurante
        iniciarBusca();
    }
}, 1000);
