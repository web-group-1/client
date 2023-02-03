let coursesBtn = document.getElementById("courses_btn");
coursesBtn.addEventListener('click',getallcourses);


async function getallcourses(){
    const result =  await fetch('http://localhost:3000/courses')
    .then((res)=>res.json())
    .then((data)=>{
        let output = '';
        data.forEach(element => {
            output += 
            `<div class="card " style="width: 18rem; margin: 20px;">
            <article class="card-body  align-self-center">
                <h2 class="card-title">${element.name}</h2>
                <p class="card-text"> 
                    ${element.description} </p>
            </article>
        </div>  `
        });
    document.getElementById('output').innerHTML = output;
    })
}

function getter(){
fetch('http://localhost:3000/courses')
.then(response => response.json())
.then(data => {
  console.log(data) // Prints result from `response.json()` in getRequest
})
.catch(error => console.error(error))
}