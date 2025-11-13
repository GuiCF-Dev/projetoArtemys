/* ============================================
   SCRIPT PRINCIPAL - ARTEMYS
   ============================================ */

/* Função: Filtro de busca e abas na página de serviços */
document.addEventListener("DOMContentLoaded", function() {
    const inputTexto = document.getElementById("busca-texto");
    const inputLocal = document.getElementById("busca-local");
    const btnBuscar = document.querySelector(".btn-buscar");
    const containerAbas = document.querySelector(".tabs-container");
    const todasAbas = document.querySelectorAll(".tabs-container .tab-button");
    const tituloFiltro = document.getElementById("filtro-titulo");
    const descricaoFiltro = document.getElementById("filtro-descricao");
    const todosCards = document.querySelectorAll(".card-servico");
    let filtroAbaAtivo = "todos";

    const textosFiltro = {
        todos: {
            titulo: "Todos os Resultados",
            descricao: "Veja todos os profissionais e clínicas disponíveis."
        },
        vet: {
            titulo: "Veterinários Autônomos",
            descricao: "Profissionais qualificados prontos para cuidar do seu pet."
        },
        clinica: {
            titulo: "Clínicas",
            descricao: "Encontre clínicas e hospitais veterinários perto de você."
        }
    };

    function filtrarCards() {
        const termoBusca = inputTexto ? inputTexto.value.toLowerCase() : '';
        const termoLocal = inputLocal ? inputLocal.value.toLowerCase() : '';

        todosCards.forEach(card => {
            const tipoCard = card.dataset.tipo;
            const conteudoCard = card.textContent.toLowerCase();
            const matchAba = (filtroAbaAtivo === "todos") || (tipoCard === filtroAbaAtivo);
            const matchTexto = conteudoCard.includes(termoBusca);
            const matchLocal = conteudoCard.includes(termoLocal);

            if (matchAba && matchTexto && matchLocal) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    }

    if (btnBuscar) {
        btnBuscar.addEventListener("click", function(event) {
            event.preventDefault();
            filtrarCards();
        });
    }

    if (containerAbas) {
        containerAbas.addEventListener("click", function(event) {
            const abaClicada = event.target.closest(".tab-button");
            
            if (abaClicada) {
                const filtro = abaClicada.dataset.filtro;
                
                if (filtro === filtroAbaAtivo) {
                    return;
                }

                filtroAbaAtivo = filtro;
                todasAbas.forEach(aba => aba.classList.remove("active"));
                abaClicada.classList.add("active");

                if (tituloFiltro && descricaoFiltro) {
                    tituloFiltro.textContent = textosFiltro[filtro].titulo;
                    descricaoFiltro.textContent = textosFiltro[filtro].descricao;
                }

                filtrarCards();
            }
        });
    }
});

/* Função: Dropdown do perfil no header */
document.addEventListener('DOMContentLoaded', function() {
    const profilePic = document.getElementById('profile-pic-btn');
    const dropdown = document.getElementById('profile-dropdown');

    if (profilePic && dropdown) {
        profilePic.addEventListener('click', function(event) {
            event.stopPropagation();
            dropdown.classList.toggle('show');
        });

        window.addEventListener('click', function(event) {
            if (dropdown.classList.contains('show')) {
                if (!dropdown.contains(event.target) && !profilePic.contains(event.target)) {
                    dropdown.classList.remove('show');
                }
            }
        });
    }
});

/* Função: Redirecionamento do formulário de login */
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            window.location.href = 'homeLogado.html';
        });
    }
});

/* Função: Menu hambúrguer responsivo */
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    let overlay = document.querySelector('.menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);
    }

    if (menuToggle && navLinks) {
        const toggleMenu = function() {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            overlay.classList.toggle('active');
        };

        const closeMenu = function() {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
        };

        menuToggle.addEventListener('click', toggleMenu);
        menuToggle.addEventListener('touchend', function(e) {
            e.preventDefault();
            toggleMenu();
        });

        overlay.addEventListener('click', closeMenu);
        overlay.addEventListener('touchend', function(e) {
            e.preventDefault();
            closeMenu();
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                overlay.classList.remove('active');
            });
        });

        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !navLinks.contains(event.target) && !overlay.contains(event.target)) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                overlay.classList.remove('active');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('menu-toggle')) {
        initMobileMenu();
    }
});

