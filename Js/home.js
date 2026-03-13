import {linkToLogin} from './header.js';

let allImages = [];
let allImagesUrl = [];

async function loadImages() {
    const response = await fetch('../images.json');
    allImages = await response.json();

    console.log(allImages);
    
}
loadImages();

function getImageByName(itemName){

    let deneme = allImages[itemName]
        
    console.log(allImages[itemName]);
    return deneme;
}





const usedCategories = document.querySelectorAll(".role-item");
const recentlyBought = document.querySelector(".item-gallery");
console.log(recentlyBought);

usedCategories.forEach(category => {
    category.addEventListener('click', (event) => {
        console.log(`Basılan öğe:` + event.target.innerText);
    });
});



const recentlyUsedItems = async () => {

    try {
        
        const response = await fetch('http://localhost:5001/api/items/getRecentlyBought');
        const items = await response.json();

        recentlyBought.innerHTML = ''; 

        items.forEach(item => {
            
            recentlyBought.innerHTML += `
                <div class="item-card">
                    <div class="card-img">
                        <img src="${iconDictionary[item.name]}" alt="${item.name}">
                        <div class="expiry-date">${new Date(item.expiry_date).toLocaleDateString('en-EN')}</div>
                    </div>
                    <h3>${item.name}</h3>
                    <p class="category">${item.category}</p>
                </div>
            `;
        });
    } catch (err) {
        console.error("Couldnt get the datas:", err.message);
    }
};
recentlyUsedItems();



let iconDictionary = {}; // Tüm eşleşmeler bu değişkende duracak

async function initializeIcons() {
    const response = await fetch('../images.json');
    const data = await response.json();

    // reduce fonksiyonu ile diziyi tek bir objeye (sözlüğe) indirgiyoruz
    iconDictionary = data.reduce((acc, item) => {
        acc[item.name] = item.url; // İsim anahtar, URL değer oluyor
        return acc;
    }, {});

    console.log("Eşleşmeler Değişkene Atandı:", iconDictionary);
}

// Sayfa açılışında bir kez çalıştır
initializeIcons();





