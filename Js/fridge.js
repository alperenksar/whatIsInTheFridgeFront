import {linkToLogin} from './header.js';

const roleCategory = document.querySelectorAll(".role-item");





roleCategory.forEach(category => {
    category.addEventListener('click',async(e) =>{
        console.log("Clicked " + e.target.innerText);

        try {
        
        const response = await fetch(`https://whatisinthefridge.onrender.com/api/items/filterWithCategory?category=${e.target.innerText}`);
        const items = await response.json();

        const grid = document.getElementById('item-grid');
        grid.innerHTML = ''; 

        items.forEach(item => {
            
            grid.innerHTML += `
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




let imageDictionary = {}; 

async function initializeIcons() {
    const response = await fetch('../images.json');
    const data = await response.json();

    
    imageDictionary = data.reduce((acc, item) => {
        acc[item.name] = item.url; 
        return acc;
    }, {});

    console.log("Eşleşmeler Değişkene Atandı:", imageDictionary);
}


initializeIcons();








