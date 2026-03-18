const recentlyBoughtItems = async () => {

   

    try {
        
        const response = await fetch(`https://whatisinthefridge.onrender.com/api/items/getItem/2`);
        const items = await response.json();

        document.getElementById('product-name').innerText = items.name;
        document.getElementById('page-title').innerText = items.name;
        document.getElementById('product-category').innerText = items.category || "Genel";
        document.getElementById('product-quantity').innerText = items.quantity || "1 Adet";
        document.getElementById('product-id').innerText = `#${items.id}`;
    } catch (err) {
        console.error("Couldnt get the datas:", err.message);
    }
};
recentlyBoughtItems();