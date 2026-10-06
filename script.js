// ========================================
// TELAS
// ========================================

const telaSplash = document.getElementById("telaSplash");
const telaLogin = document.getElementById("telaLogin");
const telaCadastro = document.getElementById("telaCadastro");
const telaDashboard = document.getElementById("telaDashboard");
const telaHabitos = document.getElementById("telaHabitos");
const telaCompromissos = document.getElementById("telaCompromissos");


// ========================================
// BOTÕES
// ========================================

const btnComecar = document.getElementById("btnComecar");

const btnVoltarLogin =
    document.getElementById("btnVoltarLogin");

const btnVoltarCadastro =
    document.getElementById("btnVoltarCadastro");

const btnIrCadastro =
    document.getElementById("btnIrCadastro");

const btnIrLogin =
    document.getElementById("btnIrLogin");

const btnSair =
    document.getElementById("btnSair");

const btnHabitos =
    document.getElementById("btnHabitos");

const btnVoltarDashboardHabitos =
    document.getElementById("btnVoltarDashboardHabitos");

const btnAdicionarHabito =
    document.getElementById("btnAdicionarHabito");


// ========================================
// BOTÕES DE COMPROMISSOS
// ========================================

const btnCompromissos =
    document.getElementById("btnCompromissos");

const btnVoltarDashboardCompromissos =
    document.getElementById("btnVoltarDashboardCompromissos");

const btnAdicionarCompromisso =
    document.getElementById("btnAdicionarCompromisso");


// ========================================
// FORMULÁRIO DE HÁBITOS
// ========================================

const formularioHabito =
    document.getElementById("formularioHabito");

const btnCancelarHabito =
    document.getElementById("btnCancelarHabito");

const btnSalvarHabito =
    document.getElementById("btnSalvarHabito");

const nomeHabito =
    document.getElementById("nomeHabito");

const categoriaHabito =
    document.getElementById("categoriaHabito");

const frequenciaHabito =
    document.getElementById("frequenciaHabito");

const horarioHabito =
    document.getElementById("horarioHabito");

const mensagemFormularioHabito =
    document.getElementById("mensagemFormularioHabito");


// ========================================
// FORMULÁRIO DE COMPROMISSOS
// ========================================

const formularioCompromisso =
    document.getElementById("formularioCompromisso");

const btnCancelarCompromisso =
    document.getElementById("btnCancelarCompromisso");

const btnSalvarCompromisso =
    document.getElementById("btnSalvarCompromisso");

const tituloCompromisso =
    document.getElementById("tituloCompromisso");

const dataCompromisso =
    document.getElementById("dataCompromisso");

const horarioCompromisso =
    document.getElementById("horarioCompromisso");

const localCompromisso =
    document.getElementById("localCompromisso");

const descricaoCompromisso =
    document.getElementById("descricaoCompromisso");

const mensagemFormularioCompromisso =
    document.getElementById("mensagemFormularioCompromisso");


// ========================================
// CONTROLE DE EDIÇÃO
// ========================================

let habitoEditandoId = null;

let compromissoEditandoId = null;

// Agora guarda o estado:
// "pendente"
// "concluido"
// "nao_concluido"
let compromissoEditandoEstado = "pendente";


// ========================================
// FUNÇÃO PARA TROCAR DE TELA
// ========================================

function mostrarTela(tela) {

    telaSplash.classList.add("escondida");
    telaLogin.classList.add("escondida");
    telaCadastro.classList.add("escondida");
    telaDashboard.classList.add("escondida");
    telaHabitos.classList.add("escondida");
    telaCompromissos.classList.add("escondida");

    tela.classList.remove("escondida");
}


// ========================================
// SPLASH → LOGIN
// ========================================

btnComecar.addEventListener("click", () => {

    mostrarTela(telaLogin);

});


// ========================================
// LOGIN → CADASTRO
// ========================================

btnIrCadastro.addEventListener("click", () => {

    mostrarTela(telaCadastro);

});


// ========================================
// CADASTRO → LOGIN
// ========================================

btnIrLogin.addEventListener("click", () => {

    mostrarTela(telaLogin);

});


// ========================================
// LOGIN → SPLASH
// ========================================

btnVoltarLogin.addEventListener("click", () => {

    mostrarTela(telaSplash);

});


// ========================================
// CADASTRO → SPLASH
// ========================================

