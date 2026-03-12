const loadItems = async () => {
    try {
        
        const response = await fetch('http://localhost:5001/api/items/getItems');
        const items = await response.json();

        const grid = document.getElementById('items-grid');
        grid.innerHTML = ''; 

        items.forEach(item => {
            
            grid.innerHTML += `
                <div class="collection-card" id="item-${item.id}">
                    <div class="card-header">
                        <h3>${item.name}</h3>
                        <span class="tag">${item.category.toUpperCase()}</span>
                    </div>
                    <div class="card-body">
                        <p>Expiry Date: ${new Date(item.expiry_date).toLocaleDateString('en-EN')}</p>
                        <p>QUANTITY: ${item.quantity} ${item.unit}</p>
                    </div>
                    <div class="card-footer">
                        <p class="stats">${item.description}</p>
                        <p class="stats">£ ${item.price}</p>
                        <button onclick="deleteItem(${item.id})" class="delete-btn-simple">X</button>
                    </div>
                </div>
            `;
        });
    } catch (err) {
        console.error("Veriler çekilirken hata oluştu:", err);
    }
};
loadItems();

const searchBox = document.querySelector("#search-box")
searchBox.addEventListener("keyup",filterItems);


function filterItems(e){

    const searchTerm = document.getElementById('search-box').value.toLowerCase();
    const cards = document.querySelectorAll('.collection-card');

    cards.forEach(card => {
        
        const itemName = card.querySelector('h3').innerText.toLowerCase();
        
        
        if (itemName.includes(searchTerm)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
};







