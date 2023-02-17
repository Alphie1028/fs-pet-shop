const express = require('express');
const fs = require('fs');
const app = express();
const port = 8000;
app.get('/pets/:id?', function(req, res, next){
    fs.readFile('./pets.json', function(err, data, next){
        if(err){
            next();
        }else{
            allPets = JSON.parse(data);
            if(req.params.id){
                let index = parseInt(req.params.id);
                let chosenPet = allPets[index];
                if(chosenPet){
                    res.send(chosenPet);
                }else{
                    res.status(404).send('Pet not found.');
                }  
            }else{
                res.send(allPets);   
            }
        }
    })
})

app.use((req, res, next)=>{
    res.status(404).send('Page not found');
})



app.listen(port, ()=>{
    console.log(`listening to port ${port}`);
})