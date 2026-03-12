import {linkToLogin} from './header.js';



const usedCategories = document.querySelectorAll(".role-item");

usedCategories.forEach(category => {
    category.addEventListener('click', (event) => {
        console.log(`Basılan öğe:` + event.target.innerText);
    });
});

