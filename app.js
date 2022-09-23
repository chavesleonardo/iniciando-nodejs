const express = require("express");
const fs = require("fs");
const { randomUUID } = require("crypto");

const app = express();

//midleware para informar o formato que o framework irá utilizar
app.use(express.json());

let products = [];

fs.readFile("products.json", "utf-8", (err, data) => {
    if(err){
        console.log(err);
    }else{
        products = JSON.parse(data);
    }
});

/**
 * POST => Inserir dados
 * GET => buscar dados
 * PUT => Alterar dados
 * DELETE => remover dados
 * 
 * Body => Enviar dados para a aplicação
 * Params => /product/23
 * Query => /product?action=name&value=123
 *  
*/

app.post("/products", (request, response) => {
    
    const { name, price } = request.body;

    const product = {
        name,
        price,
        id: randomUUID(),
    };

    products.push(product);

    createProductFile();

    return response.json(product);
});

app.get("/products", (request, response) => {
    return response.json(products);
});

app.get("/product/:id", (request, response) => {
    const { id } = request.params;
    const product = products.find((product) => product.id === id);

    return response.json(product);

});

app.put("/product/:id", (request, response) => {
    const { id } = request.params;
    const { name, price } = request.body;

    const productIndex = products.findIndex(product => product.id === id);

    products[productIndex] = {
        ...products[productIndex],
        name,
        price
    }

    createProductFile();

    return response.json({message: "Produto alterado com sucesso"});
});

app.delete("/product/:id", (request, response) => {
    const { id } = request.params;

    const productIndex = products.findIndex(product => product.id === id);

    products.splice(productIndex, 1);

    createProductFile();

    return response.json({message: "Produto removido com sucesso"});
});

function createProductFile(){
    fs.writeFile("products.json", JSON.stringify(products), (err) => {
        if(err){
            console.log(err);
        }else{
            console.log("Salvo no arquivo.");
        }
    });
}

app.listen(4002, () => console.log("Servidor iniciado na porta 4002"));