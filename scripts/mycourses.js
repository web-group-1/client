let token = localStorage.getItem('token');
    console.log({"token":token});

const addCourseBtn = document.getElementById("add_course_btn")
const courseName = document.getElementById("course_name")
const courseDesc = document.getElementById("course_description")

addCourseBtn.addEventListener("click", addCourse)

function addCourse() {
    const result = fetch('http://localhost:3000/courses',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify({
            name:courseName.value,
            description:courseDesc.value
        })
    }).then((res)=>{
        //getCoursesCreated();
    })
}

async function deleteCourse(courseID){
    console.log({courseID,})
    try {
    const result =  await fetch(`http://localhost:3000/courses/${courseID}`,{
        method:'DELETE',
        headers: {
            'Accept':'Application/json,text/plain,*/*',
            'content-type':'application/json; charset=utf-8',
            'Authorization': `Bearer ${token}`
        }
    })
    .then((res)=>res.json())
    .then(async (data)=>{
        console.log(data);
        getCoursesCreated(await getUserId())
    })    
    } catch (error) {
        console.log(error)
        
    }   
}

window.onload = async ()=>{
    console.log({"token_in":token});
    if (token){
        let userId = await getUserId();
        getCoursesCreated(userId);
        getCoursesRegistered(userId);
    }
    else{}

}


async function getCoursesCreated(userId){
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
        let output = " <div class='card mx-auto' style='width: 10rem;'><div class='card-body'><h5 class='card-title'>you havenot any creted course</h5><p class='card-text'></p><a href='#' class='btn btn-danger'>0</a></div></div>";
        if (data.created.length){
          output = ''
          data.created.forEach(course => {
                output += 
                `<div class="card shadow-lg p-3 mb-5 bg-body-tertiary rounded " style="width: 18rem; margin: 20px;">
                <article class="card-body  align-self-center">
                    <h2 class="card-title">${course.id} &nbsp;${course.name}</h2>
                    <p class="card-text"> 
                        ${course.description} </p>
                </article>
                <div class="row">
                <button type="button" class="btn btn-primary col mx-2" id="course_edit" onclick="editCourseForm(${course.id})">edit</button>
                <button type="button" class="btn btn-danger col mx-2" id="course_delete" onclick="deleteCourse(${course.id})">delete</button>
                </div>
            </div>  `
            });   
        }
    document.getElementById('createdcourses').innerHTML = output;
    })
}


async function getCoursesRegistered(userId){
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
        console.log({data,});
        let output = " <div class='card mx-auto' style='width: 10rem;'><div class='card-body'><h5 class='card-title'>you haven't registered for a courses</h5><p class='card-text'></p><a href='#' class='btn btn-danger'>0</a></div></div>";
        if (data.registeredFor.length){
            output = ''
            data.registeredFor.forEach(element => {
                output += 
                `<div class="card shadow-lg p-3 mb-5 bg-body-tertiary rounded " style="width: 18rem; margin: 20px;">
                <article class="card-body  align-self-center">
                    <h2 class="card-title">${element.id} ${element.name}</h2>
                    <p class="card-text"> 
                        ${element.description} </p>
                </article>
                <button type="button" class="btn btn-warning" id="courseRegistration" onclick="unregisterForCourse(${element.id})">Unregister</button>
            </div>  `
            });   
        }  
    document.getElementById('registeredcourses').innerHTML = output;
    })
}


async function getUserId(){
    let userId;
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
        userId = data.id
    })    
    } catch (error) {
        console.log(error)
        console.log("cannot fetch");
    }
    return userId
}

async function unregisterForCourse(courseId) {
    try {
        const result =  await fetch(`http://localhost:3000/courses/${courseId}/users/me`,{
            method:'DELETE',
            headers: {
                'Accept':'Application/json,text/plain,*/*',
                'content-type':'application/json; charset=utf-8',
                'Authorization': `Bearer ${token}`
            }
        })
        .then((res)=>res.json())
        .then(async (data)=>{
            console.log({data,})
            if(data.statusCode != 401) {
                getCoursesRegistered(await getUserId())
            } else {
                window.location.replace("../pages/signin.html")
            }
        })    
        } catch (error) {
            console.log(error)
            
        }
 }
