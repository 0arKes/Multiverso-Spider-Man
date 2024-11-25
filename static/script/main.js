const data = `./static/script/data.json`
const image = document.getElementById("image")
const title = document.getElementById("title")
const icon = document.getElementById("icon_spider")
const sinopse = document.getElementById("text-sinopse")
const cards = document.querySelectorAll(".card-image")
const last_movie = document.getElementById("last-movie")
const year = document.getElementById("ano")
const director = document.getElementById("diretor")
const btn_menu = document.querySelectorAll(".btn-movies")
const spiderman = document.getElementById("spider-img")
const s = document.getElementsByClassName("spiderman-div")[0]

let button_status = true
let active_member = 0
let active_movie = 0

let cachedData = null;

function rData(){
        if (cachedData) return Promise.resolve(cachedData);
        return fetch(data)
            .then(response => {
                if (!response.ok) throw new Error(`Erro ao carregar JSON: ${response.statusText}`);
                return response.json();
            })
            .then(json => {
                cachedData = json;
                return json;
            });
}

rData()


function update(a=0){
    let member = cachedData['spider_men'][active_member];
    let movie = member['movies'][a];

    title.innerHTML = member["name"]
    icon.src = member["logo_url"]
    movies = (member["movies"])

    if (movies.length === 3){
        last_movie.disabled = false
    }else{
        last_movie.disabled = true
    }

    sinopse.innerHTML = movie["synopsis"]

    cards.forEach((element, i) => {
        element.src = movie["images"][i]
        year.innerHTML = `<strong>${movie["year"]}</strong>`
        director.innerHTML = `<strong>${movie["director"]}</strong>`
    });
    
    spiderman.src = member["spiderman"]
}


function buttonModify(){
    const button_prev = document.getElementById("prev")
    const isFirst = active_member === 0
    button_prev.disabled = isFirst

    const button_next = document.getElementById("next")
    const isLast = active_member >= 2
    button_next.disabled = isLast
    update()
    
}


function navMenu(direction){
    spiderExit()
    if(button_status === true){
        button_status = false
        setTimeout(() =>{
            active_member += direction
            active_movie = 0
            console.log(active_member)
            image.style.transform = `translateY(${-100 * active_member}vh)`
            resetBtn()
            buttonModify()
            spiderEnter()
            button_status = true
        }, 1500)
    }
}


function moveDet(position, clicked_btn){
    btn_menu.forEach(btn => {
        btn.classList.remove("btn-movies-active")
    })
    clicked_btn.classList.add("btn-movies-active")
    return update(position)
}


function resetBtn(){
    btn_menu.forEach((element, ind) => {
        if (ind === 1 || ind === 2){
            element.classList.remove("btn-movies-active")
        }else{
            element.classList.add("btn-movies-active")
        }
    })
}


function spiderEnter(){
    s.classList.remove("spiderman-div-exit")
    s.classList.add("spiderman-div-enter")
}


function spiderExit(){
    s.classList.add("spiderman-div-exit")
    s.classList.remove("spiderman-div-enter")
}