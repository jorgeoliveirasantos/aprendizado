const Editor = {
    Senha: "",
    Acessar: function (txt) {
        console.log(txt.slice(1, -1) == Editor.Senha ? true : false);
        return txt.slice(1, -1) == Editor.Senha ? true : false;
    },
    Salvar: function (txt) {
        try {
            Executar().then(() => {
                return 200;
            })
        } catch (error) {
            return 500;
        }
        async function Executar() {
            let Curso = {
                Senha: '123',
                Nome: 'Jorge',
                Arquivo: { "sessao 1": "conteudo da sessao", "sessao 2": "conteudo da sessao", "sessao 3": "conteudo da sessao" }
            };
            Curso = JSON.parse(txt);
            let Nome = Curso.Nome;
            let Senha = Curso.Senha;
            let tituloSessoes = Object.keys(Curso.Arquivo);
            let conteudoSessoes = Object.values(Curso.Arquivo);
            Curso = null;
            //
            let menu = "";
            //
            for (const i in tituloSessoes) { menu += `<a href="${tituloSessoes[i]}.html" class="lnk">${tituloSessoes[i]}</a>\n` }
            //
            let Arquivos = [];
            //
            for (let i = 0; i < tituloSessoes.length; i++) {
                let navButtons = "";
                if (i == 0) {
                    navButtons = `
                    <a class="js-button" style="opacity: 0.5;">Anterior</a>
                    <div><span style="width: 1%;"></span></div>
                    <a href="${tituloSessoes[i +1]}.html" class="js-button">Próximo</a>`;
                } else if ((conteudoSessoes.length -1) == i) {
                    navButtons = `
                    <a href="${tituloSessoes[i - 1]}.html" class="js-button">Anterior</a>
                    <div><span style="width: 100%;"></span></div>
                    <a class="js-button" style="opacity: 0.5;">Próximo</a>`;
                } else {
                    navButtons = `
                    <a href="${tituloSessoes[i -1]}.html" class="js-button">Anterior</a>
                    <div><span style="width: ${(100 * i) / tituloSessoes.length}%;"></span></div>
                    <a href="${tituloSessoes[i +1]}.html" class="js-button">Próximo</a>`;
                }
                //
                if (!require("fs").existsSync(`./wwwroot/cursos/${Nome}/`)) {
                    require("fs").mkdirSync(`./wwwroot/cursos/${Nome}/`, { recursive: false });
                }
                require("fs").writeFileSync(`./wwwroot/cursos/${Nome}/${tituloSessoes[i]}.html`, esqueleto(Nome, conteudoSessoes[i], navButtons, menu), "utf-8");
            }
        }
        //
    },
}

let esqueleto = (nomeCurso, conteudo, botoes, menu) => {
    return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/index.css">
        <script src="/index.js"></script>
        <link rel="shortcut icon" href="/files/logo.svg" type="image/x-icon">
        <title>${nomeCurso} | Jorge Souza</title>
    </head>
    
    <body>
        <div class="Shell">
            <!-- Linha 1 MENU-->
            <div class="menu" id="menu"></div>
            <!-- Linha 2 APP -->
            <div class="App">
                <div class="app-barralateral-esquerda">
                    ${menu}
                </div>
                <div class="app-conteudo">
                    <div class="js-post">
                            <div class="nav-buttons">
                                ${botoes}
                            </div>
                    </div>
                        <div class="js-post">
                            ${conteudo}
                        </div>
                </div>
                <div class="app-barralateral-direita">
                    <script async
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7018638705666056"
                        crossorigin="anonymous"></script>
                </div>
            </div>
            <!-- Linha 2 APP -->
            <div class="app-rodape" id="app-rodape"></div>
        </div>
        <modal></modal>
        <div class="btn-up" id="btn-up"></div>
    </body>
    <script>
        loadElements();
    </script>
    
    </html>
    <modal>
    </modal>
    `;
}

module.exports.Editor = Editor;