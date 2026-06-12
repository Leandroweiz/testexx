// ==========================================
// GERADOR DE PARTÍCULAS / BOLHAS
// ==========================================
function geradorDeBolhas() {
    const espacoVisivel = document.querySelector(".particles");
    if (!espacoVisivel) return;

    espacoVisivel.innerHTML = "";

    for (let i = 0; i < 20; i++) {
        const bolha = document.createElement("div");
        bolha.classList.add("particle");

        const larguraTamanho = Math.random() * 18 + 6;
        const posicionamentoHorizontal = Math.random() * 100;
        const esperaParaSubir = Math.random() * 5;
        const tempoDeVoo = Math.random() * 6 + 6;
        const balancoParaOLado = (Math.random() * 60) - 30;

        bolha.style.width = larguraTamanho + "px";
        bolha.style.height = larguraTamanho + "px";
        bolha.style.left = posicionamentoHorizontal + "%";
        bolha.style.animationDelay = esperaParaSubir + "s";
        bolha.style.setProperty("--duracao", tempoDeVoo + "s");
        bolha.style.setProperty("--desvio", balancoParaOLado + "px");
        bolha.style.setProperty("--opacidade", Math.random() * 0.4 + 0.2);

        espacoVisivel.appendChild(bolha);
    }
}

// ==========================================
// CONTROLE DO PORTAL DE ENTRADA (INDEX.HTML)
// ==========================================
function monitorarBotaoPortal() {
    const gatilhoEntrar = document.getElementById("btn-entrar-portal");
    if (!gatilhoEntrar) return;

    gatilhoEntrar.addEventListener("click", function(e) {
        e.preventDefault();
        gatilhoEntrar.disabled = true;
        gatilhoEntrar.innerText = "Abrindo o portal...";

        setTimeout(function() {
            window.location.href = "pages/inicio.html";
        }, 1000);
    });
}

// ==========================================
// SISTEMA DE ACESSIBILIDADE GLOBAL
// ==========================================
function configurarAcessibilidade() {
    const btnTema = document.getElementById("trocarTema");
    const elementoRaiz = document.documentElement;

    if (btnTema) {
        const temaSalvo = localStorage.getItem("tema-agrinho");
        if (temaSalvo === "claro") {
            elementoRaiz.classList.add("modo-claro");
        }

        btnTema.addEventListener("click", () => {
            elementoRaiz.classList.toggle("modo-claro");
            
            if (elementoRaiz.classList.contains("modo-claro")) {
                localStorage.setItem("tema-agrinho", "claro");
            } else {
                localStorage.setItem("tema-agrinho", "escuro");
            }
        });
    }
}

// ==========================================
// LINHA DE PROGRESSO DA ROLAGEM
// ==========================================
function configurarLinhaDeProgresso() {
    const barraSuperior = document.querySelector(".linha-progresso, .progress-line");
    if (!barraSuperior) return;

    function atualizarProgresso() {
        const limiteDeRolagem = document.documentElement.scrollHeight - window.innerHeight;
        const posicaoScroll = window.scrollY;

        if (limiteDeRolagem > 0) {
            const calculoPorcentagem = (posicaoScroll / limiteDeRolagem) * 100;
            barraSuperior.style.width = calculoPorcentagem + "%";
        }
    }

    atualizarProgresso();
    window.addEventListener("scroll", atualizarProgresso, { passive: true });
}

// ==========================================
// BOTÃO PARA VOLTAR AO TOPO
// ==========================================
function configurarBotaoSubir() {
    const botaoSubir = document.getElementById("subirProTopo") || document.querySelector(".botao-subir");
    if (!botaoSubir) return;

    function subirSuavemente() {
        const inicio = window.scrollY;
        const duracao = 900;
        const tempoInicial = performance.now();

        function animar(tempoAtual) {
            const progresso = Math.min((tempoAtual - tempoInicial) / duracao, 1);
            const suavizacao = 1 - Math.pow(1 - progresso, 3);

            window.scrollTo(0, inicio * (1 - suavizacao));

            if (progresso < 1) {
                requestAnimationFrame(animar);
            }
        }

        requestAnimationFrame(animar);
    }

    function atualizarVisibilidade() {
        botaoSubir.classList.toggle("visivel", window.scrollY > 450);
    }

    botaoSubir.addEventListener("click", function(event) {
        event.preventDefault();
        subirSuavemente();
    });

    atualizarVisibilidade();
    window.addEventListener("scroll", atualizarVisibilidade, { passive: true });
}

// ==========================================
// CARTÕES REVELÁVEIS DA PÁGINA NATUREZA
// ==========================================
function configurarMensagensNatureza() {
    const botoesRevelar = document.querySelectorAll(".btn-revelar");
    if (!botoesRevelar.length) return;

    botoesRevelar.forEach((botao) => {
        botao.addEventListener("click", () => {
            const cartao = botao.closest(".caixa-card");
            const caixaTexto = cartao ? cartao.querySelector(".mensagem-oculta") : null;
            if (!caixaTexto) return;

            const mensagemAberta = caixaTexto.classList.toggle("mensagem-oculta--visivel");
            botao.classList.toggle("btn-revelar--ativo", mensagemAberta);
            botao.textContent = mensagemAberta ? "Fechar mensagem" : "Clique aqui para descobrir";
        });
    });
}

// ==========================================
// INICIALIZADOR SEGURO DO SISTEMA
// ==========================================
function carregarSistema() {
    geradorDeBolhas();
    monitorarBotaoPortal();
    configurarAcessibilidade();
    configurarLinhaDeProgresso();
    configurarBotaoSubir();
    configurarMensagensNatureza();
    // A Galeria agora roda automaticamente e de forma interativa direto via CSS!
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", carregarSistema);
} else {
    carregarSistema();
}