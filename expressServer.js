const express = require('express');
const fs = require('fs');
const app = express();
const port = 8000;
app.get('/pets', function(req, res){
    fs.readFile('./pets.json', function(err, data){
        if(err){
            res.send('Nope')
        }else{
            allPets = JSON.parse(data);
            res.send(allPets)  
        }
    })
    
})

app.listen(port, ()=>{
    console.log(`listening to port ${port}`);
})