btnVoltarCadastro.addEventListener("click", () => {

    mostrarTela(telaSplash);

});


// ========================================
// CADASTRO
// ========================================

const formCadastro =
    document.getElementById("formCadastro");

formCadastro.addEventListener("submit", async (event) => {

    event.preventDefault();

    const nome =
        document.getElementById("cadastroNome").value;

    const email =
        document.getElementById("cadastroEmail").value;

    const senha =
        document.getElementById("cadastroSenha").value;

    const confirmarSenha =
        document.getElementById("confirmarSenha").value;


    if (senha !== confirmarSenha) {

        alert("As senhas não coincidem.");

        return;
    }


    try {

       const resposta = await fetch(
    "https://claudiock-api.onrender.com/api/auth/cadastro",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    nome,
                    email,
                    senha
                })
            }
        );


        const dados =
            await resposta.json();


        if (!resposta.ok) {

            alert(dados.mensagem);

            return;
        }


        alert("Conta criada com sucesso!");

        formCadastro.reset();

        mostrarTela(telaLogin);


    } catch (erro) {

        console.error(erro);

        alert(
            "Não foi possível conectar ao servidor."
        );
    }
});


// ========================================
// LOGIN
// ========================================

const formLogin =
    document.getElementById("formLogin");

formLogin.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email =
        document.getElementById("loginEmail").value;

    const senha =
        document.getElementById("loginSenha").value;


    try {

        const resposta = await fetch(
            "https://claudiock-api.onrender.com/api/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    senha
                })
            }
        );


        const dados =
            await resposta.json();


        if (!resposta.ok) {

            alert(dados.mensagem);

            return;
        }


        localStorage.setItem(
            "token",
            dados.token
        );


        localStorage.setItem(
            "usuario",
            JSON.stringify(dados.usuario)
        );


        document.getElementById("nomeUsuario").textContent =
            dados.usuario.nome;


        alert(
            `Bem-vindo, ${dados.usuario.nome}!`
        );


        mostrarTela(telaDashboard);

        formLogin.reset();

        carregarResumo();


    } catch (erro) {

        console.error(
            "Erro no login:",
            erro
        );

        alert(
            "Não foi possível conectar ao servidor."
        );
    }
});


// ========================================
// LOGOUT
// ========================================

btnSair.addEventListener("click", () => {

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    mostrarTela(telaSplash);

});


// ========================================
// DASHBOARD → HÁBITOS
// ========================================

btnHabitos.addEventListener("click", async () => {

    mostrarTela(telaHabitos);

    await carregarHabitos();

});


// ========================================
// HÁBITOS → DASHBOARD
// ========================================

btnVoltarDashboardHabitos.addEventListener("click", () => {

    mostrarTela(telaDashboard);

    carregarResumo();

});


// ========================================
// BUSCAR HÁBITOS
// ========================================

