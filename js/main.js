let arrMeals;

$(window).on("load",()=>{
    setTimeout(()=>{
        $(".loading-screen").fadeOut(1000,()=>{
            $("body").css("overflow","visible")
        })
    },1000)
})
async function displayAllmeals(){
    var data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    var res = await data.json();
    console.log(res) 
    arrMeals = res.meals
    displaymeals(arrMeals)
}

displayAllmeals()


function displaymeals(arrMeals){
    let cartoona = ``;
    for(var i=0 ; i<arrMeals.length ; i++){
        cartoona+=`
        <div class="col-md-3">
        <div onclick="getImageDetails(${arrMeals[i].idMeal})" class="image-content">
        <img src=${arrMeals[i].strMealThumb} class="w-100 rounded-3" />
        <div class="layer d-flex  align-items-center">
            <h3>${arrMeals[i].strMeal}</h3>
        </div>
        </div>
    </div>
       
        `
    }
    document.querySelector(".row-Data").innerHTML = cartoona
}

async function getImageDetails(index){
    $(".loading-screen").fadeIn(300);
    $("body").css("overflow","hidden");
    console.log(index)
    try {
        // Fetch data
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${index}`);
        let data = await res.json();
        console.log(data);
        arrMeals = data.meals;
         displaImageDetails(arrMeals);
        // Hide loading screen
        $(".loading-screen").fadeOut(1000, () => {
            $("body").css("overflow","visible");
            // Display image details
            // arrMeals = data.meals;
            displaImageDetails(data.meals[0]);
        });
    } catch (error) {
        // Handle error
        console.error(error);
        $(".loading-screen").fadeOut(1000);
        $("body").css("overflow","visible");
    }
}

function displaImageDetails(arrMeals){
    let ingrediants =`` ;
    for(let i = 1 ; i<= 20 ; i++){
        if(arrMeals[`strIngredient${i}`]){
            ingrediants+= `<li class = "alert alert-info m-2 p-2">${arrMeals[`strMeasure${i}`]} ${arrMeals[`strIngredient${i}`]} </li>`
        }
    }
    let Tags = arrMeals.strTags?.split(",");
    if(!Tags)
    Tags = [];
    let tags = ``;
    for(let i=0 ; i<Tags.length ; i++){
        tags+=`<li class="alert alert-danger m-2 p-1">${Tags[i]} </li>`
    }
    let cartoona = ``;
  
        cartoona+=`
        <div class="col-md-4">
        <div class="image-content">
        <img src=${arrMeals.strMealThumb} class="w-100 rounded-3"  />
    
        </div>
        <h3 class = "text-white">${arrMeals.strMeal} </h3>
        </div>
        <div class="col-md-8 text-white"> 
        <h2>Instructions </h2>
        <p>${arrMeals.strInstructions} </p>
        <p class="fw-bold text-area">Area : <span> ${arrMeals.strArea} </span> </p> 
        <p class="fw-bold text-area">Category: <span>${arrMeals.strCategory} </span> </p>
        <p class="fw-bold text-area">Recipes: </p>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
        
        ${ingrediants} </ul>
        <p class="fw-bold text-area">Tags: </p>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
        ${tags}
    </ul> 
        <button class="btn btn-success"><a class="text-white" target="_blank" href=${arrMeals.strSource}>Source</a> </button>
        <button class="btn btn-danger"><a class="text-white" target="_blank" href=${arrMeals.strYoutube}>Youtube </a> </button>
     </div>
   
        `
    
    document.querySelector(".row-Data").innerHTML = cartoona
}

$(".side-nav").animate({"left":-$(".search-links").outerWidth()},500)

$(".open-close-icon").click(()=>{
   console.log()
  let icon = document.querySelector(".open-close-icon");
  if($(".side-nav").css("left") == "0px"){
      
      icon.classList.replace("fa-x","fa-align-justify")
        $(".side-nav").animate({"left":-$(".search-links").outerWidth()},500)
    }
    else{
        icon.classList.replace("fa-align-justify","fa-x")
        $(".side-nav").animate({"left":"0px"},500)
    }
})


async function getCategories(){

    $(".loading-screen").fadeIn(300);
    $("body").css("overflow","hidden");
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let data = await res.json();
    displayCategory(data.categories)
    console.log(data)
    $(".loading-screen").fadeOut(300);
    $("body").css("overflow","visible")
}


function displayCategory(arrMeals){
    let cartoona = ``;
    for(let i=0 ; i<arrMeals.length ; i++){
        cartoona+=`
        <div class="col-md-3">
        <div onclick="getMealsbyCategory('${arrMeals[i].strCategory}')" class="image-content">
        <img  src=${arrMeals[i].strCategoryThumb} class="w-100 rounded-3" />
        <div class="layer">
            <h3 class="text-center">${arrMeals[i].strCategory}</h3>
            <p class="text-center">${arrMeals[i].strCategoryDescription.split(' ').slice(0,20).join(" ")} </p>
        </div>
        </div>
    </div>
        
        `
    }
    document.querySelector(".row-Data").innerHTML = cartoona

}

$(".category").click(()=>{
    document.querySelector(".contact").classList.replace("d-flex","d-none")
    document.querySelector(".row-Data").classList.replace("d-none","d-flex")
    document.querySelector(".search-filter").classList.replace("d-block","d-none")
   getCategories()
})

async function getMealsbyCategory(index){
    
    $(".loading-screen").fadeIn(300);
    $("body").css("overflow","hidden");
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${index}`)
    let data = await res.json()
    $(".loading-screen").fadeOut(300);
    $("body").css("overflow","visible")
    displayAllmealsByCategory(data.meals.slice(0,20))
}

