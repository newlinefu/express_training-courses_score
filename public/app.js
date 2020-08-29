const prices = document.querySelectorAll('.price')

prices.forEach(price => {
    price.textContent = new Intl.NumberFormat('ru-RU', {
        currency: 'rub',
        style: 'currency'
    }).format(+price.textContent)
})