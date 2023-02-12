

let  courses_created =  document.getElementById("courses_created");
let courses_registered = document.getElementById("courses_registered");
console.log(courses_created);
let API_URL= 'http://localhost:3000';

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



let secondOperation = false;

let userId=1;
let firstName = "first name";
let lastName = "last name"
let emailAddress = "useremail";
let password ="";




let token = localStorage.getItem('token');
console.log(token);
// token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEzLCJlbWFpbCI6InRlc3QxQGdtYWlsLmNvbSIsImlhdCI6MTY3NjEzNTU2MiwiZXhwIjoxNjc2MTM5MTYyfQ.QmCkiUQKHU-XmChyj8if77xfTeux2onaI1pTKYd_PiY'

async function getprofilepage(e){
    e.preventDefault()
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
        console.log(data);
        let element = data;
        userId = element.id;
        firstName = element.firstName;
        lastName = element.lastName;
        emailAddress = element.emailAddress;
        localStorage.setItem('userId', userId);
        localStorage.setItem('firstNamee', firstName);
        localStorage.setItem('lastName', lastName);
        localStorage.setItem('emailAddress', emailAddress);
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
                          <button type="button" class="btn btn-outline-dark m-2 shadow-lg p-1 mb-5 bg-body rounded" id="profile_edit" data-mdb-ripple-color="dark"
                          style="z-index: 1;">
                          Edit profile
                        </button>
                      </div>
                      <div class="ms-3 m-5">
                        <h5>${element.firstName}  ${element.lastName}</h5>
                        <p>${element.emailAddress}</p>
                      </div>
                      
                    </div>
                    <div class="m-3" id="profile_edit_form"></div>
                    <div class="p-4 text-black bg-light" >
                      <div class="d-flex justify-content-end text-center"> 
                      </div>
                    </div>
                    <div class="card-body p-4 text-black">
                      
                      <div class="d-flex justify-content-between align-items-center mb-4">
                        <button class="lead fw-normal mb-0 btn btn-warning" id="courses_created">Created Courses</button>
                      </div>
                      <div id="cretedcourses"></div>
                      <div class="d-flex justify-content-between align-items-center mb-4">
                        <button class="lead fw-normal mb-0 btn btn-warning" id="courses_registered">Registered Courses</button> 
                      </div>
                      <div id="registeredcourses"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>   
          </section> `
    document.getElementById('output').innerHTML = output;
    document.getElementById("profile--landing").style.visibility = "hidden";
    // the following function is going to call after the above htnl code id filled to the page
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
        data = data.created;
        console.log(data);
        let output = " <div class='card mx-auto' style='width: 10rem;'><div class='card-body'><h5 class='card-title'>you havenot any creted course</h5><p class='card-text'></p><a href='#' class='btn btn-danger'>0</a></div></div>";
        if (data){
          output = ''
            data.forEach(element => {
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
        data = data.egisteredFor;
        console.log(data);
        let output = " <div class='card mx-auto' style='width: 10rem;'><div class='card-body'><h5 class='card-title'>you haven't registered for a courses</h5><p class='card-text'></p><a href='#' class='btn btn-danger'>0</a></div></div>";
        if (data){
            data.forEach(element => {
                output = ''
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
  document.getElementById('profile_edit_form').innerHTML = `<section class="vh-100" style="background-color: #eee;">
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style="border-radius: 25px;">
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">update user</p>

                <form class="mx-1 mx-md-4">

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example1cupdate" class="form-control" />
                      <label class="form-label" for="form3Example1cupdate">first Name</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                  <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                  <div class="form-outline flex-fill mb-0">
                    <input type="text" id="form3Example1c2update" class="form-control" />
                    <label class="form-label" for="form3Example1c2update">last Name</label>
                  </div>
                </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="email" id="form3Example3cupdate" class="form-control" />
                      <label class="form-label" for="form3Example3cupdate">your Email</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <input type="password" id="form3Example4cupdate" class="form-control" />
                      <label class="form-label" for="form3Example4cupdate">Password</label>
                    </div>
                  </div>

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" id="button_update" class="btn btn-primary btn-lg">update</button>
                  </div>
                </form>

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  class="img-fluid" alt="Sample image">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`

updateUser();

}



function afterFetched(){
    let  courses_created =  document.getElementById("courses_created");
    let courses_registered = document.getElementById("courses_registered");
    let profile_edit = document.getElementById("profile_edit");
     console.log(courses_created);

     if (courses_created){
    courses_created.addEventListener('click',getCoursesCreated)
    }
    if (courses_registered){
    courses_registered.addEventListener('click',getCoursesRegistered)
    }
    if (profile_edit){
      profile_edit.addEventListener('click',profileEdit)
    }
}

async function updateUser(){
  
  firstName = document.getElementById("form3Example1cupdate").value;
  lastName = document.getElementById("form3Example1c2update").value;
  email = document.getElementById("form3Example3cupdate").value;
  password = document.getElementById("form3Example4cupdate").value;

 let button_update = document.getElementById("button_update");
 if (button_update){
  button_update.addEventListener('click',async (e)=>{
    e.preventDefault();
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
        password:password
      }),
    })
      .then((res)=> {
          console.log(res.status)
          console.log(res)
          if (res.status === 200) {
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
      
  }catch (error) {
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'please try again!'
        })
      
  }

  })
 }


}

