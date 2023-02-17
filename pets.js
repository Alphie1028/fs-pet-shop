let fs = require('fs');
let input = process.argv[2];

//check if input is valid
if(input == 'read' || input == 'create' || input == 'update' || input == 'destroy'){
    if(input == 'read'){
        readData();
    }else if(input == 'create'){
        createData();
    }else if(input == 'update'){
        updateData();
    }else if(input == 'destroy'){
        destroyData();
    }
}else{

    console.error(new Error('No, not a valid command'));
    process.exit(1);
}

function readData(){
    let index = process.argv[3]; 
    fs.readFile('./pets.json', 'utf8', function(error, data){
        data = JSON.parse(data);
        if(data){
            if(index){
                if(data[index]){
                    console.log(data[index]);
                }else{
                    console.error(new Error('That pet does not exist'));
                }
            }else{
             console.log(data);   
            }
        }else{
            console.log(error);
       }
    })
}

function createData(){
    let age = process.argv[3];
    let kind = process.argv[4];
    let name = process.argv[5];
    if(age && kind && name){
        fs.readFile('./pets.json', 'utf8', function(error, data){
            data = JSON.parse(data);
            let newPet = {};
            newPet.age = parseInt(age);
            newPet.kind = kind;
            newPet.name = name;
            data.push(newPet);
            data = JSON.stringify(data);
            fs.writeFile('./pets.json', data, function (error){
            })
        })
    }else{
        console.error(new Error('Needs a age, kind, and name to make a new record of a pet'));
    }
}

function updateData(){
    let i = process.argv[3];
    let newage = process.argv[4];
    newage = parseInt(newage);
    let newkind = process.argv[5];
    let newname = process.argv[6];
    fs.readFile('./pets.json', 'utf8', function(error, data){
        data = JSON.parse(data);
        if(newage && newkind && newname){
            data[i].age = newage;
            data[i].kind = newkind;
            data[i].name = newname;
        }
        if(newage && newkind && !newname){
            data[i].age = newage;
            data[i].kind = newkind;           
        }
        if(newage && !newkind && !newname){
            data[i].age = newage;
        }
        data = JSON.stringify(data);
        fs.writeFile('./pets.json', data, function (error){
        })
    })
}

function destroyData(){
    let index = process.argv[3];
    fs.readFile('./pets.json', 'utf8', function(error, data){
        data = JSON.parse(data);
        data.splice(index, 1);    
        data = JSON.stringify(data);
        fs.writeFile('./pets.json', data, function (error){
        })

    })
}