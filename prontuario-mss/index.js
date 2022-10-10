const express = require("express");
const app = express();


const rotasProntuario = require('./prontuario');
app.use('/', rotasProntuario);

app.listen(5000, () => {
    console.log("servidor subiu...");
})