function displayAllmealsByCategory(arrMeals){
    let cartoona = ``;
    for(let i=0 ; i<arrMeals.length ; i++){
        cartoona+=`
        <div class="col-md-3">
        <div onclick="getfullMealDetails(${arrMeals[i].idMeal})"  class="image-content">
        <img  src=${arrMeals[i].strMealThumb} class="w-100 rounded-3" />
        <div class="layer d-flex  align-items-center">
            <h3 class="text-center">${arrMeals[i].strMeal}</h3>
            
        </div>
        </div>
    </div>
        
        `
    }
    document.querySelector(".row-Data").innerHTML = cartoona
}

async function getfullMealDetails(index){
    $(".loading-screen").fadeIn(300);
    $("body").css("overflow","hidden");
   let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${index}`)
    let data = await res.json()
    $(".loading-screen").fadeOut(300);
    $("body").css("overflow","visible")
   displaImageDetails(data.meals[0])
}

async function getArea(){
    $(".loading-screen").fadeIn(300);
    $("body").css("overflow","hidden");
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let data = await res.json();
    $(".loading-screen").fadeOut(300);
    $("body").css("overflow","visible")
    displayArea(data.meals)
}

function displayArea(arrMeals){
    let cartoona = ``;
    for(let i=0 ; i<arrMeals.length ; i++){
        cartoona +=`
        <div onclick="displayAllmealsArea('${arrMeals[i].strArea}')" class="col-md-3 text-white text-center">
        
        <i class="fa-solid fa-house-laptop  fa-4x"> </i>
        <h3>${arrMeals[i].strArea}</h3>

       
        
    </div>
        `
    }
    document.querySelector(".row-Data").innerHTML = cartoona
}

$(".area").click(()=>{
    document.querySelector(".contact").classList.replace("d-flex","d-none")
    document.querySelector(".row-Data").classList.replace("d-none","d-flex")
    document.querySelector(".search-filter").classList.replace("d-block","d-none")
    getArea()
})


async function displayAllmealsArea(index){
    $(".loading-screen").fadeIn(300);
    $("body").css("overflow","hidden");
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${index}`)
    let data = await res.json()
    $(".loading-screen").fadeOut(300);
    $("body").css("overflow","visible")
    displaymeals(data.meals.slice(0,20))
}

async function getIngredients(){
    $(".loading-screen").fadeIn(300);
    $("body").css("overflow","hidden");
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let data = await res.json()
    $(".loading-screen").fadeOut(300);
    $("body").css("overflow","visible")
    displayIngredients(data.meals.slice(0,20))
}

function displayIngredients(arrMeals){
    let cartoona = ``;
    for(let i=0 ; i<arrMeals.length ; i++){
        cartoona+=`
        <div onclick="getallMealIngredient('${arrMeals[i].strIngredient}')" class="col-md-3 text-center text-white">
        <i class="fa-solid fa-drumstick-bite fa-4x"> </i>
        <h3>${arrMeals[i].strIngredient} </h3>
        <p>${arrMeals[i].strDescription.split(" ").slice(0,20).join(" ")} </p>
    </div>
        `
    }
    document.querySelector(".row-Data").innerHTML = cartoona
}


