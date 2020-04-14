let covidCases

function preload() {
    let url = 'https://api.covid19api.com/summary'
    covidCases = loadJSON(url)
}

function setup(){
    createCanvas(0, 0)

    var tag = document.createElement("div")
    var name = document.createElement("div")
    name.innerHTML = "Global"
    name.className += "name"
    tag.className += "country"

    var dead = document.createElement("div")
    dead.innerHTML = "Total deaths: " + covidCases.Global.TotalDeaths 
    dead.className += "info"

    var infected = document.createElement("div")
    infected.innerHTML = "Total confrimed cases: " + covidCases.Global.TotalConfirmed
    infected.className += "info"

    var recovered = document.createElement("div")
    recovered.innerHTML = "Total recovered: " + covidCases.Global.TotalRecovered
    recovered.className += "info"

    tag.appendChild(name)
    tag.appendChild(infected)
    tag.appendChild(recovered)
    tag.appendChild(dead)
    document.body.appendChild(tag)
    
    covidCases.Countries.forEach(country => {
        var tag = document.createElement("div")
        var name = document.createElement("div")
        name.innerHTML = country.Country
        name.className += "name"
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

        tag.appendChild(name)
        tag.appendChild(infected)
        tag.appendChild(recovered)
        tag.appendChild(dead)
        tag.appendChild(deathRate)
        document.body.appendChild(tag)
    })
}