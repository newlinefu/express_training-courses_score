const prices = document.querySelectorAll('.price')
const dates = document.querySelectorAll('.date')
const cardElement = document.getElementById('card')

function toCurrency(num) {
    return new Intl.NumberFormat('ru-RU', {
        currency: 'rub',
        style: 'currency'
    }).format(num)
}
function toDate(num) {
    return new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        mouth: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(new Date(num))
}
prices.forEach(price => {
    price.textContent = toCurrency(+price.textContent)
})

document.querySelectorAll('.date').forEach(date => {
    date.textContent = toDate(date.textContent)
})

if(cardElement) {
    cardElement.addEventListener(
        'click',
        event => {
            const deleteBtnTarget = event.target.closest('.delete_course_btn')
            if(deleteBtnTarget) {
                fetch(`/card/delete/${deleteBtnTarget.dataset.id}`, {
                    method: 'delete',
                    headers: {
                        'X-CSRF-Token': deleteBtnTarget.dataset.csurftoken
                    }
                })
                    .then(response => response.json())
                    .then(JSONCard => {
                        const objectCard = JSON.parse(JSONCard)
                        if(objectCard.courses.length) {
                            let resultCardHTML = `        
                            <table>
                                <thead>
                                    <tr>
                                        <td>Course</td>
                                        <td>Price</td>
                                        <td>Quantity</td>
                                        <td>Actions</td>
                                    </tr>
                                </thead>
                                <tbody>
                            `
                            for(let course of objectCard.courses) {
                                resultCardHTML += `
                                  <tr>
                                      <td>${course.title}</td>
                                      <td>${course.price}</td>
                                      <td>${course.count}</td>
                                      <td>
                                          <button class="btn standart-btn delete_course_btn" data-id="${course.id}" data-csurftoken="${objectCard.csurf}">
                                            Delete
                                          </button>
                                      </td>
                                  </tr>
                                `
                            }
                            resultCardHTML += `
                                    </tbody>
                                </table>
                                <p class="total-price">Total price: <span class="price">${toCurrency(objectCard.totalCount)}</span></p>
                                <form method="POST" action="/orders">
                                    <button type="submit" class="btn">To order</button>
                                    <input type="hidden" value="${objectCard.csurf}" name="_csrf">
                                </form>
                            `
                            cardElement.innerHTML = resultCardHTML
                        } else {
                            cardElement.innerHTML = `<p>Your card is empty</p>`
                        }
                    })
            }
        }
    )
}

M.Tabs.init(document.querySelectorAll('.tabs'))

