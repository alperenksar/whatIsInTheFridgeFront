

const allTabs = document.querySelectorAll(".tab-item");
console.log(allTabs);



allTabs.forEach(tab => {
    tab.addEventListener('click',(e) => {
        console.log("Clicked " + e.target.innerHTML);
        allTabs.forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
    });


    
});


allTabs.forEach(tab => {
    tab.addEventListener('click',async(e) =>{
        console.log("Clicked " + e.target.innerText);

        if(e.target.innerText === "All Items"){

            try {
                    const response = await fetch(`http://localhost:5001/api/items/getItems`);
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
                console.error("Couldnt get the datas:", err.message);
            }
        }

    });
});



allTabs.forEach(tab => {
    tab.addEventListener('click',async(e) =>{
        console.log("Clicked " + e.target.innerText);

        if(e.target.innerText === "Get Soon Expiry Date"){

            try {
                    const response = await fetch(`http://localhost:5001/api/items/getExpiringItems`);
                    const data = await response.json();
                    const items = data.items;
                    console.log(items);

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
                console.error("Couldnt get the datas:", err.message);
            }
        }

    });
});


allTabs.forEach(tab => {
    tab.addEventListener('click',async(e) =>{
        console.log("Clicked " + e.target.innerText);

        if(e.target.innerText === "Get All Users"){

            try {
                    const response = await fetch(`http://localhost:5001/api/auth/getUsers`);
                    const users = await response.json();
                    
                    console.log(users);

                    const grid = document.getElementById('items-grid');
                    grid.innerHTML = ''; 

                    users.forEach(user => {
            
                    grid.innerHTML += `
                    <div class="collection-card">
                    <div class="card-header">
                        <h3>Username : ${user.username}</h3>
                        
                    </div>
                    
                   
                </div>
                       
            `;
            });
            } catch (err) {
                console.error("Couldnt get the datas:", err.message);
            }
        }

    });
});







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
        console.error("Couldnt get the datas:", err.message);
    }
};
loadItems();





window.deleteItem = async (id) => {
    
    if (!confirm("This item will be delete.")) return;
    

    try {
        
        const response = await fetch(`http://localhost:5001/api/items/deleteItem/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            
            const card = document.getElementById(`item-${id}`);
            if (card) {
                card.style.opacity = '0'; 
                setTimeout(() => {
                    card.remove(); 
                }, 500);
            }
            console.log(`ID: ${id} is deleted.`);
        } else {
            alert("There is an error about deleting");
        }
    } catch (err) {
        console.error("Connection error:", err.message);
        alert("Cant react the server");
    }
};