async function carregarHabitos() {

    const token =
        localStorage.getItem("token");

    const listaHabitos =
        document.getElementById("listaHabitos");

    const mensagemHabitos =
        document.getElementById("mensagemHabitos");


    if (!token) {

        mostrarTela(telaLogin);

        return;
    }


    try {

        const resposta = await fetch(
            "https://claudiock-api.onrender.com/api/habitos",
            {
                method: "GET",

                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );


        const dados =
            await resposta.json();


        if (!resposta.ok) {

            alert(
                dados.mensagem ||
                "Não foi possível carregar os hábitos."
            );

            return;
        }


        listaHabitos.innerHTML = "";


        if (dados.length === 0) {

            mensagemHabitos.textContent =
                "Você ainda não possui hábitos.";

            listaHabitos.innerHTML = `
                <div class="habito-vazio">
                    <p>
                        Adicione seu primeiro hábito para começar.
                    </p>
                </div>
            `;

            return;
        }


        mensagemHabitos.textContent =
            `${dados.length} hábito(s) cadastrado(s).`;


        dados.forEach((habito) => {

            const item =
                document.createElement("article");

            item.className = "habito-item";


            const horario =
                habito.horario
                    ? `Horário: ${habito.horario.slice(0, 5)}`
                    : "Sem horário";


            const categoria =
                habito.categoria ||
                "Sem categoria";


            const frequencia =
                habito.frequencia ||
                "Sem frequência";


            item.innerHTML = `
                <div class="habito-icone">
                    ✓
                </div>

                <div class="habito-info">

                    <strong>
                        ${habito.nome}
                    </strong>

                    <p>
                        ${categoria} · ${frequencia}
                    </p>

                    <p>
                        ${horario}
                    </p>

                </div>

                <div class="habito-acoes">

                    <button
                        class="habito-acao editar"
                        type="button"
                        data-id="${habito.id}"
                        title="Editar hábito"
                    >
                        Editar
                    </button>

                    <button
                        class="habito-acao excluir"
                        type="button"
                        data-id="${habito.id}"
                        title="Excluir hábito"
                    >
                        ×
                    </button>

                </div>
            `;


            listaHabitos.appendChild(item);

        });


        document
            .querySelectorAll(".habito-acao.editar")
            .forEach((botao) => {

                botao.addEventListener(
                    "click",
                    () => {

                        const id =
                            botao.dataset.id;

                        const habito =
                            dados.find(
                                (item) =>
                                    String(item.id) === String(id)
                            );

                        if (habito) {

                            editarHabito(habito);

                        }

                    }
                );

            });


        document
            .querySelectorAll(".habito-acao.excluir")
            .forEach((botao) => {

                botao.addEventListener(
                    "click",
                    () => excluirHabito(botao.dataset.id)
                );

            });


    } catch (erro) {

        console.error(
            "Erro ao carregar hábitos:",
            erro
        );

        alert(
            "Não foi possível conectar ao servidor."
        );
    }
}


// ========================================
// EDITAR HÁBITO
// ========================================

function editarHabito(habito) {

    habitoEditandoId = habito.id;

    nomeHabito.value =
        habito.nome || "";

    categoriaHabito.value =
        habito.categoria || "";

    frequenciaHabito.value =
        habito.frequencia || "";

    horarioHabito.value =
        habito.horario
            ? habito.horario.slice(0, 5)
            : "";


    formularioHabito.classList.remove(
        "escondido"
    );


    const tituloFormulario =
        formularioHabito.querySelector("h3");


    if (tituloFormulario) {

        tituloFormulario.textContent =
            "Editar hábito";
    }


    btnSalvarHabito.textContent =
        "Atualizar hábito";

    mensagemFormularioHabito.textContent = "";

    nomeHabito.focus();

}


// ========================================
// CANCELAR HÁBITO
// ========================================

btnCancelarHabito.addEventListener("click", () => {

    formularioHabito.classList.add(
        "escondido"
    );

    habitoEditandoId = null;

    nomeHabito.value = "";
    categoriaHabito.value = "";
    frequenciaHabito.value = "";
    horarioHabito.value = "";

    mensagemFormularioHabito.textContent = "";

    const tituloFormulario =
        formularioHabito.querySelector("h3");

    if (tituloFormulario) {

        tituloFormulario.textContent =
            "Novo hábito";
    }

    btnSalvarHabito.textContent =
        "Salvar hábito";

});


// ========================================
// EXCLUIR HÁBITO
// ========================================

async function excluirHabito(id) {

    const confirmar =
        confirm(
            "Deseja realmente excluir este hábito?"
        );


    if (!confirmar) {

        return;
    }


    const token =
        localStorage.getItem("token");


    try {

        const resposta = await fetch(
            `https://claudiock-api.onrender.com/api/habitos/${id}`,
            {
                method: "DELETE",

                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );


        const dados =
            await resposta.json();


        if (!resposta.ok) {

            alert(
                dados.mensagem ||
                "Não foi possível excluir o hábito."
            );

            return;
        }


        alert("Hábito excluído com sucesso!");

        await carregarHabitos();


    } catch (erro) {

        console.error(
            "Erro ao excluir hábito:",
            erro
        );

        alert(
            "Não foi possível conectar ao servidor."
        );
    }
}


// ========================================
// ADICIONAR HÁBITO
// ========================================

btnAdicionarHabito.addEventListener("click", () => {

    habitoEditandoId = null;

    formularioHabito.classList.remove(
        "escondido"
    );

    mensagemFormularioHabito.textContent = "";

    nomeHabito.value = "";
    categoriaHabito.value = "";
    frequenciaHabito.value = "";
    horarioHabito.value = "";

    const tituloFormulario =
        formularioHabito.querySelector("h3");

    if (tituloFormulario) {

        tituloFormulario.textContent =
            "Novo hábito";
    }

    btnSalvarHabito.textContent =
        "Salvar hábito";

    nomeHabito.focus();

});


// ========================================
// SALVAR / ATUALIZAR HÁBITO
// ========================================

btnSalvarHabito.addEventListener("click", async () => {

    const token =
        localStorage.getItem("token");

    const nome =
        nomeHabito.value.trim();

    const categoria =
        categoriaHabito.value.trim();

    const frequencia =
        frequenciaHabito.value;

    const horario =
        horarioHabito.value;


    mensagemFormularioHabito.textContent = "";


    if (!nome) {

        mensagemFormularioHabito.textContent =
            "Digite o nome do hábito.";

        nomeHabito.focus();

        return;
    }


    if (!token) {

        mostrarTela(telaLogin);

        return;
    }


    try {

        btnSalvarHabito.disabled = true;


        if (habitoEditandoId !== null) {

            btnSalvarHabito.textContent =
                "Atualizando...";


            const resposta = await fetch(
                `https://claudiock-api.onrender.com/api/habitos/${habitoEditandoId}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",

                        "Authorization":
                            `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        nome: nome,
                        categoria: categoria || null,
                        frequencia: frequencia || null,
                        horario: horario || null
                    })
                }
            );


            const dados =
                await resposta.json();


            if (!resposta.ok) {

                throw new Error(
                    dados.mensagem ||
                    "Erro ao atualizar hábito."
                );
            }


            alert(
                "Hábito atualizado com sucesso!"
            );


        } else {

            btnSalvarHabito.textContent =
                "Salvando...";


            const resposta = await fetch(
                "https://claudiock-api.onrender.com/api/habitos",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",

                        "Authorization":
                            `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        nome: nome,
                        categoria: categoria || null,
                        frequencia: frequencia || null,
                        horario: horario || null
                    })
                }
            );


            const dados =
                await resposta.json();


            if (!resposta.ok) {

                throw new Error(
                    dados.mensagem ||
                    "Erro ao criar hábito."
                );
            }


            alert(
                "Hábito criado com sucesso!"
            );
        }


        formularioHabito.classList.add(
            "escondido"
        );

        habitoEditandoId = null;

        nomeHabito.value = "";
        categoriaHabito.value = "";
        frequenciaHabito.value = "";
        horarioHabito.value = "";

        mensagemFormularioHabito.textContent = "";

        const tituloFormulario =
            formularioHabito.querySelector("h3");

        if (tituloFormulario) {

            tituloFormulario.textContent =
                "Novo hábito";
        }

        btnSalvarHabito.textContent =
            "Salvar hábito";


        await carregarHabitos();

        await carregarResumo();


    } catch (erro) {

        console.error(
            "Erro ao salvar/atualizar hábito:",
            erro
        );

        mensagemFormularioHabito.textContent =
            erro.message ||
            "Não foi possível salvar o hábito.";


    } finally {

        btnSalvarHabito.disabled = false;

        if (habitoEditandoId === null) {

            btnSalvarHabito.textContent =
                "Salvar hábito";
        }

    }

});


// ========================================
// DASHBOARD → COMPROMISSOS
// ========================================

btnCompromissos.addEventListener("click", async () => {

    mostrarTela(telaCompromissos);

    await carregarCompromissos();

});


// ========================================
// COMPROMISSOS → DASHBOARD
// ========================================

btnVoltarDashboardCompromissos.addEventListener(
    "click",
    () => {

        mostrarTela(telaDashboard);

        carregarResumo();

    }
);


// ========================================
// BUSCAR COMPROMISSOS
// ========================================

async function carregarCompromissos() {

    const token =
        localStorage.getItem("token");

    const listaCompromissos =
        document.getElementById("listaCompromissos");

    const mensagemCompromissos =
        document.getElementById("mensagemCompromissos");


    if (!token) {

        mostrarTela(telaLogin);

        return;
    }


    try {

        const resposta = await fetch(
            "https://claudiock-api.onrender.com/api/compromissos",
            {
                method: "GET",

                headers: {
                    "Authorization":
                        `Bearer ${token}`
                }
            }
        );


        const dados =
            await resposta.json();


        if (!resposta.ok) {

            alert(
                dados.mensagem ||
                "Não foi possível carregar os compromissos."
            );

            return;
        }


        listaCompromissos.innerHTML = "";


        if (dados.length === 0) {

            mensagemCompromissos.textContent =
                "Você ainda não possui compromissos.";


            listaCompromissos.innerHTML = `
                <div class="compromisso-vazio">
                    <p>
                        Adicione seu primeiro compromisso para começar.
                    </p>
                </div>
            `;

            return;
        }


        mensagemCompromissos.textContent =
            `${dados.length} compromisso(s) cadastrado(s).`;


        // ========================================
        // CRIA OS CARDS
        // ========================================

        dados.forEach((compromisso) => {

            const item =
                document.createElement("article");


            // Normaliza o estado para evitar problemas
            // caso algum registro antigo ainda tenha valor inesperado.
            const estado =
                compromisso.concluido === "concluido" ||
                compromisso.concluido === "nao_concluido" ||
                compromisso.concluido === "pendente"
                    ? compromisso.concluido
                    : "pendente";


            item.className =
                `compromisso-item compromisso-${estado}`;


            // ========================================
            // DATA
            // ========================================

            let dataFormatada =
                "Sem data";


            if (compromisso.data) {

                const partes =
                    compromisso.data
                        .slice(0, 10)
                        .split("-");

                if (partes.length === 3) {

                    dataFormatada =
                        `${partes[2]}/${partes[1]}/${partes[0]}`;
                }
            }


            // ========================================
            // OUTRAS INFORMAÇÕES
            // ========================================

            const horario =
                compromisso.horario
                    ? compromisso.horario.slice(0, 5)
                    : "Sem horário";


            const local =
                compromisso.local ||
                "Sem local";


            const descricao =
                compromisso.descricao ||
                "Sem descrição";


            // ========================================
            // STATUS
            // ========================================

            let icone = "◷";
            let textoStatus = "Pendente";


            if (estado === "concluido") {

                icone = "✓";
                textoStatus = "Concluído";

            } else if (estado === "nao_concluido") {

                icone = "×";
                textoStatus = "Não concluído";
            }


            // ========================================
            // BOTÕES DE STATUS
            // ========================================

            let botoesStatus = "";


            if (estado === "pendente") {

                botoesStatus = `
                    <button
                        class="compromisso-acao status-concluir"
                        type="button"
                        data-id="${compromisso.id}"
                        title="Marcar como concluído"
                    >
                        Concluir
                    </button>

                    <button
                        class="compromisso-acao status-nao-concluir"
                        type="button"
                        data-id="${compromisso.id}"
                        title="Marcar como não concluído"
                    >
                        Não concluído
                    </button>
                `;

            } else {

                botoesStatus = `
                    <button
                        class="compromisso-acao status-pendente"
                        type="button"
                        data-id="${compromisso.id}"
                        title="Voltar para pendente"
                    >
                        Pendente
                    </button>
                `;
            }


            item.innerHTML = `
                <div class="compromisso-icone">
                    ${icone}
                </div>

                <div class="compromisso-info">

                    <strong>
                        ${compromisso.titulo}
                    </strong>

                    <p>
                        Data: ${dataFormatada}
                    </p>

                    <p>
                        Horário: ${horario}
                    </p>

                    <p>
                        Local: ${local}
                    </p>

                    <p>
                        ${descricao}
                    </p>

                    <span class="compromisso-status status-${estado}">
                        ${textoStatus}
                    </span>

                </div>

                <div class="compromisso-acoes">

                    ${botoesStatus}

                    <button
                        class="compromisso-acao editar"
                        type="button"
                        data-id="${compromisso.id}"
                        title="Editar compromisso"
                    >
                        Editar
                    </button>

                    <button
                        class="compromisso-acao excluir"
                        type="button"
                        data-id="${compromisso.id}"
                        title="Excluir compromisso"
                    >
                        ×
                    </button>

                </div>
            `;


            listaCompromissos.appendChild(item);

        });


        // ========================================
        // BOTÃO CONCLUIR
        // ========================================

        document
            .querySelectorAll(".status-concluir")
            .forEach((botao) => {

                botao.addEventListener(
                    "click",
                    () => {

                        alterarEstadoCompromisso(
                            botao.dataset.id,
                            "concluido"
                        );

                    }
                );

            });


        // ========================================
        // BOTÃO NÃO CONCLUÍDO
        // ========================================

        document
            .querySelectorAll(".status-nao-concluir")
            .forEach((botao) => {

                botao.addEventListener(
                    "click",
                    () => {

                        alterarEstadoCompromisso(
                            botao.dataset.id,
                            "nao_concluido"
                        );

                    }
                );

            });


        // ========================================
        // VOLTAR PARA PENDENTE
        // ========================================

        document
            .querySelectorAll(".status-pendente")
            .forEach((botao) => {

                botao.addEventListener(
                    "click",
                    () => {

                        alterarEstadoCompromisso(
                            botao.dataset.id,
                            "pendente"
                        );

                    }
                );

            });


        // ========================================
        // EDITAR
        // ========================================

        document
            .querySelectorAll(".compromisso-acao.editar")
            .forEach((botao) => {

                botao.addEventListener(
                    "click",
                    () => {

                        const id =
                            botao.dataset.id;


                        const compromisso =
                            dados.find(
                                (item) =>
                                    String(item.id) ===
                                    String(id)
                            );


                        if (compromisso) {

                            editarCompromisso(
                                compromisso
                            );

                        }

                    }
                );

            });


        // ========================================
        // EXCLUIR
        // ========================================

        document
            .querySelectorAll(".compromisso-acao.excluir")
            .forEach((botao) => {

                botao.addEventListener(
                    "click",
                    () =>
                        excluirCompromisso(
                            botao.dataset.id
                        )
                );

            });


    } catch (erro) {

        console.error(
            "Erro ao carregar compromissos:",
            erro
        );

        alert(
            "Não foi possível conectar ao servidor."
        );
    }
}


// ========================================
// ALTERAR ESTADO DO COMPROMISSO
// ========================================

async function alterarEstadoCompromisso(id, novoEstado) {

    const token =
        localStorage.getItem("token");


    if (!token) {

        mostrarTela(telaLogin);

        return;
    }


    try {

        // Busca o compromisso atual
        const respostaBusca = await fetch(
            "https://claudiock-api.onrender.com/api/compromissos",
            {
                method: "GET",

                headers: {
                    "Authorization":
                        `Bearer ${token}`
                }
            }
        );


        const compromissos =
            await respostaBusca.json();


        if (!respostaBusca.ok) {

            alert(
                compromissos.mensagem ||
                "Não foi possível buscar o compromisso."
            );

            return;
        }


        const compromisso =
            compromissos.find(
                (item) =>
                    String(item.id) === String(id)
            );


        if (!compromisso) {

            alert(
                "Compromisso não encontrado."
            );

            return;
        }


        const resposta = await fetch(
            `https://claudiock-api.onrender.com/api/compromissos/${id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json",

                    "Authorization":
                        `Bearer ${token}`
                },

                body: JSON.stringify({

                    titulo:
                        compromisso.titulo,

                    data:
                        compromisso.data,

                    horario:
                        compromisso.horario || null,

                    local:
                        compromisso.local || null,

                    descricao:
                        compromisso.descricao || null,

                    concluido:
                        novoEstado
                })
            }
        );


        const dados =
            await resposta.json();


        if (!resposta.ok) {

            throw new Error(
                dados.mensagem ||
                "Não foi possível alterar o estado do compromisso."
            );
        }


        await carregarCompromissos();

        await carregarResumo();


    } catch (erro) {

        console.error(
            "Erro ao alterar estado do compromisso:",
            erro
        );

        alert(
            erro.message ||
            "Não foi possível alterar o estado do compromisso."
        );
    }
}


