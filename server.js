const http = require("http"); //Importando o http , nas aspas coloca a biblioteca que quer importar

//Requisição(req), e resposta(res)
http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' }); //Content - o formato, no caso json
    if(request.url === '/produto'){
        response.end(
            JSON.stringify({
            message: "Rota de produto"
            })
        );
    }
    if(request.url === '/usuario'){
        response.end(
            JSON.stringify({
            message: "Rota de usuario"
            })
        );
    }
    

    //response.end("Aplicação NodeJS"); -- mostra essa mensagem na tela ---> ,end, envia algo para quem fez a requisição 
    response.end(
        JSON.stringify({ // Retorna como JSON
        message: "Aplicação com o nosso nodeJS"
        })
    );
})
.listen(4001, () => console.log("Servidor está rodando na porta 4001: http://localhost:4001"));