/* Função: Sistema de tabs na página de perfil */
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.config-tab');
    const contents = document.querySelectorAll('.config-content');

    function ativarTab(tabName) {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        const tabAtiva = document.querySelector(`[data-tab="${tabName}"]`);
        if (tabAtiva) {
            tabAtiva.classList.add('active');
            const contentElement = document.getElementById(tabName + '-content');
            if (contentElement) {
                contentElement.classList.add('active');
            }
        }
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            ativarTab(targetTab);
        });
    });

    const hash = window.location.hash.substring(1);
    if (hash) {
        ativarTab(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (window.location.hash === '#pagamento') {
        ativarTab('pagamento');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

/* Função: Sistema de tabs de pagamento (Crédito/Débito) */
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tipo-pagamento-tab');
    const forms = document.querySelectorAll('.form-pagamento');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTipo = this.dataset.tipo;

            tabs.forEach(t => t.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));

            this.classList.add('active');
            const formElement = document.getElementById('form-' + targetTipo);
            if (formElement) {
                formElement.classList.add('active');
            }
        });
    });

    const numeroCartaoInputs = document.querySelectorAll('input[placeholder*="0000 0000 0000 0000"]');
    numeroCartaoInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    });

    const validadeInputs = document.querySelectorAll('input[placeholder*="MM/AA"]');
    validadeInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    });

    const cvvInputs = document.querySelectorAll('input[placeholder*="123"]');
    cvvInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    });
});

/* Função: Redirecionamento para perfil */
function voltarParaPerfil() {
    window.location.href = 'perfil.html';
}

/* Função: Confirmação de pagamento e redirecionamento */
function confirmarPagamento() {
    window.location.href = 'perfil.html#pagamento';
}

/* Função: Máscaras de entrada para data de nascimento do pet */
document.addEventListener('DOMContentLoaded', function() {
    const diaInput = document.getElementById('dia-nascimento');
    const mesInput = document.getElementById('mes-nascimento');
    const anoInput = document.getElementById('ano-nascimento');

    if (diaInput) {
        diaInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
            if (e.target.value.length === 2 && mesInput) {
                mesInput.focus();
            }
        });
    }

    if (mesInput) {
        mesInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
            if (e.target.value.length === 2 && anoInput) {
                anoInput.focus();
            }
        });
    }

    if (anoInput) {
        anoInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }
});

/* Função: Adicionar condição pré-existente */
function adicionarCondicao() {
    const input = document.getElementById('condicoes-preexistentes');
    if (input && input.value.trim()) {
        input.value = '';
    }
}

/* Função: Adicionar medicação atual */
function adicionarMedicacao() {
    const input = document.getElementById('medicacoes-atuais');
    if (input && input.value.trim()) {
        input.value = '';
    }
}

/* Função: Adicionar vacinação */
function adicionarVacinacao() {
    const tipo = document.getElementById('tipo-vacinacao');
    const dose = document.getElementById('dose-vacinacao');
    if (tipo && dose && tipo.value.trim() && dose.value.trim()) {
        tipo.value = '';
        dose.value = '';
    }
}

/* Função: Adicionar medicação controlada */
function adicionarMedicacaoControlada() {
    const input = document.getElementById('medicacoes-controladas');
    if (input && input.value.trim()) {
        input.value = '';
    }
}

/* Função: Finalizar cadastro de pet */
function finalizarCadastro() {
    window.location.href = 'perfil.html';
}