// ========================================
// EDITAR COMPROMISSO
// ========================================

function editarCompromisso(compromisso) {

    compromissoEditandoId =
        compromisso.id;


    // Agora guarda o texto do estado
    compromissoEditandoEstado =
        compromisso.concluido || "pendente";


    tituloCompromisso.value =
        compromisso.titulo || "";


    dataCompromisso.value =
        compromisso.data
            ? compromisso.data.slice(0, 10)
            : "";


    horarioCompromisso.value =
        compromisso.horario
            ? compromisso.horario.slice(0, 5)
            : "";


    localCompromisso.value =
        compromisso.local || "";


    descricaoCompromisso.value =
        compromisso.descricao || "";


    formularioCompromisso.classList.remove(
        "escondido"
    );


    const tituloFormulario =
        formularioCompromisso.querySelector("h3");


    if (tituloFormulario) {

        tituloFormulario.textContent =
            "Editar compromisso";
    }


    btnSalvarCompromisso.textContent =
        "Atualizar compromisso";


    mensagemFormularioCompromisso.textContent =
        "";


    tituloCompromisso.focus();

}


// ========================================
// ADICIONAR COMPROMISSO
// ========================================

btnAdicionarCompromisso.addEventListener(
    "click",
    () => {

        compromissoEditandoId = null;

        compromissoEditandoEstado =
            "pendente";


        formularioCompromisso.classList.remove(
            "escondido"
        );


        mensagemFormularioCompromisso.textContent =
            "";


        tituloCompromisso.value = "";
        dataCompromisso.value = "";
        horarioCompromisso.value = "";
        localCompromisso.value = "";
        descricaoCompromisso.value = "";


        const tituloFormulario =
            formularioCompromisso.querySelector("h3");


        if (tituloFormulario) {

            tituloFormulario.textContent =
                "Novo compromisso";
        }


        btnSalvarCompromisso.textContent =
            "Salvar compromisso";


        tituloCompromisso.focus();

    }
);


