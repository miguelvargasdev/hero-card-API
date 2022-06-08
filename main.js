let companionList = {};
const list = document.querySelector('ul');

fetch(('/api'))
    .then(response => response.json())
    .then(json => {
        companionList = json
        console.log(companionList)
        for(let item in companionList){
            const newLi = document.createElement('li');
            newLi.innerText = item;
            list.appendChild(newLi);
        }
    });

