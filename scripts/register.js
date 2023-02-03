document.getElementById("register").addEventListener('submit',Registration);
async function Registration(e){
    e.preventDefault()
    let firstname = document.getElementById("form4Example0").value;
    let lastname = document.getElementById("form4Example4").value;
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