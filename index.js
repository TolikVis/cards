let original = document.querySelector('#original');
let translate = document.querySelector('#translate');
let picture = document.querySelector('#picture');

let create = document.querySelector('#create');
let isUpdate = false;

function addDelete() {
    let _delete = document.querySelectorAll('.delete');
    for (const el of _delete) {
        el.addEventListener('click',()=>{
            cards = cards.filter((card)=> card.id != el.id);
            save('cards',cards);
            location.reload();
        })
    }
}

function addUpdate() {
    let update = document.querySelectorAll('.update');
    let create = document.querySelector('#create');
    for (const el of update) {
        el.addEventListener('click',()=>{
            let card = cards.filter((card)=> card.id == el.id);
            original.value = card[0].original;
            picture.value = card[0].picture;
            translate.value = card[0].translate;
            original.dataset.id = card[0].id;
            create.innerText = 'Update';
            console.log(card[0]);
        })
    }
}


let cards = JSON.parse(localStorage.getItem('cards')) || [];
let id = JSON.parse(localStorage.getItem('id')) || 0;

function _id(){
    id = +JSON.parse(localStorage.getItem('id')) + 1;
    localStorage.setItem('id',id);
}

function addToDOM(){
    let parent = document.querySelector('.form__picture__column');
    for (const card of cards) {
        let container = document.createElement('div');
        container.classList.add('form__picture__item');
        container.id = card.id;
        container.style.backgroundImage = `url('${card.picture}')`;
        console.log(card.picture);
        container.innerHTML = createHtmlCard(card);
        parent.appendChild(container);
    }
}

addToDOM();
addDelete();
addUpdate();
function createHtmlCard(obj){
    return `
    <p>original: ${obj.original}</p>
    <p>translate: ${obj.translate}</p>
    <div class="form-btns">
        <div class="btn delete"  id="${obj.id}">delete</div>
        <div class="btn update"  id="${obj.id}">update</div>
    </div>
    `
}


function createCard(original,translate,picture){
    if(!original.value){ myError(); return};
    if(!translate.value){ myError(); return};
    if(!picture.value){ myError(); return};
    if(original.dataset.id){
        cards = cards.map((el)=>{
            if(el.id == original.dataset.id){
                el.picture = picture.value;
                el.translate = translate.value;
                el.original = original.value;
            }
            return el;
        },cards)
        save('cards',cards);
        location.reload();
    } else{
        _id();
        cards.push({id,original: original.value,translate : translate.value ,picture :picture.value});
        save('cards', cards);
        location.reload();
    }
}

function myError(){
    alert('Error');
}

function save(key ,arr){
    localStorage.setItem(key, JSON.stringify(arr))
}

create.addEventListener('click',()=>{
    createCard(original,translate,picture);
})