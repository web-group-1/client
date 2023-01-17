const humburger = document.querySelector(".humburger");
const  header_nav_pages= document.querySelector(".header_nav_pages");

humburger.addEventListener("click",()=>{
    humburger.classList.toggle("active");
    header_nav_pages.classList.toggle("active");

})

document.querySelectorAll("link--item").forEach(n => n.addEventListener("click",()=> {
    humburger.classList.remove("active");
    header_nav_pages.classList.remove("active");
}))




