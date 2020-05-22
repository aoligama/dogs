$(document).ready(function() {
    startApp();
});

// API
const baseUrl = 'https://dog.ceo/api/breeds/list/all';

var dog,
    card;

async function startApp() {
    await requestDogInfo(baseUrl);

    buildSelectBreeds();
    getLocalStorage();
}

async function requestDogImg(){
    let breed = $('#breedDog').val();
    
    await fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(response => response.json())
    .then(image => {
        $('#dogImage').prop('src', image.message); 
    })
    .catch(err => console.log(err));
}

async function requestDogInfo(url) { 
    await fetch(url)
    .then(response => response.json())
    .then(data => {
        dog = data;
    })
    .catch(err => console.log(err));
}

function buildSelectBreeds(){
    let options = dog.message;
 
    for (var breed in options) {
        $('#breedDog').append(`<option value="${breed}">${breed}</option>`)
    }

}

function getLocalStorage() { 

    $('#listDogs').html('')
    if( Object.entries(localStorage).length >= 1 ){
        
        localDogs = Object.entries(localStorage)[0][1].split('"},{"').join('"}|{"').split('|');
        let auxLocal = [];
    
        for( i = 0; i < localDogs.length; i++){
            if( localDogs.length == 1 ){
                auxLocal.push(JSON.parse(localDogs[i]));
            } else{
                auxLocal.push(JSON.parse(localDogs[i]));
            }
        }
        
        if( localDogs.length == 1 ){
            localDogs = auxLocal[0];
        } else{
            localDogs = auxLocal; 
        }

        if( localDogs != null ){
            $('#listDogs').append(buildGridDogs());
        }
    }
    
    
}