// ========================================
// CANCELAR COMPROMISSO
// ========================================

btnCancelarCompromisso.addEventListener(
    "click",
    () => {

        formularioCompromisso.classList.add(
            "escondido"
        );


        compromissoEditandoId = null;

        compromissoEditandoEstado =
            "pendente";


        tituloCompromisso.value = "";
        dataCompromisso.value = "";
        horarioCompromisso.value = "";
        localCompromisso.value = "";
        descricaoCompromisso.value = "";


        mensagemFormularioCompromisso.textContent =
            "";


        const tituloFormulario =
            formularioCompromisso.querySelector("h3");


        if (tituloFormulario) {

            tituloFormulario.textContent =
                "Novo compromisso";
        }


        btnSalvarCompromisso.textContent =
            "Salvar compromisso";

    }
);


// ========================================
// EXCLUIR COMPROMISSO
// ========================================

async function excluirCompromisso(id) {

    const confirmar =
        confirm(
            "Deseja realmente excluir este compromisso?"
        );


    if (!confirmar) {

        return;
    }


    const token =
        localStorage.getItem("token");


    if (!token) {

        mostrarTela(telaLogin);

        return;
    }


    try {

        const resposta = await fetch(
            `https://claudiock-api.onrender.com/api/compromissos/${id}`,
            {
                method: "DELETE",

                headers: {
                    "Authorization":
                        `Bearer ${token}`
                }
            }
        );


        const dados =
            await resposta.json();


        if (!resposta.ok) {

            alert(
                dados.mensagem ||
                "Não foi possível excluir o compromisso."
            );

            return;
        }


        alert(
            "Compromisso excluído com sucesso!"
        );


        await carregarCompromissos();

        await carregarResumo();


    } catch (erro) {

        console.error(
            "Erro ao excluir compromisso:",
            erro
        );

        alert(
            "Não foi possível conectar ao servidor."
        );
    }
}