/* Função: Dados e renderização de artigos e guias */
const artigos = [
    {
        id: 1,
        titulo: "Rotina de Cuidado e Prevenção",
        descricao: "Alimentação, Vacinas e Check-ups sem Mistérios",
        imagem: "./assets/rotinaImagem.jpeg",
        categoria: "Dicas Gerais",
        iconeCategoria: "./assets/iconeEtiquetafav.png"
    },
    {
        id: 2,
        titulo: "Como agir em engasgos e intoxicações",
        descricao: "Passo a Passo Para Situação de Emergência Até Chegar ao Atendimento",
        imagem: "./assets/imagemGuia2.png",
        categoria: "Primeiros Socorros",
        iconeCategoria: "./assets/iconePrimeirosSocorros.png"
    },
    {
        id: 3,
        titulo: "Como tratar a febre do seu pet",
        descricao: "Passo a Passo Para Tratar Seu Pet em Casos de Febre",
        imagem: "./assets/imagemFebre.jpg",
        categoria: "Primeiros Socorros",
        iconeCategoria: "./assets/iconeCoracao.png"
    }
];

const guias = [
    {
        id: 1,
        titulo: "ENGASGOS EM CÃES E GATOS: O QUE FAZER IMEDIATAMENTE",
        descricao: "Saiba como identificar os sintomas, como agir em caso de emergência e prevenir engasgos.",
        imagem: "./assets/ImagemEngasgo.png",
        categoria: "Primeiros Socorros",
        iconeCategoria: "./assets/iconePrimeirosSocorros.png"
    },
    {
        id: 2,
        titulo: "QUEIMADURAS EM CÃES E GATOS: AÇÃO IMEDIATA",
        descricao: "Descubra os tipos de queimaduras, como prestar os primeiros socorros e quando procurar um veterinário.",
        imagem: "./assets/imagemQueimadura.jpg",
        categoria: "Primeiros Socorros",
        iconeCategoria: "./assets/iconePrimeirosSocorros.png"
    },
    {
        id: 3,
        titulo: "INTOXICAÇÃO EM ANIMAIS: LISTA DE PLANTAS VENENOSAS",
        descricao: "Conheça as plantas comuns que são tóxicas para cães e gatos, sintomas de intoxicação e o que fazer.",
        imagem: "./assets/intoxicacaoAnimais.jpg",
        categoria: "Primeiros Socorros",
        iconeCategoria: "./assets/iconePrimeirosSocorros.png"
    },
    {
        id: 4,
        titulo: "INSOLAÇÃO EM CÃES E GATOS: COMO RECONHECER E RESFRIAR",
        descricao: "Aprenda a identificar os sinais de insolação, as medidas de primeiros socorros e a prevenção em dias quentes.",
        imagem: "./assets/imagemGuia2.png",
        categoria: "Primeiros Socorros",
        iconeCategoria: "./assets/iconePrimeirosSocorros.png"
    }
];

/* Função: Criar card de artigo */
function criarCardArtigo(item, tipo) {
    const botaoSaibaMais = `<button class="btn-saiba-mais-artigo" type="button">
        <img src="./assets/iconSearch.png" alt="Buscar">
        <span>Saiba Mais</span>
    </button>`;
    
    const botaoLer = `<button class="btn-ler-artigo" type="button">Ler</button>`;

    return `
        <div class="artigo-card">
            <img src="${item.imagem}" alt="${item.titulo}" class="artigo-card-imagem">
            <div class="artigo-card-conteudo">
                <div class="artigo-card-tag">
                    <img src="${item.iconeCategoria}" alt="${item.categoria}">
                    <span>${item.categoria}</span>
                </div>
                <h3 class="artigo-card-titulo">${item.titulo}</h3>
                <p class="artigo-card-descricao">${item.descricao}</p>
                <div class="artigo-card-botoes">
                    ${botaoSaibaMais}
                    ${botaoLer}
                </div>
            </div>
        </div>
    `;
}

/* Função: Renderizar artigos na página */
function renderizarArtigos() {
    const gridArtigos = document.getElementById('grid-artigos');
    if (gridArtigos) {
        gridArtigos.innerHTML = artigos.map(item => criarCardArtigo(item, 'artigo')).join('');
    }
}

/* Função: Renderizar guias na página */
function renderizarGuias() {
    const gridGuias = document.getElementById('grid-guias');
    if (gridGuias) {
        gridGuias.innerHTML = guias.map(item => criarCardArtigo(item, 'guia')).join('');
    }
}

