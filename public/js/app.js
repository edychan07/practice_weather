const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')
const msgicon = document.querySelector('.wicon')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    msgicon.src = ''
    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error
            } else {
                msg1.textContent = data.location
                msg2.textContent = data.forecast
                msgicon.src = "http://openweathermap.org/img/wn/"+data.icon+"@2x.png"
            }
        })
    })
})