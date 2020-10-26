let cc
let tags = []
preload = () => { cc = loadJSON('https://api.covid19api.com/summary') }

function setup(){
    createCanvas(0, 0)    
    createTag(cc.Global, "Global")
    cc.Countries.forEach(country => createTag(country, country.Country)) 
    sortBy(1)
    tags.forEach(t => document.body.appendChild(t))
    console.log(tags)
}

function sortBy(sortN){
    // 0 = namn
    // 1 = number of cases
    // 2 = recovered
    // 3 = deaths
    // 4 = deathrate

    let n = tags.length
    while(n > 1){
        let newn = 0
        for(let i = 1; i < n - 1; i++){
            if(tags[i - 1].childNodes[sortN].innerHTML.match(/\d/g).join("") > tags[i].childNodes[sortN].innerHTML.match(/\d/g).join("")) {
                temp = tags[i - 1]
                tags[i - 1] = tags[i]
                tags[i - 1] = temp
                newn = i
            }
        }
        n = newn
    }
    //tags.sort((a,b) => (a.childNodes[sortN].innerHTML.match(/\d/g).join("") > b.childNodes[sortN].innerHTML.match(/\d/g).join("")) ? 1 : ((b.childNodes[sortN].innerHTML.match(/\d/g).join("") > a.childNodes[sortN].innerHTML.match(/\d/g).join("")) ? -1 : 0));
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
    if(country.TotalDeaths / country.TotalConfirmed == NaN) deathRate.innerHTML = "Death rate: " + 0
    else deathRate.innerHTML = "Death rate: " + ((country.TotalDeaths / country.TotalConfirmed)).toFixed(2)
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
    tags.push(tag)
}