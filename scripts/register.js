document.getElementById("register").addEventListener('submit',Registration);
async function Registration(e){
    
//The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
//For example, this can be useful when:
//Clicking on a "Submit" button, prevent it from submitting a form
    e.preventDefault()
    let firstname = document.getElementById("form4Example0").value;
    let lastname = document.getElementById("form4Example4").value;
    // var schools = document.getElementById("school");
    // var school = schools.value;
    let password = document.getElementById("form4Example3").value;
    let email = document.getElementById("form4Example1").value;
    const response = await fetch('http://localhost:3000/users',{
        method:'POST',
        headers: {
            'Accept':'Application/json,text/plain,*/*',
            'content-type':'application/json'
        },
        body:JSON.stringify({
            firstName:firstname,
            lastName:lastname,
            email:email,
            password:password
        })
    })
    .then((res)=> res.json())
    .then((data)=>console.log(data))
}