// ========================================
// SALVAR / ATUALIZAR COMPROMISSO
// ========================================

btnSalvarCompromisso.addEventListener(
    "click",
    async () => {

        const token =
            localStorage.getItem("token");


        const titulo =
            tituloCompromisso.value.trim();

        const data =
            dataCompromisso.value;

        const horario =
            horarioCompromisso.value;

        const local =
            localCompromisso.value.trim();

        const descricao =
            descricaoCompromisso.value.trim();


        mensagemFormularioCompromisso.textContent =
            "";


        if (!titulo) {

            mensagemFormularioCompromisso.textContent =
                "Digite o título do compromisso.";

            tituloCompromisso.focus();

            return;
        }


        if (!data) {

            mensagemFormularioCompromisso.textContent =
                "Selecione a data do compromisso.";

            dataCompromisso.focus();

            return;
        }


        if (!token) {

            mostrarTela(telaLogin);

            return;
        }


        try {

            btnSalvarCompromisso.disabled = true;


            // ========================================
            // MODO EDIÇÃO
            // ========================================

            if (compromissoEditandoId !== null) {

                btnSalvarCompromisso.textContent =
                    "Atualizando...";


                const resposta = await fetch(
                    `https://claudiock-api.onrender.com/api/compromissos/${compromissoEditandoId}`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json",

                            "Authorization":
                                `Bearer ${token}`
                        },

                        body: JSON.stringify({

                            titulo:
                                titulo,

                            data:
                                data,

                            horario:
                                horario || null,

                            local:
                                local || null,

                            descricao:
                                descricao || null,

                            concluido:
                                compromissoEditandoEstado
                        })
                    }
                );


                const dados =
                    await resposta.json();


                if (!resposta.ok) {

                    throw new Error(
                        dados.mensagem ||
                        "Erro ao atualizar compromisso."
                    );
                }


                alert(
                    "Compromisso atualizado com sucesso!"
                );


            } else {

                // ========================================
                // MODO CRIAÇÃO
                // ========================================

                btnSalvarCompromisso.textContent =
                    "Salvando...";


                const resposta = await fetch(
                    "https://claudiock-api.onrender.com/api/compromissos",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            "Authorization":
                                `Bearer ${token}`
                        },

                        body: JSON.stringify({

                            titulo:
                                titulo,

                            data:
                                data,

                            horario:
                                horario || null,

                            local:
                                local || null,

                            descricao:
                                descricao || null
                        })
                    }
                );


                const dados =
                    await resposta.json();


                if (!resposta.ok) {

                    throw new Error(
                        dados.mensagem ||
                        "Erro ao criar compromisso."
                    );
                }


                alert(
                    "Compromisso criado com sucesso!"
                );
            }


            // ========================================
            // LIMPA O FORMULÁRIO
            // ========================================

            formularioCompromisso.classList.add(
                "escondido"
            );


            compromissoEditandoId = null;

            compromissoEditandoEstado =
                "pendente";


            tituloCompromisso.value = "";
            dataCompromisso.value = "";
            horarioCompromisso.value = "";
            localCompromisso.value = "";
            descricaoCompromisso.value = "";


            mensagemFormularioCompromisso.textContent =
                "";


            const tituloFormulario =
                formularioCompromisso.querySelector("h3");


            if (tituloFormulario) {

                tituloFormulario.textContent =
                    "Novo compromisso";
            }


            btnSalvarCompromisso.textContent =
                "Salvar compromisso";


            await carregarCompromissos();

            await carregarResumo();


        } catch (erro) {

            console.error(
                "Erro ao salvar/atualizar compromisso:",
                erro
            );


            mensagemFormularioCompromisso.textContent =
                erro.message ||
                "Não foi possível salvar o compromisso.";


        } finally {

            btnSalvarCompromisso.disabled = false;


            if (compromissoEditandoId === null) {

                btnSalvarCompromisso.textContent =
                    "Salvar compromisso";
            }

        }

    }
);


