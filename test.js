let cards = JSON.parse(localStorage.getItem('cards'));

let idItem = JSON.parse(localStorage.getItem('idItem')) || 0;

function _id(){
    idItem = +JSON.parse(localStorage.getItem('idItem')) + 1;
    localStorage.setItem('idItem',idItem);
    if(idItem >= cards.length) localStorage.setItem('idItem',0);
}

createTest();
check();
function createTest() {
    let container = document.querySelector('.container');
    if(cards.length > 0){
        let test = document.createElement('div');
        test.classList.add('test');
        test.innerHTML = createHtml(cards[idItem]);
        container.appendChild(test);
    } else{
        alert("Error");
    }
}

function check() {
    let _check = document.querySelector('.check');
    _check.addEventListener('click',() =>{
        let input = document.querySelector('#answer');
        let image = document.querySelector('#image');
        let item = cards.filter(el=> el.id == image.dataset.id)[0];
        if(input.value.trim().toLowerCase() == item.translate.trim().toLowerCase()){
            alert('rigth');
            _id();
            location.reload();
        } else{
            alert('error');
        }
        
    })
}


function createHtml(obj) {
    return `
            <div class="image" id="image" style="background-image: url('${obj.picture}');" data-id="${obj.id}">${obj.original}</div>
            <div class="work">
                <input type="text" placeholder="Enter right answer" id="answer">
                <div class="btns">
                    <div class="btn check">Check</div>
                   <a href="index.html"><div class="btn">Create</div></a> 
                </div>
            </div>
    `
}