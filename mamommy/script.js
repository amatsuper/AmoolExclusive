let shoppingBag = [];
function pushToBag(name, price) {
const match = shoppingBag.find(item => item.name === name);
if (match) {
match.count += 1;
} else {
shoppingBag.push({ name: name, price: price, count: 1 });
}
renderBag();
}
function dropFromBag(index) {
shoppingBag.splice(index, 1);
renderBag();
}
function renderBag() {
const listContainer = document.getElementById('bag-items-wrapper');
const totalBadge = document.getElementById('total-badge');
const finalTotal = document.getElementById('bag-grand-total');
let totalCount = shoppingBag.reduce((sum, current) => sum + current.count, 0);
totalBadge.innerText = totalCount;
if (shoppingBag.length === 0) {
listContainer.innerHTML = 'Your bag is empty. Choose a piece to start.';
finalTotal.innerText = 'Rp 0';
return;
}
let combinedHtml = '';
let cumulativePrice = 0;
shoppingBag.forEach((item, index) => {
let subcost = item.price * item.count;
cumulativePrice += subcost;
combinedHtml += <div class="cart-row"> <div class="cart-meta"> <h4>${item.name}</h4> <p>${item.count} Unit - Rp ${subcost.toLocaleString('id-ID')}</p> </div> <button class="btn-delete" onclick="dropFromBag(${index})">Remove</button> </div>;
});
listContainer.innerHTML = combinedHtml;
finalTotal.innerText = 'Rp ' + cumulativePrice.toLocaleString('id-ID');
}
function executeOrder(event) {
event.preventDefault();
if (shoppingBag.length === 0) {
alert('Keranjang belanja kosong!');
return;
}
const clientName = document.getElementById('client-name').value;
alert(`Terima kasih ${clientName}, pesanan Anda berhasil dicatat!`);

shoppingBag = [];
document.getElementById('order-form').reset();
renderBag();
}