// ========================================
// RESUMO DA DASHBOARD
// ========================================

async function carregarResumo() {

    const token =
        localStorage.getItem("token");


    if (!token) {

        return;
    }


    try {

        // ========================================
        // HÁBITOS
        // ========================================

        const respostaHabitos =
            await fetch(
                "https://claudiock-api.onrender.com/api/habitos",
                {
                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );


        const habitos =
            await respostaHabitos.json();


        if (respostaHabitos.ok) {

            document.getElementById(
                "totalHabitos"
            ).textContent =
                habitos.length;
        }


        // ========================================
        // COMPROMISSOS
        // ========================================

        const respostaCompromissos =
            await fetch(
                "https://claudiock-api.onrender.com/api/compromissos",
                {
                    headers: {
                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );


        const compromissos =
            await respostaCompromissos.json();


        if (respostaCompromissos.ok) {

            document.getElementById(
                "totalCompromissos"
            ).textContent =
                compromissos.length;
        }


    } catch (erro) {

        console.error(
            "Erro ao carregar resumo:",
            erro
        );
    }
}


// ========================================
// VERIFICA LOGIN SALVO
// ========================================

const tokenSalvo =
    localStorage.getItem("token");

const usuarioSalvo =
    localStorage.getItem("usuario");


if (tokenSalvo && usuarioSalvo) {

    try {

        const usuario =
            JSON.parse(usuarioSalvo);


        document.getElementById(
            "nomeUsuario"
        ).textContent =
            usuario.nome;


        mostrarTela(telaDashboard);

        carregarResumo();


    } catch (erro) {

        console.error(
            "Erro ao recuperar usuário:",
            erro
        );


        localStorage.removeItem("token");
        localStorage.removeItem("usuario");


        mostrarTela(telaSplash);
    }

} else {

    mostrarTela(telaSplash);

}


// ========================================
// SERVICE WORKER - PWA
// ========================================

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("./service-worker.js")
            .then(() => {
                console.log("Service Worker registrado.");
            })
            .catch((erro) => {
                console.error(
                    "Erro ao registrar Service Worker:",
                    erro
                );
            });
    });
}