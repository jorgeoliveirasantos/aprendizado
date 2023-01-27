//let _URL = "https://aprendizado-jorgesouza.azurewebsites.net";
let _URL = "http://localhost:3000";

const Login = {
    Usuario: {
        "ID": 0,
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
        if (document.getElementById("txt-email").value.includes(";")
            || document.getElementById("txt-email").value.includes(",")
            || document.getElementById("txt-email").value.includes("}")
            || document.getElementById("txt-email").value.includes(")")
            || document.getElementById("txt-email").value.includes(`"`)
            || document.getElementById("txt-email").value.includes('`')
            || document.getElementById("txt-email").value.includes(`'`)
            || !document.getElementById("txt-email").value.includes("@")
            || !document.getElementById("txt-email").value.includes(".")
            || document.getElementById("txt-email").value.length < 8) {
            Modal.PopUp("Ops", `O endereço de email fornecido é inválido!<br>
                        Você inseriu caracteres inválidos<br>ou deixou o campo vazio`);
        } else {
            Modal.Aguarde("Verificando endereço de e-mail");
            Login.Usuario["E-mail"] = document.getElementById("txt-email").value;
            //
            ChamadaAPI(`${_URL}/usuario/verificacao`, Login.Usuario["E-mail"], "POST").then(data => {
                Login.Usuario.ID = JSON.parse(data)[0];
                Login.Usuario.Nome = JSON.parse(data)[1];
                Login.Usuario["E-mail"] = JSON.parse(data)[2];
                document.getElementById("msg-login").innerHTML = `Seja bem vindo <span style="color: #FB0">${JSON.parse(data)[1]}</span>!<br>Insira sua senha para prosseguir.`;
                document.getElementById("login1-email").style.display = "none";
                document.getElementById("login2-senha").style.display = "block";
                document.getElementById("login3-cadastro").style.display = "none";
                document.getElementById("login4-mudar-senha").style.display = "none";
                Modal.FecharModal();
            }).catch(data => {
                document.getElementById("msg-cadastro").innerHTML = `<span style="color: #FB0">${Login.Usuario["E-mail"]}
                </span><br>não está cadastrado.<br>Preencha seus dados<br>e iremos cadastrá-lo.`;
                document.getElementById("login1-email").style.display = "none";
                document.getElementById("login2-senha").style.display = "none";
                document.getElementById("login3-cadastro").style.display = "block";
                document.getElementById("login4-mudar-senha").style.display = "none";
                document.getElementById("txt-nome-cadastro").focus();
                Modal.FecharModal();
            });
        }
    },
    Cadastrar: () => {
        function verificacao(txt) {
            if (txt.length < 5 || txt.includes(`,`) || txt.includes(`"`) || txt.includes(`'`) || txt.includes('`') || txt.includes(`}`) || txt.includes(`)`)) {
                return true;
            }
            return false;
        }
        //
        Login.Usuario.Nome = document.getElementById("txt-nome-cadastro").value;
        Login.Usuario["E-mail"] = document.getElementById("txt-email-cadastro").value;
        Login.Usuario.Senha = document.getElementById("txt-senha-cadastro").value;
        //
        if (verificacao(Login.Usuario.Nome) || verificacao(Login.Usuario["E-mail"]) || verificacao(Login.Usuario.Senha)) {
            Modal.PopUp("Ops", `Há informações inválidas no formulário!<br>
                        Você inseriu caracteres inválidos<br>ou deixou um campo vazio`);
        } else {
            Modal.Aguarde("Cadastro em andamento.");
            ChamadaAPI(`${_URL}/usuario/cadastrar`, Login.Usuario, "POST").then(data => {
                if (data == "Existente") {
                    Modal.Mensagem("Usuário Existente", "O endereço de e-mail fornecido<br>já está cadastrado.<br>Você queria fazer login?", () => window.location.replace(`${_URL}/login.html`));
                } else {
                    Login.Usuario.ID = JSON.parse(data)[0];
                    Login.Usuario.Nome = JSON.parse(data)[1];
                    localStorage.setItem("js-user-token", data);
                    Modal.FecharModal();
                    console.log(data);
                    Login.Usuario.Senha = undefined;
                }
            }).catch(data => {
                console.log(data);
                Modal.FecharModal()
                Login.Usuario.Senha = undefined;
            });
        }
        //
        //renderizar();
        function renderizar() {
            document.getElementById("login1-email").style.display = "none";
            document.getElementById("login2-senha").style.display = "none";
            document.getElementById("login3-cadastro").style.display = "none";
            document.getElementById("login4-mudar-senha").style.display = "block";
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
    AlterarSenha: () => {
        //
    },
    VerPerfil: () => {
        //
    },
    EditarUsuario: () => {
        //
    },
};



//#region API Lógica
async function ChamadaAPI(_caminho, _data, _metodo) {
    let res = await fetch(_caminho, {
        method: _metodo,
        headers: {
            'Content-Type': 'text/plain'
        },
        mode: "no-cors",
        body: JSON.stringify(_data)
    });
    return res.text();
};
//#endregion

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

const Modal = {
    PopUp: (titulo, txt) => {
        document.getElementsByTagName("modal")[0].innerHTML = `
            <div class="modal-conteiner">
                <div class="modal-conteudo" id="modal-conteudo">
                    <div class="modal-conteudo-titulo" style="padding: 15px;">${titulo}</div>
                    <div class="modal-conteudo-img"></div>
                    <div class="modal-conteudo-msg">
                        <p>${txt}</p>
                    </div>
                    <div style="width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                        <span></span>
                        <button class="js-button" onclick="Modal.FecharModal()">Fechar</button>
                    </div>
                </div>
            </div>
        `;
        func = () => callback();
        document.getElementById("modal-conteudo").style.display = "block";
    },
    Mensagem: (titulo, txt, callback) => {
        document.getElementsByTagName("modal")[0].innerHTML = `
            <div class="modal-conteiner">
                <div class="modal-conteudo" id="modal-conteudo">
                    <div class="modal-conteudo-titulo" style="padding: 15px;">${titulo}</div>
                    <div class="modal-conteudo-msg">
                        <p>${txt}</p>
                    </div>
                    <div style="width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                        <button class="js-button" onclick="Modal.FecharModal()">Cancela</button>
                        <button class="js-button" onclick="func()">Confirma</button>
                    </div>
                </div>
            </div>
        `;
        func = () => callback();
        document.getElementById("modal-conteudo").style.display = "block";
    },
    Erro: (txt, callback) => {
        document.getElementsByTagName("modal")[0].innerHTML = `
            <div class="modal-conteiner">
                <div class="modal-conteudo" id="modal-conteudo">
                    <div class="modal-conteudo-titulo" style="padding: 15px;">Erro!</div>
                    <div class="modal-conteudo-img">
                        <img src="/files/erro.svg" alt="">
                    </div>
                    <div class="modal-conteudo-msg">
                        <p>${txt}</p>
                    </div>
                    <div style="width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                        <span></span>
                        <button class="js-button" onclick="Modal.FecharModal()">Fechar</button>
                    </div>
                </div>
            </div>
        `;
        func = () => callback();
        document.getElementById("modal-conteudo").style.display = "block";
    },
    Aguarde: (txt) => {
        document.getElementsByTagName("modal")[0].innerHTML = `
            <div class="modal-conteiner">
                <div class="modal-conteudo" id="modal-conteudo">
                    <div class="modal-conteudo-titulo" style="padding: 15px;">Aguarde...</div>
                    <div class="modal-conteudo-img">
                        <img src="/files/Loading.gif" alt="">
                    </div>
                    <div class="modal-conteudo-msg">
                        <p>${txt}</p>
                    </div>
                    <div style="width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                        <span></span>
                        <button class="js-button" onclick="Modal.FecharModal()">Fechar</button>
                    </div>
                </div>
            </div>
        `;
        func = () => callback();
        document.getElementById("modal-conteudo").style.display = "block";
    },
    FecharModal: () => {
        document.getElementsByTagName("modal")[0].innerHTML = "";
    },
};

function loadElements() {
    document.getElementById("menu").innerHTML = `
        <a href="/index.html" id="logo-btn" title="Início">
            <img src="/files/logo.svg" style="height: 30px;">
        </a>
        <a>Informática</a>
        <a>Design Gráfico</a>
        <a>Javascript</a>
        <a>Web Apps</a>
        <span></span>
        <a id="login-btn" title="Usuário não logado" href="/login.html">
            <img src="/files/user-profile.svg" style="height: 30px;">
        </a>
    `;

    document.getElementById("app-rodape").innerHTML = `
        <div style="padding: 15px;">
            <div>Cursos:</div>
            <div><a>Informática</a></div>
            <div><a>Design Gráfico</a></div>
            <div><a>Javascript</a></div>
            <div><a>Web Apps</a></div>
        </div>
        <div style="padding: 15px;">
        <div>Apostilas:</div>
        <div><a>Informática</a></div>
        <div><a>Design Gráfico</a></div>
        <div><a>Javascript</a></div>
        <div><a>Web Apps</a></div>
        </div>
        <div style="padding: 15px;">
            <div>Contato:</div>
            <div><a>Whatsapp</a></div>
            <div><a>Instagram</a></div>
            <div><a>Facebook</a></div>
            <div><a></a></div>
            <div><a></a></div>
        </div>
        <div style="grid-row: 2; grid-column-start: 1; grid-column-end: 4; padding: 15px;">
            <hr style="border: none; border-top: var(--pretoLeve) 1px solid; margin: 0 10% 0 10%; padding: 15px;">
            <img src="/files/logo.svg" style="height: 50px;">
            <h3>Copyright ⓒ ${new Date().getFullYear()} | Jorge Souza Oliveira dos Santos</h3>
        </div>
    `;
    
    let btnUp = document.getElementById("btn-up");
    btnUp.innerHTML = `
        <img src="/files/btn-up.svg" style="width: 30px;">
    `;
    btnUp.onclick = () => {
        window.scrollTo( { top: 0, left: 0, behavior: 'smooth' } );
    }
}

//#endregion
/*
1
13
14
18
22
*/