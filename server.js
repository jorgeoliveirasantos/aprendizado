//#region IMPORTS
const { join } = require("path");
const express = require("express");
const app = express();
const { Router } = require("./app/router");
//#endregion

//#region CONFIGURAÇÕES INICIAIS DA APLICAÇÃO
app.use(express.static("wwwroot"));
app.use("/", Router);
const port = process.env.PORT || 3000;
//#endregion

//#region EXECUÇÃO
app.listen(port, () => {
    console.log(`Servidor ativo`);
});
//#endregion

//#region MÉTODOS
//#endregion

