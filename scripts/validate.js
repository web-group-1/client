
const firstName = document.querySelector(".input-first-name")
const lastName = document.querySelector(".input-last-name")
const password = document.querySelector(".input-password")
const ConfirmPassword = document.querySelector(".input-confirm-password")
const email = document.querySelector(".input-email")
const phoneNumber = document.querySelector(".input-phone-number")

const errorFirstName = document.querySelector(".error-first-name")
const errorLastName = document.querySelector(".error-last-name")
const errorPassword = document.querySelector(".error-password")
const errorCconfirmPassword = document.querySelector(".error-confirm-password")
const errorEmail = document.querySelector(".error-email")
const errorPhoneNumber= document.querySelector(".error-phone-number")


const submit = document.querySelector(".submit")

function checkEmpty(element , errorMessage){

    if (element.value === ""){
        errorMessage.textContent = "this field can not be empty"
        
    }
}


submit.addEventListener("click",(e)=>{
    e.preventDefault()
    errorFirstName.textContent =errorLastName.textContent =errorPassword.textContent =
    errorCconfirmPassword.textContent =errorEmail.textContent =errorPhoneNumber.textContent = ""

    const isValidEmail = function(email){
      return  email.toLowerCase().match( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    }
   

    if (firstName.value === ""){
        errorFirstName.textContent = "this field can not be empty"
         return
    }
    if (lastName.value === ""){
        errorLastName.textContent = "this field can not be empty"
         return
    }
    if (password.value === ""){
        errorPassword.textContent = "this field can not be empty"
         return
    }
    if (password.value.length <= 8){
        errorPassword.textContent = "password should be 8 or more character "
         return
    }
    if (ConfirmPassword.value === ""){
        errorCconfirmPassword.textContent = "this field can not be empty"
         return
    }
    if (ConfirmPassword.value !== password.value){
        errorCconfirmPassword.textContent = "password not match"
         return
    }
    if (email.value === ""){
        errorEmail.textContent = "this field can not be empty"
         return
    }
    
    if (phoneNumber.value === ""){
        errorPhoneNumber.textContent = "this field can not be empty"
         return
    }
    if (!isValidPhone(phoneNumber.value)){
        errorPhoneNumber.textContent = "not the right format"
         return
    }
    
    
    alert("successmfully register")
})
