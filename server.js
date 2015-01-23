var express = require('express')
var app = express();
var fs = require('fs');

var file = "pets_file.txt";
var readFile = fs.readFileSync(file, 'utf8');
var petAry = JSON.parse(readFile); //petAry is already an array in the file, so parse and push into it

var fileWritten = function(err){
  if(err){
    console.log("Error");
  }
  else {
    console.log("Saved");
  }
}

//creating a petname and assigning it a type
app.get('/create/:pet_name/:pet_type', function(req, res) {

  var name = req.params.pet_name;
  var type = req.params.pet_type;

  var obj = {
    "name": name,
    "type": type,
    "pet": "pet"
  }

  petAry.push(obj);
  //console.log(petAry);

  fs.writeFile(file, JSON.stringify(petAry), fileWritten());
  res.send(petAry);

});


//read the pet's information through it's name
app.get('/read/:pet_name', function(req, res){


  str = {msg: "Cannot find name, you cant spell"}

  petAry.forEach(function(pet){
    if(req.params.pet_name === pet.name){
      str = {msg: pet}
    }

  });

  res.send(str.msg);

});


//update pet name object with a new pet name
app.get('/update/:pet_name/:new_pet_name', function(req, res){

  var newName = req.params.new_pet_name;
  var currentName = req.params.pet_name;

  petAry.forEach(function(pet){
    if(pet.name === currentName){
      pet.name = newName;
    }

  });

  fs.writeFile(file, JSON.stringify(petAry), fileWritten());

  res.send("success" + petAry);

});


//destroy pet object with the pet name
app.get('/destroy/:pet_name', function(req, res){

  var namedPetIndx = req.params.pet_name;

  petAry.forEach(function(pet){
    var petRmv = petAry.indexOf(pet);

    if(namedPetIndx === pet.name){
      petAry.splice(petRmv, 1);
    }

  });

  fs.writeFile(file, JSON.stringify(petAry), fileWritten());

});

//displays the array of pet object
app.get('/all_pets', function(req, res){

  res.send(petAry);

});

app.listen(3000);
console.log('listening on port 3000!');
