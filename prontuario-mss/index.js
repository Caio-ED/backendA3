const express = require("express");
const app = express();


const rotasProntuario = require('./prontuario');
app.use('/prontuarios', rotasProntuario);

app.listen(5000, () => {
    console.log("servidor subiu...");
})