function alertMessages(type){
    $(`.alert-${type}`).removeClass('hidden');

    setInterval(function(){
        if($(`.alert-${type}`).is(":visible")){
           $(`.alert-${type}`).hide();
        }
    }, 5000);
}

function setToLocalStorage(item){
    localStorage.clear();
    localStorage.setItem('myDogs', item);
    getLocalStorage();
}