let darkMode = document.querySelector(".darkMode")
let search = document.querySelector("#search")
let submit = document.querySelector("#submit")

let select = document.querySelector("#filter")
let cards = document.querySelector("#cards")
let africa = document.querySelector("#africa")
let america = document.querySelector("#america")
let europe = document.querySelector("#europe")
let asia = document.querySelector("#asia")
select.onchange = function() {

    let filter = document.querySelectorAll("." + select.options[select.selectedIndex].text)
    filter.forEach(element => {
        element.classList.remove("unmatch")

    });
    let unmatch = document.querySelectorAll(".unmatch")
    unmatch.forEach(element => {
        element.style.display = "none"

    });
}

submit.onclick = function() {
    if (search.value != "") {

        async function searchRes() {
            let res = await fetch("https://restcountries.com/v3.1/name/" + search.value)
            let data = await res.json()
                //Object.keys(data[0].languages)[0]
            console.log(data)
            cards.innerHTML = `
            <button id="button">Back</button>
            <div class="row content2">
            <img class="col-5 img2" src="${data[0].flags.png}" title="${data[0].name.common}">
            <div class="docs2 col-5">
            <h4 style="margin-bottom:30px;">${data[0].name.common}</h4>
            <h6>Native Name: <span class="info">${data[0].name.common }</spna></h6>
            <h6>Population: <span class="info">${data[0].population}</spna></h6>
            <h6>Region: <span class="info">${data[0].continents}</spna></h6>
            <h6>Sub Region: <span class="info">${data[0].subregion}</spna></h6>
            <h6>Capital: <span class="info">${data[0].capital}</spna></h6>
            <h6>Languages: <span class="info">${JSON.stringify(data[0].languages)}</spna></h6>
            <h6>Languages: <span class="info">${data[0].borders}</spna></h6>
            </div>
            
            `
            let button = document.querySelector("#button")
            backButtton(button)
        }
        searchRes()

    } else {
        swal("Sorry you must fill the search input!")
    }
}

function backButtton(button) {
    button.addEventListener("click", function() {
        cards.innerHTML = ""
        getdata()
    })
}


async function getdata() {
    let res = await fetch("https://restcountries.com/v3.1/all")
    let data = await res.json()
    info(data)

}

function info(data) {
    cards.innerHTML += `${data.map(country=>`
    <div class="col-lg-3 col-md-2 col-sm-1 card unmatch ${country.continents}"id="${country.name.common}">
    <img class="img" src="${country.flags.png}" title="${country.flags.png}">
    <div class="docs">
    <h4 style="margin-bottom:10px;">${country.name.common}</h4>
    <h6>Population: <span class="info">${country.population}</spna></h6>
    <h6>Region: <span class="info">${country.continents}</spna></h6>
    <h6>Capital: <span class="info">${country.capital}</spna></h6>
    </div>
    </div>`)}`
    let card = document.querySelectorAll('.card')

    card.forEach(element => {
        element.addEventListener("click",function(){
            async function searchRes() {
                let res = await fetch("https://restcountries.com/v3.1/name/" + element.id)
                let data = await res.json()
                    //Object.keys(data[0].languages)[0]
                console.log(data)
                cards.innerHTML = `
                <button id="button">Back</button>
                <div class="row content2">
                <img class="col-5 img2" src="${data[0].flags.png}" title="${data[0].name.common}">
                <div class="docs2 col-5">
                <h4 style="margin-bottom:30px;">${data[0].name.common}</h4>
                <h6>Native Name: <span class="info">${data[0].name.common }</spna></h6>
                <h6>Population: <span class="info">${data[0].population}</spna></h6>
                <h6>Region: <span class="info">${data[0].continents}</spna></h6>
                <h6>Sub Region: <span class="info">${data[0].subregion}</spna></h6>
                <h6>Capital: <span class="info">${data[0].capital}</spna></h6>
                <h6>Languages: <span class="info">${JSON.stringify(data[0].languages)}</spna></h6>
                <h6>Languages: <span class="info">${data[0].borders}</spna></h6>
                </div>
                
                `
                let button = document.querySelector("#button")
                backButtton(button)
            }
            searchRes()
        })
        
    });

}

getdata()
