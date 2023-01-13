//#region IMPORTS
const { join } = require("path");
//#endregion

//#region CONFIGURAÇÕES INICIAIS DA APLICAÇÃO
const express = require("express");
const app = express();
app.use(express.static("wwwroot"));
const port = process.env.PORT || 4991;
//#endregion

//#region APIs
//API da página inicial:
app.get("/", (req, res) => {
    require("fs").readFileSync(join("wwwroot", "index.html"));
});
//API da página de erros:
app.all("*", (req, res) => {
    require("fs").readFileSync(join("wwwroot", "error.html"));
});
//#endregion

//#region EXECUÇÃO
app.listen(port, () => {
    console.log(`Servidor ativo`);
});
//#endregion

//#region MÉTODOS
//#endregion