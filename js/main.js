let upper = document.querySelector(".upper");

window.addEventListener("scroll", function(){
    const nav = document.querySelector(".nav");
    let x = scrollY;
    if(x > 200){
        nav.style.transform = "translateY(0)";
        upper.style.transform = "translateY(0)";
    }else{
        nav.style.transform = "translateY(calc(-100% + -2px))";
        upper.style.transform = "translateY(calc(100% + 26px))";
    };
});

upper.addEventListener("click", function(){
    window.scrollTo(0,0);
});

let bars = document.querySelectorAll(".fa-cart-shopping");
let close1 = document.querySelector(".close");
let aside1 = document.querySelector(".cart");

bars.forEach((item) => {
    item.addEventListener("click", function(){
        aside1.style.transform = "translateX(0)";
    });
})

close1.addEventListener("click", function(){
    aside1.style.transform = "translateX(calc(100% + 2px))";
});

let asideSearch = document.querySelector(".asideSearch");
let searchs = document.querySelectorAll(".searchs");
let close2 = document.querySelector(".close2");
let addToCart = document.querySelector(".addToCart");

searchs.forEach((item) => {
    item.addEventListener("click", function(){
        asideSearch.style.transform = "translateX(0)";
    });
});

close2.addEventListener("click", function(){
    asideSearch.style.transform = "translateX(calc(100% + 2px))";
});

let row = document.querySelector(".products-row");
let spanCount = document.querySelectorAll(".spanCount");
let bot = document.querySelector(".bot");
let sec = document.querySelector(".sec");
let clearAll = document.querySelector(".clearAll");
let hearts = document.querySelectorAll("#hearts");

let list = [];

let cart;
if(localStorage.getItem("newItems") == null){
    cart = [];
    checkBtn();
    
}else{
    cart = JSON.parse(localStorage.getItem("newItems"));
    checkBtn();
};

let index1;

let getData = async function(){
    let api = await fetch("data.json");
    let response = await api.json();
    let products = response.products;
    list = products;
    displayProducts(products);
};
getData();

function displayProducts(take){
    let card = "";
    take.forEach((item, index) => {
        card += `
        <div class="card2">
        <div class="image">
            <img src="${item.images[0]}" alt="">
            <img src="${item.images[1]}" alt="" class="img2">
            <div class="icons">
                <div class="icon1" onclick="addToWishlist()"><i class="fa-regular fa-heart"></i></div>
                <div class="icon2"><i class="fa-solid fa-rotate"></i></div>
            </div>
            <div class="buttons">
                <button onclick="openInfo(${index})">Quick View</button>
                <button onclick="addtocart(${index})">Add To Cart</button>
            </div>
        </div>
        <div class="card-body">
            <h3>${item.title}</h3>
            <div class="price">
            <span class="disc">
                    ${item.disc}
                </span>
                <span class="realPrice">
                    ${item.price}
                </span>
            </div>
        </div>
    </div>
        `
    });
    row.innerHTML = card;
};

function searchingProducts(searching){
    let card = "";
    list.forEach((item, index) => {
        if(item.title.includes(searching.trim())){
            card += `
            <div class="card2">
            <div class="image">
                <img src="${item.images[0]}" alt="">
                <img src="${item.images[1]}" alt="" class="img2">
                <div class="icons">
                    <div class="icon1" onclick="addToWishlist()"><i class="fa-regular fa-heart"></i></div>
                    <div class="icon2"><i class="fa-solid fa-rotate"></i></div>
                </div>
                <div class="buttons">
                    <button onclick="openInfo(${index})">Quick View</button>
                    <button onclick="addtocart(${index})">Add To Cart</button>
                </div>
            </div>
            <div class="card-body">
                <h3>${item.title}</h3>
                <div class="price">
                <span class="disc">
                        ${item.disc}
                    </span>
                    <span class="realPrice">
                        ${item.price}
                    </span>
                </div>
            </div>
        </div>
            `
        };
    });
    row.innerHTML = card;
};

let counter = 0;

function addToWishlist(){
    counter++;
    hearts.forEach((item) => {
        item.innerHTML = counter;
    });
};

let overlay = document.querySelector(".overlay");
let title = document.querySelector(".right-info h4");
let price = document.querySelector("#price");
let disc = document.querySelector("#disc");
let plus = document.querySelector(".plus");
let minus = document.querySelector(".minus");
let count = document.querySelector(".left h3");
let leftImage = document.querySelector(".left-image img");
let close3 = document.querySelector(".close3");
let overRow = document.querySelector(".over-row");

