// ========================================
// TELAS
// ========================================

const telaSplash = document.getElementById("telaSplash");
const telaLogin = document.getElementById("telaLogin");
const telaCadastro = document.getElementById("telaCadastro");


// ========================================
// BOTÕES
// ========================================

const btnComecar = document.getElementById("btnComecar");

const btnVoltarLogin = document.getElementById("btnVoltarLogin");
const btnVoltarCadastro = document.getElementById("btnVoltarCadastro");

const btnIrCadastro = document.getElementById("btnIrCadastro");
const btnIrLogin = document.getElementById("btnIrLogin");


// ========================================
// FUNÇÃO PARA TROCAR DE TELA
// ========================================

function mostrarTela(tela) {

    telaSplash.classList.add("escondida");
    telaLogin.classList.add("escondida");
    telaCadastro.classList.add("escondida");

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


    const nome =
        document.getElementById("cadastroNome").value;

    const email =
        document.getElementById("cadastroEmail").value;

    const senha =
        document.getElementById("cadastroSenha").value;

    const confirmarSenha =
        document.getElementById("confirmarSenha").value;


    // Verifica as senhas

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


        // Login incorreto

        if (!resposta.ok) {

            alert(dados.mensagem);

            return;

        }


        // Salva o token

        localStorage.setItem(
            "token",
            dados.token
        );


        // Salva os dados do usuário

        localStorage.setItem(
            "usuario",
            JSON.stringify(dados.usuario)
        );


        console.log("Login realizado:", dados.usuario);

        console.log("Token:", dados.token);


        alert(
            `Bem-vindo, ${dados.usuario.nome}!`
        );


        // Por enquanto, volta para a tela inicial

        mostrarTela(telaSplash);


        formLogin.reset();


    } catch (erro) {

        console.error("Erro no login:", erro);

        alert(
            "Não foi possível conectar ao servidor."
        );

    }

});


// ========================================
// TESTE DO TOKEN
// ========================================

async function testarAutenticacao() {

    const token = localStorage.getItem("token");

    console.log("Token encontrado:", token);

    try {

        const resposta = await fetch(
            "http://localhost:3001/api/auth/perfil",
            {
                method: "GET",

                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );


        const dados = await resposta.json();


        console.log("STATUS DA API:", resposta.status);

        console.log("RESPOSTA DA API:", dados);


    } catch (erro) {

        console.error("ERRO AO ACESSAR API:", erro);

    }

}

testarAutenticacao();