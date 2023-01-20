const { Data, Usuario } = require("./data");
const Router = require("express").Router();

//Middleware
Router.use((req, res, next) => {
    //Tratar requisições aqui.
    next();
});
Router.use(require("express").text());

//API da página inicial:
Router.get("/", (req, res) => {
    require("fs").readFileSync(join("wwwroot", "index.html"), "utf-8");
});

Router.post("/usuario/verificacao", (req, res) => {
    res.status(200).send(Usuario.Verificar(req.body));
});

Router.get("/usuario/entrar", (req, res) => {
    let obj = req.headers['Conteudo'];
    res.send(Usuario.Entrar());
});

Router.get("/usuario/callback", (req, res) => {
    let obj = req.headers['Conteudo'];
    res.send(Usuario.Callback());
});

Router.get("/usuario/sair", (req, res) => {
    res.send(Usuario.Sair());
    let obj = req.headers['Conteudo'];
});

Router.get("/usuario/perfil", (req, res) => {
    let obj = req.headers['Conteudo'];
    res.send(Usuario.Perfil());
});

Router.get("/usuario/editar", (req, res) => {
    let obj = req.headers['Conteudo'];
    res.send(Usuario.Editar());
});

Router.get("/usuario/mudarsenha", (req, res) => {
    let obj = req.headers['Conteudo'];
    res.send(Usuario.MudarSenha());
});

Router.all("/asdf", (req, res) => {
    res.send("O sapo pulou dentro do rio!");
    console.log("O sapo pulou dentro do rio!");
});

Router.all("/qwert", (req, res) => {
    res.send("Que cachorrinho bonitinho!");
    console.log("Que cachorrinho bonitinho!");
});

Router.all("/123", (req, res) => {
    res.send("Princesa! Eu vim te salvar!");
    console.log("Princesa! Eu vim te salvar!");
});

//Mapeamento de erros:
Router.all("*", (req, res) => {
    res.status(404).send(require("fs").readFileSync("wwwroot/error.html", "utf-8"));
});

module.exports.Router = Router;