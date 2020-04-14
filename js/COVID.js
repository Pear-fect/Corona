let cc
preload = () => { cc = loadJSON('https://api.covid19api.com/summary') }

function setup(){
    createCanvas(0, 0)    
    createTag(cc.Global, "Global")
    cc.Countries.forEach(country => {
        createTag(country, country.Country)
    })
}

function createTag(country, name){
    var tag = document.createElement("div")
    var countryName = document.createElement("div")
    countryName.innerHTML = name
    countryName.className += "name"
    tag.className += "country"

    var dead = document.createElement("div")
    dead.innerHTML = "Total deaths: " + country.TotalDeaths 
    dead.className += "info"

    var infected = document.createElement("div")
    infected.innerHTML = "Total confrimed cases: " + country.TotalConfirmed
    infected.className += "info"

    var recovered = document.createElement("div")
    recovered.innerHTML = "Total recovered: " + country.TotalRecovered
    recovered.className += "info"

    var deathRate = document.createElement("div")
    deathRate.innerHTML = "Death rate: " + ((country.TotalDeaths / country.TotalConfirmed) * 100).toFixed(2) + "%"
    deathRate.className += "info"

    tag.appendChild(countryName)
    tag.appendChild(infected)
    tag.appendChild(recovered)
    tag.appendChild(dead)
    tag.appendChild(deathRate)
    let color = `rgb(${map(country.TotalDeaths / country.TotalConfirmed, 0, 0.15, 100, 255)}, 50, 50)`
    if(country.TotalConfirmed == 0 || country.TotalDeaths / country.TotalConfirmed == 0) color = '#eeeeee'
    tag.style.backgroundColor = color;
    tag.style.color = color;
    document.body.appendChild(tag)
}