var localDogs;

function validFields() { 
    let arrDog = [];

    let breed   = $('#breedDog').val();
    let name    = $('#dogName').val();
    let color   = $('#dogColor').val();
    let font    = $('#fonte').val();

    if( breed != '' && name != '' && color != '' && font != '' ){
        arrDog.push({
            "image" : $("#dogImage").attr("src"),
            "breed" : breed,
            "name"  : name,
            "color" : color,
            "font"  : font,
            "date_time": new Date()
        });
    
        saveDog(arrDog);
    } else{
        alertMessages('warning');
    }
}

function saveDog(arrDog) { 
    let auxDog = [];
    arrDog = JSON.stringify(arrDog);
    
    if( localDogs != undefined ){
        localDogs.push(JSON.parse(arrDog)[0]);
        
        for( i = 0; i < localDogs.length; i++ ){
            auxDog.push(JSON.stringify(localDogs[i]))
        }

        localStorage.clear();
        localStorage.setItem('myDogs',  auxDog);
        getLocalStorage();
        alertMessages('success'); 
    } else{
        localStorage.setItem('myDogs', arrDog);
        getLocalStorage();
        alertMessages('success'); 
    }
}

function buildGridDogs() {
    var arrList = [];

    for( i = 0; i < localDogs.length; i++ ){
        let color = getColor(localDogs[i].color);
        let font = getFont(localDogs[i].font);
        
        htmList = `
            <li class="dog-item">
                <header>
                    <img src="${localDogs[i].image}" />
                    <div class="dog-info">
                        &nbsp;<strong class="${font} ${color}"> ${localDogs[i].name} </strong>
                        <br/>
                        &nbsp;&nbsp;<small>${localDogs[i].breed}</small>
                    </div>
                </header>
            </li>
        `;

        arrList.push(htmList);
    }

    return arrList;
}

function getFont(font) {
    var retFont = ''
    switch (font) {
        case 'os':
            retFont = 'oswald';
        break;
        case 'nu':
            retFont = 'nunito';
        break;
        case 'ar':
            retFont = 'arimo';
        break;
        case 'in':
            retFont = 'indie';
        break;
        case 'ka':
            retFont = 'kanit';
        break;
    }
    return retFont
}

function getColor(color){
    var retColor = ''
    switch (color) {
        case 'az':
            retColor = 'text-primary';
        break;
        case 'ci':
            retColor = 'text-secondary';
        break;
        case 'vd':
            retColor = 'text-success';
        break;
        case 'vm':
            retColor = 'text-danger';
        break;
        case 'am':
            retColor = 'text-warning';
        break;
    }
    return retColor
}

function alertMessages(type){
    $(`.alert-${type}`).removeClass('hidden');

    setInterval(function(){
        if($(`.alert-${type}`).is(":visible")){
           $(`.alert-${type}`).hide();
        }
    }, 5000);
}