$(".ingredients").click(()=>{
    document.querySelector(".contact").classList.replace("d-flex","d-none")
    document.querySelector(".row-Data").classList.replace("d-none","d-flex")
    document.querySelector(".search-filter").classList.replace("d-block","d-none")
    getIngredients()
})


async function getallMealIngredient(index){
   let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${index}`)
   let data = await res.json()
   displaymeals(data.meals)
}

$(".search").click(()=>{
    document.querySelector(".contact").classList.replace("d-flex","d-none")
    $(".loading-screen").fadeIn(300);
    $("body").css("overflow","hidden");
    document.querySelector(".search-filter").classList.replace("d-none","d-block")
    document.querySelector(".row-Data").classList.add("d-none")
    $(".loading-screen").fadeOut(300);
    $("body").css("overflow","visible")
})
document.querySelector(".search-meal").addEventListener("keyup",function(e){
console.log(e.target.value)
document.querySelector(".row-Data").classList.replace("d-none","d-flex")
getMealBySearch(e.target.value)
})
async function getMealBySearch(index){
    $(".loading-screen").fadeIn(300);
    $("body").css("overflow","hidden");
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${index}`)
    let data = await res.json()
    $(".loading-screen").fadeOut(300);
    $("body").css("overflow","visible")
    displaymeals(data.meals)
}
document.querySelector(".searchByLetter").addEventListener("keyup",function(e){
    document.querySelector(".row-Data").classList.replace("d-none","d-flex")
    getMealbyLetter(e.target.value)
})
async function getMealbyLetter(index){
    // $(".loading-screen").fadeIn(300);
    // $("body").css("overflow","hidden");
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${index}`)
    let data = await res.json()
    console.log(data)
    displaymeals(data.meals)
    // $(".loading-screen").fadeOut(300);
    // $("body").css("overflow","visible")

}




$('.contact-us').click(()=>{
    document.querySelector(".search-filter").classList.replace("d-block","d-none")
    document.querySelector(".row-Data").innerHTML = `
    
    `
    document.querySelector(".contact").classList.replace("d-none","d-flex")
    
    ;
   

}


)


function validateName(name){
    var test = /^[A-Z]{1}[A-Z-a-z0-9]{3,30}$/
    if(test.test(name)){
        document.querySelector(".alert-name").classList.replace("d-block","d-none")
        return true
    }
    else {
       document.querySelector(".alert-name").classList.replace("d-none","d-block")
       return false;
    }
}


document.querySelector(".valid-name").addEventListener("keyup",function(e){
    console.log(e.target.value)
    validateName(e.target.value)
    validateForm();
})

document.querySelector(".valid-email").addEventListener("keyup",function(e){
    console.log(e.target.value)
    validEmail(e.target.value)
    validateForm();
})
document.querySelector(".valid-pass").addEventListener("keyup",function(e){
    console.log(e.target.value)
    validPassword(e.target.value)
    validateForm();
})


function validEmail(email){
    var test = /^[A-Z]{1}[A-Za-z0-9_]{3,30}@gmail.com$/
    if(test.test(email)){
        globalemail = email
        document.querySelector(".alert-email").classList.replace("d-block","d-none")
        return true
    }
    else {
        document.querySelector(".alert-email").classList.replace("d-none","d-block")
        return false;
    }
}

function validPassword(pass){
    var test = /^[A-Z]{1}[A-Za-z0-9]{3,30}$/
    if(test.test(pass)){
       
        document.querySelector(".alert-pass").classList.replace("d-block","d-none")
        return true
    }
    else {
        document.querySelector(".alert-pass").classList.replace("d-none","d-block")
        return false;
    }
}

document.querySelector(".re-pass").addEventListener("keyup",function(e){
    let pass = document.querySelector(".valid-pass")
    if(e.target.value == pass.value ){
        document.querySelector(".alert-repass").classList.replace("d-block","d-none")
        return true;
    }
    else {
       document.querySelector(".alert-repass").classList.replace("d-none","d-block")
       return false;
    }
})


function validateForm() {
    var name = document.querySelector(".valid-name").value;
    var email = document.querySelector(".valid-email").value;
    var password = document.querySelector(".valid-pass").value;
    var rePassword = document.querySelector(".re-pass").value;
  
    var isNameValid = validateName(name);
    var isEmailValid = validEmail(email);
    var isPasswordValid = validPassword(password);
    var isRePasswordValid = (password === rePassword);
    console.log('hi')
    return isNameValid && isEmailValid && isPasswordValid && isRePasswordValid;
  }