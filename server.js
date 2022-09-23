//demonstração com NodeJS puro

const http = require("http");

//cria um servidor local para receber dados
http
    .createServer((request, response) => {
        
        //status da requisição (200) e tipo de retorno (JSON)
        response.writeHead(200, { 'Content-Type' : 'application/json' });

        //filtra a URL para definir as rotas
        switch (request.url) {

            case "/produto":
                response.end(JSON.stringify({message: 'Rota para os Produtos'}));
                break;
        
            case "/usuario":
                response.end(JSON.stringify({message: 'Rota para os Usuários'}));
                break;

            default:
                response.end(JSON.stringify({'message':'Qualquer outra rota'}));
                break;
        
        }//end switch

    })
    .listen(4001, () => console.log("Server rodando na porta 4001"));