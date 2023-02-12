let token = localStorage.getItem('token');
    console.log({"token":token});

window.onload = () => {
      getallcourses()
  }


async function getallcourses(){
    const result =  await fetch('http://localhost:3000/courses')
    .then((res)=>res.json())
    .then((data)=>{
        let output = '';
        data.forEach(element => {
            output += 
            `<div class="card shadow-lg p-3 mb-5 bg-body-tertiary rounded " style="width: 18rem; margin: 20px;">
            <article class="card-body  align-self-center">
                <h2 class="card-title">${element.id} ${element.name}</h2>
                <p class="card-text"> 
                    ${element.description} </p>
            </article>
            <button type="button" class="btn btn-warning" id="courseRegistration" onclick="registerForCourse(${element.id})">Register</button>
        </div>  `
        });
    document.getElementById('output').innerHTML = output;
    })
}





 let courseRegistration = document.getElementById("courseRegistration");
 if (courseRegistration){
    courseRegistration.addEventListener('click',courseRegistrationf);
 }

 let courseID = document.getElementById("courseId")
 
 let c_id = courseID && courseID.value;
 console.log(c_id);


async  function courseRegistrationf(e){
    e.preventDefault();
    const response = await fetch('http://localhost:3000/users/Register',{
        method:'POST',
        headers: {
            'Accept':'Application/json,text/plain,*/*',
            'content-type':'application/json'
        },
        body:JSON.stringify({
            id:c_id
        })
    })
 }

 async function registerForCourse(courseId) {
    try {
        const result =  await fetch(`http://localhost:3000/courses/${courseId}/users/me`,{
            method:'PATCH',
            headers: {
                'Accept':'Application/json,text/plain,*/*',
                'content-type':'application/json; charset=utf-8',
                'Authorization': `Bearer ${token}`
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log({data,})
            if(data.statusCode != 401) {
                window.location.replace("../pages/mycourses.html")
            } else {
                window.location.replace("../pages/signin.html")
            }
        })    
        } catch (error) {
            console.log(error)
            
        }
 }

