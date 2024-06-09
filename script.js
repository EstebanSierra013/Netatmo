let baseUrl = "https://randomuser.me/api/";
let userID = 0;

document.getElementById("add-btn").addEventListener("click",function(){
    addUsers()})

document.querySelectorAll('.gender-menu .dropdown-item').forEach(gender => {
    gender.addEventListener('click', function(){
        filterGender(gender.innerHTML.toLocaleLowerCase())
    })
})

document.querySelectorAll('.order-menu .dropdown-item').forEach(gender => {
    gender.addEventListener('click', function(){
        sortBirthDate(gender.innerHTML.toLocaleLowerCase())
    })
})



function addUsers(){
    fetch(baseUrl + '?' + new URLSearchParams({
        results: "10"
    }))
    .then(response => response.json())
    .then(data => {
        getData(data.results)
    })
}

function filterGender(valueGender){
    let container = document.querySelectorAll('.container-cards .card');
    container.forEach(card => {        
        card.style.display = "flex";
        if (!card.classList.contains(valueGender) && valueGender!="all") card.style.display = "none";
    })    
}

function sorter(a,b){
    let ageA = a.querySelector(".age");
    let ageB = b.querySelector(".age");
    return ageA.dataset.value.localeCompare(ageB.dataset.value);
}

function sortBirthDate(option){
    console.log(option)
    let listAges = Array.from(document.querySelectorAll('.cardBox'));
    console.log(listAges)
    let sortedAges = listAges.sort(sorter);
    if(option == "descending birth date") sortedAges.reverse()
    let container = document.querySelector('.container-cards')
    container.innerHTML = ""    
    sortedAges.forEach(e => container.appendChild(e));
}


function formatDate(date){
    let objectDate = new Date(date);
    let day = objectDate.getDate();
    let month = objectDate.getMonth()+1;
    let year = objectDate.getFullYear();
    return format1 = month + "/" + day + "/" + year;
}

function getData(user){
    let container = document.querySelector('.container-cards')
    user.forEach(user => {
        userID += 1;
        container.innerHTML += `
        <div class="cardBox col-12 col-md-6 col-lg-4 d-flex justify-content-evenly">
            <div id = "${userID}"  class = "card flex-column align-items-center ${user.gender}">
                <div class ="lines"></div>
                <div class ="profil">
                    <img src="${user.picture.large}" alt="user photo"/>                
                </div>                  
                <div class="details d-flex pt-4 flex-column align-items-center justify-content-around">
                    <h2>${user.name.first} ${user.name.last}</h2>
                    <div class="list-values w-75 d-flex flex-column"> 
                        <div class="d-flex justify-content-between align-items-center">                        
                            <i class="bi bi-geo-alt h2"></i>
                            <p>${user.location.street.number} ${user.location.street.name}</p>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <i class="bi bi-envelope h2"></i>
                            <p>${user.email}</p>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <i class="bi bi-cake2 h2"></i>
                            <p class="age" data-value ="${user.dob.age}">${formatDate(user.dob.date)} (${user.dob.age} años) </p>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <i class="bi bi-telephone h2"></i>
                            <p>${user.phone}</p>
                        </div>
                    </div>
                </div>
            </div>
            </div class button>
        </div>`
        
    })
    console.log(user);
}
    
