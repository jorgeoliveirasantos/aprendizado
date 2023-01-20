const { EasyCrypto, EasyEncoding } = require("./crypto");
const Data = {
    f: () => {},
}
const Usuario = {
    Verificar: (obj) => {
        try {
            //let usuarios = EasyEncoding.Base64ToString(require("fs").readFileSync("./data/u", "utf-8"));
            let usuarios = JSON.parse(require("fs").readFileSync("./data/u2", "utf-8"));
            let u = usuarios.find(x => x['E-mail'] == obj.replace('"', "").replace('"', ""));
            let res = u != undefined ? `["${u['Nome']}", "${u['E-mail']}"]` : 404;
            return res;
        } catch (error) {
            console.log(error);
            return error
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
module.exports.Data = Data;
module.exports.Usuario = Usuario;