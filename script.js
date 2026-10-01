// ========================================
// TELAS
// ========================================

const telaSplash = document.getElementById("telaSplash");
const telaLogin = document.getElementById("telaLogin");
const telaCadastro = document.getElementById("telaCadastro");
const telaDashboard = document.getElementById("telaDashboard");


// ========================================
// BOTÕES
// ========================================

const btnComecar = document.getElementById("btnComecar");

const btnVoltarLogin = document.getElementById("btnVoltarLogin");
const btnVoltarCadastro = document.getElementById("btnVoltarCadastro");

const btnIrCadastro = document.getElementById("btnIrCadastro");
const btnIrLogin = document.getElementById("btnIrLogin");

const btnSair = document.getElementById("btnSair");


// ========================================
// FUNÇÃO PARA TROCAR DE TELA
// ========================================

function mostrarTela(tela) {

    telaSplash.classList.add("escondida");
    telaLogin.classList.add("escondida");
    telaCadastro.classList.add("escondida");
    telaDashboard.classList.add("escondida");

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

const formCadastro = document.getElementById("formCadastro");

formCadastro.addEventListener("submit", async (event) => {

    event.preventDefault();

    const nome = document.getElementById("cadastroNome").value;
    const email = document.getElementById("cadastroEmail").value;
    const senha = document.getElementById("cadastroSenha").value;
    const confirmarSenha =
        document.getElementById("confirmarSenha").value;

    // Verifica se as senhas são iguais
    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem.");
        return;
    }

    try {

        const resposta = await fetch(
            "http://localhost:3001/api/auth/cadastro",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome: nome,
                    email: email,
                    senha: senha
                })
            }
        );

        const dados = await resposta.json();

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

const formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email =
        document.getElementById("loginEmail").value;

    const senha =
        document.getElementById("loginSenha").value;

    try {

        const resposta = await fetch(
            "http://localhost:3001/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    senha: senha
                })
            }
        );

        const dados = await resposta.json();

        // Se houver erro no login
        if (!resposta.ok) {
            alert(dados.mensagem);
            return;
        }

        // ========================================
        // SALVA LOGIN
        // ========================================

        localStorage.setItem(
            "token",
            dados.token
        );

        localStorage.setItem(
            "usuario",
            JSON.stringify(dados.usuario)
        );


        // ========================================
        // CONFIGURA DASHBOARD
        // ========================================

        document.getElementById("nomeUsuario").textContent =
            dados.usuario.nome;


        // ========================================
        // ENTRA NA DASHBOARD
        // ========================================

        alert(
            `Bem-vindo, ${dados.usuario.nome}!`
        );

        mostrarTela(telaDashboard);

        formLogin.reset();

    } catch (erro) {

        console.error("Erro no login:", erro);

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
// VERIFICA LOGIN SALVO
// ========================================

const tokenSalvo = localStorage.getItem("token");
const usuarioSalvo = localStorage.getItem("usuario");

if (tokenSalvo && usuarioSalvo) {

    try {

        const usuario = JSON.parse(usuarioSalvo);

        document.getElementById("nomeUsuario").textContent =
            usuario.nome;

        mostrarTela(telaDashboard);

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

console.log("SCRIPT ATUALIZADO DO CLAUDIOCK");