const addItemForm = document.getElementById("add-item-form");
console.log(addItemForm);

addItemForm.addEventListener("submit", async(e) =>{
    e.preventDefault();

    const itemData = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        image: document.getElementById('image').value,
        category: document.getElementById('category').value,
        quantity: document.getElementById('quantity').value,
        unit: document.getElementById('unit').value,
        expiry_date: document.getElementById('expiry').value,
        price: document.getElementById('price').value,
        owner_id: document.getElementById('owner').value
    };

    try{
            const response = await fetch('http://localhost:5001/api/items/addItem', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(itemData)
        });

        if (response.ok) {
            alert("Item added!");
            
        } else {
            alert("There is an error.");
            const errorData = await response.json();
            console.log("BACKEND SAID :" + errorData);
            alert(errorData.error);
        }
    } catch (err) {
        console.error("Hata:", err.message);
    }
    
});