const { EasyCrypto, EasyEncoding, TokenGenerator } = require("./crypto");
const { Email } = require("./mail");
const Usuario = {
    Verificar: (obj) => {
        try {
            //let usuarios = EasyEncoding.Base64ToString(require("fs").readFileSync("./data/u", "utf-8"));
            let usuarios = JSON.parse(require("fs").readFileSync("./data/u/u2", "utf-8"));
            let u = usuarios.find(x => x['E-mail'] == obj);
            let res = u != undefined ? `["${u['ID']}","${u['Nome']}","${u['E-mail']}"]` : 404;
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    Cadastrar: (obj) => {
        function criarUsuario() {
            let u = JSON.parse(obj);
            console.log(u);
            console.log(u['E-mail']);
            //
            let verificacao2 = Usuario.Verificar(u['E-mail']);
            if (verificacao2 != 404) {
                return "Existente";
            } else {
                //Gravar o código de verificação:
                let codigo = Math.floor(Math.random() * (111111 - 999999) + 111111);
                //let usuarios = EasyEncoding.Base64ToString(require("fs").readFileSync("./data/u", "utf-8"));
                let usuarios = JSON.parse(require("fs").readFileSync("./data/u/u2", "utf-8"));
                let ID = usuarios.sort((x, y) => x['ID'] - y['ID'])[usuarios.length - 1]['ID'];
                ++ID;
                //Gravar o Índice:
                usuarios.push({ "ID": ID, "Nome": u.Nome, "E-mail": u['E-mail'] });
                require("fs").writeFileSync("./data/u/u2", JSON.stringify(usuarios, false, 3), "utf-8");
                //Gravar a Senha:
                let Senha = EasyCrypto.SHA256(u.Senha);
                require("fs").writeFileSync(`./data/u/s/${ID}`, Senha, "utf-8");
                //Gravar o Token:
                let Token = TokenGenerator.Generate(32, (1000 * 60 * 60 * 24));
                require("fs").writeFileSync(`./data/u/t/${ID}`, Token, "utf-8");
                let resposta = `["${ID}", "${u.Nome}", "${EasyCrypto.SHA256(Token)}"]`;
                return resposta;
            }
        }
        try {
            return criarUsuario();
        } catch (error) {
            console.log(error);
            return 500;
        }
    },
    Entrar: () => {
        return "";
    },
    Callback: () => {
        return "";
    },
    Sair: () => {
        return "";
    },
    Perfil: () => {
        return "";
    },
    Editar: () => {
        return "";
    },
    MudarSenha: () => {
        return "";
    },
}

const Postagens = {
    Carregar: (obj) => {
        let pastas = require("fs").readdirSync("./data/posts");
        let posts = [];
        for (let i = JSON.parse(obj)[0]; i <= JSON.parse(obj)[1]; i++) {
            if (require("fs").existsSync(`./data/posts/${i}.html`)) {
                posts.push(require("fs").readFileSync(`./data/posts/${i}.html`, "utf-8"));
            } else {
                posts.push(null);
            }
        }
        return posts;
    },
};

//const Data = { }
//module.exports.Data = Data;
module.exports.Usuario = Usuario;
module.exports.Postagens = Postagens;