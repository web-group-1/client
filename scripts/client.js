
let siginin = document.getElementById("signin");
if (siginin){
    siginin.addEventListener('submit',signIn);
}


async function signIn(e){
    e.preventDefault()
    let password = document.getElementById("form4Example7").value;
    let email = document.getElementById("form4Example6").value;
    try {

        const response = await fetch('http://localhost:3000/auth/signin',{
            method:'POST',
            headers: {
                'Accept':'Application/json,text/plain,*/*',
                'content-type':'application/json'
            },
            body:JSON.stringify({
                email:email,
                password:password
            })
        })
        .then((res)=>res.json())
    .then((data)=>{
        if (! data.token){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'please try again!'
              })
            return;
        }
        console.log({"receivedToken": data.token});
        let token = data.token;  
        localStorage.setItem('token', token);
        console.log({"saved_token":localStorage.getItem('token')})
        Swal.fire(
            'Good job!',
            'You clicked the button!',
            'success'
          ); 
          window.location.replace("../index.html");     
    })
} catch (error) {
        console.log(error)
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'please try again!'
          })
        
    }
   
}

let Jwttoken = localStorage.getItem('token');
console.log(Jwttoken,"jwt token");
