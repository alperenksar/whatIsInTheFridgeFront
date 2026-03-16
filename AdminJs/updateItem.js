const updateItemForm = document.getElementById("update-item-form");
console.log(updateItemForm);



updateItemForm.addEventListener("submit", async(e) =>{
    e.preventDefault();
    const itemId = 2; 

    const itemData = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        
        category: document.getElementById('category').value,
        quantity: document.getElementById('quantity').value,
        unit: document.getElementById('unit').value,
        expiry_date: document.getElementById('expiry').value,
        price: document.getElementById('price').value,
       
    };

    try{
            const response = await fetch(`http://localhost:5001/api/items/updateItem/${itemId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(itemData)
        });

        if (response.ok) {
            alert("Item updated!");
            
        } else {
            alert("There is an error.");
            const errorData = await response.json();
            console.log("BACKEND SAID :" + errorData);
            alert(errorData.error);
        }
    } catch (err) {
        console.error("Error:", err.message);
    }
    
});


document.addEventListener('DOMContentLoaded', async () => {
    
    const itemId = 2; 
    
    try {
        const response = await fetch(`http://localhost:5001/api/items/getItem/${itemId}`);
        const data = await response.json();

        
        
        if (response.ok) {
            const item=data[0];
           
            console.log("Succesed", (item));
            
            
            console.log(item.name);
            document.getElementById('name').value = item.name;
            document.getElementById('description').value = item.description;
            document.getElementById('category').value = item.category;
            document.getElementById('quantity').value = item.quantity;
            document.getElementById('unit').value = item.unit;
            document.getElementById('expiry').value = item.expiry_date.split('T')[0];
            price: document.getElementById('price').value = item.price;
        } else {
            console.error("There is no item");
        }
    } catch (err) {
        console.error("Connection Error:", err.message);
    }
});