document.querySelector("#btn").addEventListener("click",(e)=>{
    //alert("Enter Your Details")
    e.preventDefault()

    
    let email=document.querySelector("#email").value
    let password=document.querySelector("#password").value
    let error=document.querySelector("#error")
    


    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if(email.length===0){
        error.innerHTML="Enter Email"
        error.style.color="red"
    }
    else if (!emailPattern.test(email)) {
        error.innerHTML = "Enter a Valid Email";
        error.style.color = "red";
    }else if(password.length===0){
        error.innerHTML="Enter Password"
        error.style.color="red"
    }
    else if (!passwordPattern.test(password)) {
        error.innerHTML = "Password Must be at Least 8 Characters Long, Contain One Uppercase Letter, One Lowercase Letter, One Number, and One Special Character";
        error.style.color = "red";
    }
    else{
         //error.innerHTML="Login Success, Please Wait we navigate to Dashboard"
        //error.style.color="green"
        //location.assign("dashboard.html")
        const data=new FormData()
        data.append("userEmail",email)
        data.append("userPassword",password)

        let http=new XMLHttpRequest()
        http.open("POST","http://ilandertech.com/api/index.php/Welcome/StuLogin")
        http.send(data)

        console.log(http)
        http.onreadystatechange=function(){
            if(http.status===200 && http.readyState===4){
                console.log(http.response)
                let obj=JSON.parse(http.response)
                  console.log(obj)
                error.innerHTML=obj.message
                console.log(obj.data[0])
                  if(obj.status===1){
                       error.style.color="green"  
                        location.assign("dashboard.html")
                     localStorage.setItem("data",JSON.stringify(obj.data[0]))
                     localStorage.setItem("email",email)
                 }else{
                     error.style.color="red" 
                 }
            }
        }
    }

})