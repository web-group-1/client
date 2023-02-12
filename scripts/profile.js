

let  courses_created =  document.getElementById("courses_created");
let courses_registered = document.getElementById("courses_registered");
console.log(courses_created);
let API_URL= 'http://localhost:3000';

let token = localStorage.getItem('token');
console.log({"token at the top":token});

window.onload = () => {
  if(token) {
    getprofilepage()
  } else {
    window.location.replace("../pages/signin.html")
  }
}


if (courses_created){
    courses_created.addEventListener('click',getCoursesCreated)
}
if (courses_registered){
    courses_registered.addEventListener('click',getCoursesRegistered)
}

let profile_page = document.getElementById('profile-page');
if (profile_page){
    profile_page.addEventListener('click',getprofilepage);
}





// token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEzLCJlbWFpbCI6InRlc3QxQGdtYWlsLmNvbSIsImlhdCI6MTY3NjEzNTU2MiwiZXhwIjoxNjc2MTM5MTYyfQ.QmCkiUQKHU-XmChyj8if77xfTeux2onaI1pTKYd_PiY'

async function getprofilepage(){
    try {
    const result =  await fetch('http://localhost:3000/users/me',{
        method:'GET',
        headers: {
            'Accept':'Application/json,text/plain,*/*',
            'content-type':'application/json; charset=utf-8',
            'Authorization': `Bearer ${token}`
        }
       
    })
    .then((res)=>res.json())
    .then((data)=>{
        let output = '';
        console.log({data,});
        if(data.status == 400 || data.status == 401) {
          window.location.replace("../pages/signin.html")
        }
        let element = data;
        localStorage.setItem('userId', element.id);
        console.log("heyyyyyy")
        output += 
            `<section class="h-100 gradient-custom-2 ">
            <div class="container py-5 h-100">
              <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col col-lg-9 col-xl-7">
                  <div class="card">
                    <div class="rounded-top text-dark d-flex flex-row bg-warning" style="height:200px;">
                      <div class="ms-4 mt-5 d-flex flex-column" style="width: 150px;">
                        <img  class = "rounded-circle" src="../photos/profilespacehold.svg"
                          alt="Generic placeholder image" class="img-fluid img-thumbnail mt-4 mb-2"
                          style="width: 150px; z-index: 1">

                            
                      </div>
                      
                      <div class="ms-3 m-5">
                        <h5>${element.firstName}  ${element.lastName}</h5>
                        <p>${element.emailAddress}</p>
                      </div>
                
                    </div>

                    <div class="d-flex mx-4">
                            <button type="button" class="btn btn-outline-dark m-2 shadow-lg p-1 mb-5 bg-body rounded" id="profile_edit" data-mdb-ripple-color="dark"
                            style="z-index: 1;">
                            Edit profile
                            </button>

                            <button type="button" class="btn btn-outline-dark m-2 shadow-lg p-1 mb-5 bg-body rounded" id="logout" onclick="logout()" data-mdb-ripple-color="dark"
                            style="z-index: 1;">
                            logout
                            </button>
                            
                            <button type="button" class="btn btn-outline-danger m-2 shadow-lg p-1 mb-5 bg-body rounded" id="delete_user" onclick="deleteUser()" data-mdb-ripple-color="dark"
                            style="z-index: 1;">
                            delete account
                            </button>
                          </div>

                    <div class="" id="profile_edit_form"></div>
                    <div class="p-4 text-black bg-light" >
                      <div class="d-flex justify-content-end text-center"> 
                      </div>
                    </div>
                    <div class="card-body p-4 text-black">
                      
                      <div class="d-flex justify-content-between align-items-center mb-4">
                        <button class="lead fw-normal mb-0 btn btn-warning" id="mycourses">My courses</button> 
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>   
          </section> `
          console.log("what on earth")
    document.getElementById('output').innerHTML = output;
    // the following function is going to call after the above htnl code id filled to the page
    console.log("just before afterfetched")
    afterFetched();
    })
        
    } catch (error) {
        console.log(error)
        console.log("cannot fetch");
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
          })
    }
    
};

userId = localStorage.getItem('userId');






async function getCoursesCreated(){
    console.log("courses created");
    const result =  await fetch(`http://localhost:3000/users/${userId}/courses`,{
        method:'GET',
        headers: {
            'Accept':'Application/json,text/plain,*/*',
            'content-type':'application/json; charset=utf-8',
            'Authorization': `Bearer ${token}`
        }
    }).then((res)=>res.json())
    .then((data)=>{
        console.log(data.created);
        // data = JSON.parse(data.created);
        // data = data.created;
        console.log(data.created);
        let output = " <div class='card mx-auto' style='width: 10rem;'><div class='card-body'><h5 class='card-title'>you havenot any creted course</h5><p class='card-text'></p><a href='#' class='btn btn-danger'>0</a></div></div>";
        if (data.created.length){
          output = ''
          data.created.forEach(element => {
              console.log(element); 
                output += 
                `<div class="card shadow-lg p-3 mb-5 bg-body-tertiary rounded " style="width: 18rem; margin: 20px;">
                <article class="card-body  align-self-center">
                    <h2 class="card-title">${element.name}</h2>
                    <p class="card-text"> 
                        ${element.description} </p>
                </article>
                <ul>
                <li class="list-group-item active "  aria-current="true" id="courseID">${element.id}</li>
                </ul>
                <button type="button" class="btn btn-warning" id="courseRegistration">Unregister</button>
            </div>  `
            });   
        }
    document.getElementById('cretedcourses').innerHTML = output;
    })
}

