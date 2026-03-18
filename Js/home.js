import {linkToLogin} from './header.js';

let allImages = [];

async function loadImages() {
    const response = await fetch('../images.json');
    allImages = await response.json();

   
    
}
loadImages();





const roleCategory = document.querySelectorAll(".role-item");
const allTabRoles = document.querySelectorAll(".role");

allTabRoles.forEach(role => {
    role.addEventListener('click',(e) => {
       
        allTabRoles.forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        
    });


    
});





roleCategory.forEach(category => {
    category.addEventListener('click',async(e) =>{
        
        

       
        let cate = e.target.innerText;

        try {
            const response = await fetch(`https://whatisinthefridge.onrender.com/api/items/filterWithCategory?category=${cate}`);
            const items = await response.json();

            recentlyBought.innerHTML = ''; 

            items.forEach(item => {
            
                recentlyBought.innerHTML += `
                    <div class="item-card">
                        <div class="card-img">
                            <img src="${imageDictionary[item.name]}" alt="${item.name}">
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

    });
});





const recentlyBought = document.querySelector(".item-gallery");
console.log(recentlyBought);




const recentlyBoughtItems = async () => {

   

    try {
        
        const response = await fetch(`https://whatisinthefridge.onrender.com/api/items/getItems`);
        const items = await response.json();

        recentlyBought.innerHTML = ''; 

        items.forEach(item => {
            
            recentlyBought.innerHTML += `
                <div class="item-card">
                    <div class="card-img">
                        <img src="${imageDictionary[item.name]}" alt="${item.name}">
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
recentlyBoughtItems();



let imageDictionary = {}; 

async function initializeIcons() {
    const response = await fetch('../images.json');
    const data = await response.json();

    
    imageDictionary = data.reduce((acc, item) => {
        acc[item.name] = item.url; 
        return acc;
    }, {});

    
}


initializeIcons();





