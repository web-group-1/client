let coursesBtn = document.getElementById("courses_btn");
coursesBtn.addEventListener('click',getallcourses);


async function getallcourses(){
    const result =  await fetch('http://localhost:3000/courses')
    .then((res)=>res.json())
    .then((data)=>{
        let output = '';
        data.forEach(element => {
            output += 
            `<div class="card shadow-lg p-3 mb-5 bg-body-tertiary rounded " style="width: 18rem; margin: 20px;">
            <article class="card-body  align-self-center">
                <h2 class="card-title">${element.name}</h2>
                <p class="card-text"> 
                    ${element.description} </p>
            </article>
            <ul>
            <li class="list-group-item active "  aria-current="true">${element.id}</li>
            </ul>
            <button type="button" class="btn btn-warning" id="courseRegistration">Register</button>
        </div>  `
        });
    document.getElementById('output').innerHTML = output;
    })
}





 let courseRegistration = getElementById("courseRegistration");
 courseRegistration.addEventListener('click',courseRegistrationf);
 let c_id = courseId.value;


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