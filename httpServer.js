let fs = require('fs');
let http = require('http');
let port = 8000;
let server = http.createServer((request, response)=>{
    console.log("request, recieved.");
    let URL = request.url;
    let method = request.method;
    console.log(URL);
    let arrURL = URL.split('/');
    console.log(arrURL);
    let index = arrURL[2];
    index = parseInt(index);
    console.log(index);
    let test = arrURL[1] == 'pets';
    console.log(test);
    if(arrURL[1] == "pets"){
        fs.readFile("./pets.json", 'utf8', function(err, data){
            if(err){
                response.setHeader('content-type', 'text/plain');
                response.statusCode = 404;
                response.end('Internal server error');
                return;
            }else{
                let allpets = JSON.parse(data);
                console.log(allpets);          
                if(arrURL.length > 1){
                    if(index >= 0 && index <= allpets.length -1){
                        response.setHeader('content-type', 'application/json');
                        response.statusCode = 200;
                        console.log(allpets[index]);
                        response.end(JSON.stringify(allpets[index]));
                    }else{
                        response.setHeader('content-type', 'text/plain');
                        response.statusCode = 404;
                        response.end('There is no such pet in that location');
                        return;
                    }                    
                }else{
                    response.setHeader('content-type', 'application/json');
                    response.statusCode = 200;
                    response.end(JSON.stringify(allpets))  
                }                
            }
        })
    }
})

server.listen(port, ()=>{
    console.log(`listening on port: ${port}`)
})
