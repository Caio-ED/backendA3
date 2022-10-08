const express = require("express");
const app = express();


const rotasProntuario = require('./prontuario');
app.use('/', rotasProntuario);

app.listen(4000, () => {
    console.log("servidor subiu...");
})