function openInfo(index){
    index1 = index;
    overlay.style.display = "flex";
    setTimeout(() => {
        overRow.style.opacity = "1";
        overRow.style.transform = "translateY(0)";
    }, 100);
    let name1 = list[index].title;
    let img = list[index].images[0];
    let price2 = list[index].price;
    let discount = list[index].disc;
    leftImage.src = img;
    title.textContent = name1;
    price.innerHTML = price2;
    disc.innerHTML = discount;
};

close3.addEventListener("click", function(){
    overRow.style.opacity = "0";
    overRow.style.transform = "translateY(-20%)";
    setTimeout(() => {
        overlay.style.display = "none";
        count.innerHTML = 0;
    }, 350)
});

plus.addEventListener("click", function(){
    count.innerHTML++;
});

minus.addEventListener("click", function(){
    count.innerHTML--;
    if(count.innerHTML < 0){
        count.innerHTML = 0;
    };
});

function addtocart(index){
    let choosenProduct = list[index];
    let final = cart.find((item) => item.id == choosenProduct.id);
    if(final){
        final.count++;
    }else{
        cart.push({...choosenProduct, count: 1})
    };
    spanCount.forEach((item) => {
        item.innerHTML = cart.length;
    });
    displayThings();
    checkBtn();
    localStorage.setItem("newItems", JSON.stringify(cart));
};

addToCart.addEventListener("click", function(){
    let choosenProduct = list[index1];
    let final = cart.find((item) => item.id == choosenProduct.id);
    if(count.innerHTML > 1 && final){
        final.count = count.innerHTML;
    }else{
        cart.push({...choosenProduct, count: 1})
    };
    spanCount.forEach((item) => {
        item.innerHTML = cart.length;
    });
    displayThings();
    checkBtn();
    localStorage.setItem("newItems", JSON.stringify(cart));
});



function displayThings(){
    let card = "";
    for(let i in cart){
        card += `
        <div class="card3">
        <div class="left-image2">
            <img src="${cart[i].images[0]}" alt="">
        </div>
        <div class="right-buy">
            <h5>Beats Solo3 Wireless</h5>
            <span class="realPrice">
                ${cart[i].price}
            </span>
            <div class="left2">
                <h2>-</h2>
                <h6>${cart[i].count}</h4>
                <h2>+</h2>
            </div>
            <p><span>Count:</span> ${cart[i].count}</p>
            <i class="fa-regular fa-trash-can" onclick="deleteElement(${i})"></i>
        </div>
        </div>
        `
    };
    sec.innerHTML = card;
};
displayThings();

function deleteElement(index){
    cart.splice(index, 1);
    localStorage.setItem("newItems", JSON.stringify(cart));
    displayThings();
    checkBtn();
};

clearAll.addEventListener("click", function(){
    cart.splice(0);
    localStorage.clear();
    displayThings();
    checkBtn();
});

function checkBtn(){
    if(cart.length == 0){
        clearAll.style.display = "none";
        bot.style.display = "block";
        spanCount.forEach((item) => {
            item.innerHTML = 0;
        });
    }else{
        clearAll.style.display = "inline-block";
        bot.style.display = "none";
        spanCount.forEach((item) => {
            item.innerHTML = cart.length;
        });
    };
};

let head = document.querySelectorAll(".head");
let bottom = document.querySelectorAll(".bottom");
let rotate = document.querySelectorAll(".head i")

head.forEach((item, index) => {
    item.addEventListener("click", function(){
        if(bottom[index].style.height == 0){
            bottom[index].style.height = bottom[index].scrollHeight + "px"
            rotate[index].style.transform = "rotate(180deg)";
        }else{
            bottom[index].style.height = null;
            rotate[index].style.transform = "rotate(0deg)";
        };
    });
});

let bars2 = document.querySelectorAll(".bars2");
let close4 = document.querySelector(".close4");
let aside2 = document.querySelector(".aside1");

bars2.forEach((item) => {
    item.addEventListener("click", function(){
        aside2.style.transform = "translateX(0)";
    });
})

close4.addEventListener("click", function(){
    aside2.style.transform = "translateX(calc(-100% + -42px))"
});