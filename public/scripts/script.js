const sum = document.querySelectorAll('.price');

for (let i = 0; i < sum.length; i++) {
    sum[i].innerHTML = Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(sum[i].innerHTML)
}