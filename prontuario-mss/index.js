const express = require("express");
const cors = require('cors')

const app = express();

app.use(express.json())
app.use(cors())

const rotasProntuario = require('./prontuario');

app.use('/prontuarios', rotasProntuario);

app.listen(5000, () => {
    console.log("servidor subiu...");
})