async function getCoursesRegistered(){
    const result =  await fetch(`http://localhost:3000/users/${userId}/courses`,{
        method:'GET',
        headers: {
            'Accept':'Application/json,text/plain,*/*',
            'content-type':'application/json; charset=utf-8',
            'Authorization': `Bearer ${token}`
        }
    }).then((res)=>res.json())
    .then((data)=>{
        // data = data.registeredFor;
        console.log(data.registeredFor);
        let output = " <div class='card mx-auto' style='width: 10rem;'><div class='card-body'><h5 class='card-title'>you haven't registered for a courses</h5><p class='card-text'></p><a href='#' class='btn btn-danger'>0</a></div></div>";
        if (data.registeredFor.length){
            output = ''
            data.registeredFor.forEach(element => {
                output += 
                `<div class="card shadow-lg p-3 mb-5 bg-body-tertiary rounded " style="width: 18rem; margin: 20px;">
                <article class="card-body  align-self-center">
                    <h2 class="card-title">${element.name}</h2>
                    <p class="card-text"> 
                        ${element.description} </p>
                </article>
                <ul>
                <li class="list-group-item active "  aria-current="true" id="courseID">${element.id}</li>
                </ul>
                <button type="button" class="btn btn-warning" id="courseRegistration">Register</button>
            </div>  `
            });   
        }  
    document.getElementById('registeredcourses').innerHTML = output;
    })
}

function profileEdit(){
  // profile_edit_form
  document.getElementById('profile_edit_form').innerHTML = `<section class=" m-5 py-5 flex-fill">
  <div class="form-body">
    <div class="row">
        <div class="form-holder">
            <div class="form-content">
                <div class="form-items">
                    <p>Fill in the data below.</p>
                    <form class="requires-validation" id="register" novalidate>
  
                        <div class="col-md-12">
                            <label class="form-label" for="form4Example0">First Name</label>
                           <input class="form-control firstname" id="form4Example0" type="text" name="name" placeholder="First Name" required>
                           <div class="valid-feedback">Username field is valid!</div>
                           <div class="invalid-feedback">Username field cannot be blank!</div>
                        </div>

                        <div class="col-md-12">
                            <label class="form-label" for="form4Example0">Last Name</label>
                           <input class="form-control lastname" id="form4Example4" type="text" name="name" placeholder="Last Name" required>
                           <div class="valid-feedback">Username field is valid!</div>
                           <div class="invalid-feedback">Username field cannot be blank!</div>
                        </div>
  
                        <div class="col-md-12">
                            <label class="form-label" for="form4Example1">Email</label>
                            <input class="form-control email" id="form4Example1" type="email" name="email" placeholder="E-mail Address" required>
                             <div class="valid-feedback">Email field is valid!</div>
                             <div class="invalid-feedback">Email field cannot be blank!</div>
                        </div>       
                       
              
  
                        <div class="form-button mt-3">
                            <button id="button_update" type="submit" class="btn btn-primary">update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  </div>
</section>
`
setUpUpdateForm()
}



function afterFetched(){
  console.log("in afterfetched")
    let  courses_created =  document.getElementById("courses_created");
    let Mycourses = document.getElementById("mycourses");
    let profile_edit = document.getElementById("profile_edit");
     console.log({profile_edit,});

     if (courses_created){
    courses_created.addEventListener('click',getCoursesCreated)
    }
    if (Mycourses){
    Mycourses.addEventListener('click',()=>{
      window.location.replace("../pages/mycourses.html")
    })
    }
    if (profile_edit){
      profile_edit.addEventListener('click',profileEdit)
    }
}





async function setUpUpdateForm(){
  console.log("on the setU[UpdateForm function");

 let button_update = document.getElementById("button_update");
 if (button_update){
  console.log("button update is found");
  console.log(button_update)
  button_update.addEventListener('click',update)
 }
}



async function update(e){
  e.preventDefault()
  let firstName = document.getElementById("form4Example0").value;
  let lastName = document.getElementById("form4Example4").value;
  let emailAddress = document.getElementById("form4Example1").value;
  console.log(firstName);
  console.log(lastName);
  console.log(emailAddress);
  try {

    /*javascript frontend with fetch api that can send value to the Nestjs api controller for userupdate*/
    const response = await fetch(`http://localhost:3000/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        firstName:firstName,
        lastName:lastName,
        email:emailAddress,
      }),
    })
      .then((res)=> {
          console.log(res.status)
          if (res.status === '201'|| 201) {
              Swal.fire(
                  'Good job!',
                  'You clicked the button!',
                  'success'
                );
          window.setTimeout(() => {
              location.assign('../index.html');
          }, 700)}
          else{
              Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'please try again!',
              
                })
          }
          });
      
  } catch (error) {
    console.log(error)
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'please try again!'
        })
      
  }
 
}

function logout() {
  localStorage.setItem("token","");
  console.log({"token": localStorage.getItem("token")})
  window.location.replace("../pages/signin.html")
}

