// selecting the DOM elements
const currency_1_Ele = document.querySelector('.currency_1');
const currency_2_Ele = document.querySelector('.currency_2');
const amount_1_Ele = document.querySelector('.amount_1');
const amount_2_Ele = document.querySelector('.amount_2');
const swap_Ele = document.querySelector('.swap');


//  Creating countries list from API;
async function createList() {

    // Fetching the data from API
    let data = await fetch(`https://v6.exchangerate-api.com/v6/1c6055df2646cf3085c958d9/latest/INR`)

    // Converting the data into JSON 
    let xchange_rate = await data.json();

    let countries = Object.keys(xchange_rate.conversion_rates);

    // Inserting list datas
    countries.forEach((val) => {

        if (val === 'INR') {
            currency_1_Ele.insertAdjacentHTML('beforeend', `<option value="${val}"selected>${val}</option>`)
            currency_2_Ele.insertAdjacentHTML('beforeend', `<option value="${val}">${val}</option>`)

        } else if (val === 'USD') {

            currency_1_Ele.insertAdjacentHTML('beforeend', `<option value="${val}">${val}</option>`)
            currency_2_Ele.insertAdjacentHTML('beforeend', `<option value="${val}" selected>${val}</option>`)

        } else {
            currency_1_Ele.insertAdjacentHTML('beforeend', `<option value="${val}">${val}</option>`)
            currency_2_Ele.insertAdjacentHTML('beforeend', `<option value="${val}">${val}</option>`)
        }
    })

}

createList();

// Event listeners for change in the dropdown list and input in input element

currency_1_Ele.addEventListener('change', calculate);
currency_2_Ele.addEventListener('change', calculate);
amount_1_Ele.addEventListener('input', calculate);
amount_2_Ele.addEventListener('input', calculate);


// Call back function

async function calculate() {

    // Drop down list values
    let currency_1 = `${currency_1_Ele.value}`;
    let currency_2 = `${currency_2_Ele.value}`;

    // Fetching the data from API
    let data = await fetch(`https://v6.exchangerate-api.com/v6/1c6055df2646cf3085c958d9/latest/${currency_1}`)

    // Converting the data into JSON 
    let xchange_rate = await data.json();

    // Identifing the rate of the given data
    rate = xchange_rate.conversion_rates[currency_2];

    //Converstion
    amount_2_Ele.value = ((Number(amount_1_Ele.value)) * rate).toFixed(2);

}

// Swaping the data on the click event

swap_Ele.addEventListener('click', () => {

    let temp = currency_1_Ele.value;
    currency_1_Ele.value = currency_2_Ele.value;
    currency_2_Ele.value = temp;
    calculate();
});




