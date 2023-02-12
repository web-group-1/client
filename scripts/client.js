// // let list = document.getElementsByTagName('ul').children;

// let profile = document.querySelector('#navprofile');

// if (profile){
//     profile.addEventListener('navigate', (event) => {
//         // Exit early if this navigation shouldn't be intercepted, 
//         // e.g. if the navigation is cross-origin, or a download request
//         if (shouldNotIntercept(event)) {
//             console.log("should not intercept")
//             return;
//         }
      
//         const url = new URL(event.destination.url);
//         console.log("url");
      
//         if (url.pathname.startsWith('/')) {
//           event.intercept({
//             async handler() {
//               // The URL has already changed, so show a placeholder while
//               //fetching the new content, such as a spinner or loading page
//               renderArticlePagePlaceholder();
      
//               // Fetch the new content and display when ready
//               const articleContent = await getArticleContent(url.pathname);
//               renderArticlePage(articleContent);
//             },
//           });
//         }
//       });

// }

//let token = "abc";
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

try {
    if (token){
        console.log(token,"b_______");
    }
    
} catch (error) {
    console.log(error)
    
}



let place = document.getElementById('placehold');
if (place){
    place.addEventListener('click',logger);
}

function logger(){
    try {
        if (token){
            console.log(token,"___________");
        }
        
    } catch (error) {
        console.log(error)
    }
    
    
}

let Jwttoken = localStorage.getItem('token');
console.log(Jwttoken,"jwt token");
