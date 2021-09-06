get = x=> document.querySelector(x)
getAll = x=> document.querySelectorAll(x)
let f1 = document.forms[`seachForm`]

const child = getAll(`.child`)
const img = getAll(`.img`)
const filmName = getAll(`.filmName`)
const type = getAll(`.type`)
const year = getAll(`.year`)
let data
let data2
let number =1
get(`.seachPage`).addEventListener(`click`, e=>{
    e.preventDefault()
    number=1
    search()
})

function search(){
    const XHR = new XMLHttpRequest();
    XHR.open('GET', `http://www.omdbapi.com/?s=${f1.search.value}&page=${number}&apikey=2a380ba9`)
    XHR.onreadystatechange = function(){
        if(XHR.readyState === 4 && XHR.status === 200){
            data = JSON.parse(XHR.responseText)
            render(data)
        }
    }
    XHR.send()
}


function render(data){
    get('.parentFlex').innerHTML = ''
    data.Search.forEach(element=>{
        get('.parentFlex').innerHTML += `
        <div class="child">
        <img class="img" src="${element.Poster}">
            <h3 class="filmName">${element.Title}</h3>
            <p class="type">${element.Type}</p>
            <p class="year">${element.Year}</p>
            <p class="id" style="display:none">${element.imdbID}</p>
            <button type="button" class="moreDetals">More details</button>
        </div>
        `
        get(`.parents`).innerHTML = `<button class="previusPage">Previus Page</button>
        <button class="nextPage">Next Page</button>`
    })

    get('.nextPage').addEventListener(`click`, nextPage)
    get(`.previusPage`).addEventListener(`click`, previousPage)
    getAll(`.moreDetals`).forEach(el => {
        el.addEventListener(`click`, moreDetails)  
    });
}

function nextPage(){
    number++
    search()
}
function previousPage(){
    if (number>1) {
        number--
        search()
        console.log(number);
    }
    else{
        get(`.previusPage`).disabled = true
    }
}
function moreDetails(name){
    let path = name.target.previousElementSibling.innerHTML
    const XHR = new XMLHttpRequest();
    XHR.open('GET', `http://www.omdbapi.com/?i=${path}&apikey=2a380ba9`)
    XHR.onreadystatechange = function(){
        if(XHR.readyState === 4 && XHR.status === 200){
            data2 = JSON.parse(XHR.responseText)
            displayIn(`.parInfoBlock`,`.parent`, `.parentFlex`, `.parents`)
            get(`.imgBlock`).src= data2.Poster
            get(`.titile`).innerHTML= data2.Title
            get(`.pg`).innerHTML= data2.Rated +` `+ data2.Year + ` ` +data2.Genre
            get(`.description`).innerHTML= data2.Plot
            get(`.writer`).innerHTML += `<span class="bold" >Writen by:</span> ` + data2.Writer
            get(`.directed`).innerHTML +=`<span class="bold" >Directed by:</span> `+ data2.Director
            get(`.staring`).innerHTML += `<span class="bold" >Starring:</span> `+ data2.Actors
            get(`.box`).innerHTML += `<span class="bold" >BoxOffice:</span> ` +data2.BoxOffice
            get(`.awards`).innerHTML += `<span class="bold" >Awards:</span> ` +data2.Awards
            get(`.ratings`).innerHTML += `<span class="bold" >Ratings:</span>`
            data2.Ratings.forEach(function(e,i){
                get(`.ratings`).innerHTML += `<p>${e.Source} ${e.Value}</p>`
            })
 
        }
        get(`.exit`).addEventListener(`click`, exit)
    }
    XHR.send()
}
function exit(){
    displayExit(`.parInfoBlock`,`.parent`, `.parentFlex`,`.parents`)
    get(`.pg`).innerText =``
    get(`.description`).innerHTML= ``
    get(`.writer`).innerHTML = ``
    get(`.directed`).innerHTML =``
    get(`.staring`).innerHTML = ``
    get(`.box`).innerHTML = ``
    get(`.awards`).innerHTML = ``
    get(`.ratings`).innerHTML =``
    
}

function displayExit(el1,el2,el3,el4){
    get(el1).classList.add(`dispNone`)
    get(el2).classList.remove(`dispNone`)
    get(el3).classList.remove(`dispNone`)
    get(el4).classList.remove(`dispNone`)
}
function displayIn(el1,el2,el3,el4){
    get(el1).classList.remove(`dispNone`)
    get(el2).classList.add(`dispNone`)
    get(el3).classList.add(`dispNone`)
    get(el4).classList.add(`dispNone`)
}