/* Função: Alternar entre visualização de artigos e guias */
function alternarConteudo(tipo) {
    const btnArtigos = document.querySelector('[data-tipo="artigos"]');
    const btnGuias = document.querySelector('[data-tipo="guias"]');
    const conteudoArtigos = document.getElementById('conteudo-artigos');
    const conteudoGuias = document.getElementById('conteudo-guias');

    if (tipo === 'artigos') {
        if (btnArtigos) btnArtigos.classList.add('active');
        if (btnGuias) btnGuias.classList.remove('active');
        if (conteudoArtigos) conteudoArtigos.style.display = 'block';
        if (conteudoGuias) conteudoGuias.style.display = 'none';
    } else {
        if (btnArtigos) btnArtigos.classList.remove('active');
        if (btnGuias) btnGuias.classList.add('active');
        if (conteudoArtigos) conteudoArtigos.style.display = 'none';
        if (conteudoGuias) conteudoGuias.style.display = 'block';
    }
}

/* Função: Exibir artigo completo na página */
function lerArtigo(id, tipo) {
    if (tipo === 'guia') {
        return false;
    }
    
    const lista = tipo === 'artigo' ? artigos : guias;
    const item = lista.find(a => a.id === id);
    
    if (item) {
        const artigosLista = document.getElementById('artigos-lista');
        const artigoCompleto = document.getElementById('artigo-completo');
        
        if (artigosLista) artigosLista.style.display = 'none';
        if (artigoCompleto) artigoCompleto.classList.add('active');
        
        const tituloCompleto = document.getElementById('artigo-titulo-completo');
        if (tituloCompleto) tituloCompleto.textContent = item.titulo;
        
        const imagemPrincipal = document.getElementById('artigo-imagem-principal');
        if (imagemPrincipal && item.imagem) {
            imagemPrincipal.src = item.imagem;
        }
        
        window.scrollTo(0, 0);
    }
}

/* Função: Mostrar artigo (botão Saiba Mais) */
function mostrarArtigo(id, tipo) {
    if (tipo === 'guia') {
        return false;
    }
    lerArtigo(id, tipo);
}

/* Função: Voltar para lista de artigos */
function voltarParaLista() {
    const artigosLista = document.getElementById('artigos-lista');
    const artigoCompleto = document.getElementById('artigo-completo');
    
    if (artigosLista) artigosLista.style.display = 'block';
    if (artigoCompleto) artigoCompleto.classList.remove('active');
    window.scrollTo(0, 0);
}

/* Função: Inicialização da página de artigos */
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('grid-artigos') || document.getElementById('grid-guias')) {
        renderizarArtigos();
        renderizarGuias();

        document.querySelectorAll('.artigos-nav-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const tipo = this.dataset.tipo;
                alternarConteudo(tipo);
            });
        });
    }
});

/* Função: Sistema de abas na página de agendamentos */
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.agendamento-tab');
    const cards = document.querySelectorAll('.agendamento-card');

    if (tabs.length > 0 && cards.length > 0) {
        const activeTab = document.querySelector('.agendamento-tab.active');
        const defaultTab = activeTab ? activeTab.dataset.tab : 'proximos';

        cards.forEach(card => {
            if (card.dataset.status === defaultTab) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });

        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const targetTab = this.dataset.tab;

                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                cards.forEach(card => {
                    if (card.dataset.status === targetTab) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
});

// Garantir que os botões mobile funcionem corretamente
document.addEventListener('DOMContentLoaded', function() {
    const mobileAuthButtons = document.querySelectorAll('.mobile-btn-entrar-full, .mobile-btn-cadastrar-full');
    mobileAuthButtons.forEach(button => {
        // Adicionar listener para touch events no mobile
        button.addEventListener('touchend', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href) {
                window.location.href = href;
            }
        }, { passive: false });
        
        // Garantir que cliques também funcionem
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && !e.defaultPrevented) {
                window.location.href = href;
            }
        });
    });
});
