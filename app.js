const express = require("express");
const { randomUUID } = require("crypto") //Gera id
const fs = require("fs");

const app = express();

app.use(express.json()); //Como ele recebe vários formatos, definir qual vai ser
//Como não vai ser utilizado banco de dados, cria um array
let produtos = [];

fs.readFile("produtos.json", "utf-8", (err, data) =>{
    if(err){
        console.log(err)
    }else{
        produtos = JSON.parse(data); //traz de volta para o formato objeto
    }
});


/*
POST -> Inserir um dado
GET -> Buscar um/mais dados
PUT -> Alterar um dado
DELETE -> Remover um dado 

--> Informações podem está vindo do:
Body => Sempre que quiser enviar dados p/aplicação
Params => /produto/575537889 - parametro de rota
Query => /produtos?id=76656687&value=1323

OBS: O navegador só executa para o tipo post, temos que acessar o body de outra forma, pode colocar a extensão -> Rest client
*/

app.post("/produtos", (request, response) => {
    //nome e preço
    const { nome, preco} = request.body;

    const produto = {
        nome, 
        preco,
        id: randomUUID(),
    };
    produtos.push(produto);

    //Atualize também o arquivo - usar o fs -- cria um arquivo

    produtoFile();

    return response.json(produto);
});



//Listar todos os produtos, pega o array e retorna
app.get("/produtos", (request, response) => {;
    return response.json(produtos)
});

//Buscar um produto
app.get("/produtos/:id", (request, response) =>{
    const { id } = request.params; // pega
    const produto = produtos.find((produto) => produto.id === id); // quando for iqual os ids, o que foi passado pela url
    return response.json(produto);
});

//atera produto
app.put("/produtos/:id", (request, response) =>{
    const {id} = request.params; // O que iremos receber -- alterar
    const {nome, preco} = request.body //vai receber o nome e o preço tbem

    //Encontrar qual objetos vamos alterar
    const produtoIndex = produtos.findIndex(produto => produto.id === id);

    //Altera exatamente aquele que recebeu
    produtos[produtoIndex] = {
        ...produtos[produtoIndex], //pega tudo menos essa
        nome, 
        preco
    };

    produtoFile();

    return response.json({message: "Produto alterado com sucesso"});
});

//Delete, deletar pelo id
app.delete("/produtos/:id", (request, response) => {
    const {id} = request.params; //pegando o id

    const produtoIndex = produtos.findIndex(produto => produto.id === id);

    produtos.splice(produtoIndex, 1); //remove baseado no id

    produtoFile() // atualizar lá no arquivo 

    return response.json({message: "Produto removido com sucesso"});
});


function produtoFile(){
    fs.writeFile("produtos.json", JSON.stringify(produtos), (err) => {
        if(err) {
            console.log(err)
        }else{
            console.log("Produto inserido")
        }
    })
}


//Porta disponibilizada
app.listen(4002, () => console.log("Servido rodando na porta 4002: http://localhost:4002"))


/*
app.get("/primeira-rota", (request, response) =>{
    //Retorna mensagem na tela -> return response.send("Acessou a primeira rota");
    return response.json({
        message: "Acessou a primeira rota com o nodemon"
    })
});

*/