//let _URL = "https://aprendizado-jorgesouza.azurewebsites.net";
let _URL = "http://localhost:3000";


const Login = {
    Usuario: {
        "Nome": 0,
        "E-mail": 0,
        "Senha": 0
    },
    Avancar: (etapa) => {
        switch (etapa) {
            case 1:
                Login.Verificar();
                break;
            case 2:
                Login.Login();
                break;
            case 3:
                Login.Cadastrar();
                break;
            case 4:
                Login.AlterarSenha();
                break;
        }
    },
    Verificar: () => {
        sessionStorage.setItem("email", document.getElementById("txt-email").value)
        async function chamada(caminho, _data) {
            let res = await fetch(caminho, {
                method: "POST",
                headers: {
                    'Content-Type': 'text/plain'
                },
                mode: "no-cors",
                body: JSON.stringify(_data)
            });
            return res.text();
        };
        //
        chamada(`${_URL}/usuario/verificacao`, sessionStorage.getItem("email")).then(data => {
            document.getElementById("msg-login").innerHTML = `Seja bem vindo ${JSON.parse(data)[0]}!
                <br>Insira sua senha para prosseguir.`;
            document.getElementById("login1-email").style.display = "none";
            document.getElementById("login2-senha").style.display = "block";
            document.getElementById("login3-cadastro").style.display = "none";
            document.getElementById("login4-mudar-senha").style.display = "none";
        }).catch(data => {
            document.getElementById("msg-cadastro").innerHTML = `${sessionStorage.getItem("email")}
                <br>não está cadastrado.
                <br>Preencha seus dados
                <br>e iremos cadastrá-lo.`;
            document.getElementById("login1-email").style.display = "none";
            document.getElementById("login2-senha").style.display = "none";
            document.getElementById("login3-cadastro").style.display = "block";
            document.getElementById("login4-mudar-senha").style.display = "none";
            document.getElementById("txt-nome-cadastro").focus();
        });
        //
        function renderizar() {
        }
    },
    Login: () => {
        //
        //renderizar();
        function renderizar() {
            document.getElementById("login1-email").style.display = "none";
            document.getElementById("login2-senha").style.display = "none";
            document.getElementById("login3-cadastro").style.display = "block";
            document.getElementById("login4-mudar-senha").style.display = "none";
        }
    },
    Cadastrar: () => {
        //
        renderizar();
        function renderizar() {
            document.getElementById("login1-email").style.display = "none";
            document.getElementById("login2-senha").style.display = "none";
            document.getElementById("login3-cadastro").style.display = "none";
            document.getElementById("login4-mudar-senha").style.display = "block";
        }
    },
    AlterarSenha: () => {
        //
    },
};






//#region UI Lógica
let senha = false;
function exibirSenha(el, txtsenha) {
    if (!senha) {
        el.innerText = "Ocultar senha";
        txtsenha.type = "text";
        senha = true;
    } else {
        el.innerText = "Exibir senha";
        txtsenha.type = "password";
        senha = false;
    }
}
//#endregion