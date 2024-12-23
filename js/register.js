document.querySelector("#btn").addEventListener("click",(e)=>{
    //alert("Enter Your Details")
    e.preventDefault()

    let fname=document.querySelector("#fname").value
    let lname=document.querySelector("#lname").value
    let email=document.querySelector("#email").value
    let phone=document.querySelector("#phone").value
    let password=document.querySelector("#password").value
    let cpassword=document.querySelector("#cpassword").value
    let error=document.querySelector("#error")
    
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^\d{10}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if(fname.length===0){
        error.innerHTML="Enter First Name"
        error.style.color="red" 
        
    }else if(lname.length===0){
        error.innerHTML="Enter Last Name"
        error.style.color="red"
    }else if(email.length===0){
        error.innerHTML="Enter Email"
        error.style.color="red"
    }
    else if (!emailPattern.test(email)) {
        error.innerHTML = "Enter a Valid Email";
        error.style.color = "red";
    } else if(phone.length===0){
        error.innerHTML="Enter Phone Number"
        error.style.color="red"
    } 
    else if (!phonePattern.test(phone)) {
        error.innerHTML = "Phone Number Must be 10 Digits and Contain Only Numbers";
        error.style.color = "red";
    }
    else if(password.length===0){
        error.innerHTML="Enter Password"
        error.style.color="red"
    }
    else if (!passwordPattern.test(password)) {
        error.innerHTML = "Password Must be at Least 8 Characters Long, Contain One Uppercase Letter, One Lowercase Letter, One Number, and One Special Character";
        error.style.color = "red";
    } else if(cpassword.length===0){
        error.innerHTML="Enter cPassword"
        error.style.color="red"
    }else if(password!==cpassword){
        error.innerHTML="Check Passwords"
        error.style.color="red"
    }
    else{
        //error.innerHTML="Register Success"
        //error.style.color="green"
        const data=new FormData()
        data.append("fname",fname)
        data.append("lname",lname)
        data.append("email",email)
        data.append("ph",phone)
        data.append("pwd",password)

        let http=new XMLHttpRequest()
        http.open("POST","http://ilandertech.com/api/index.php/Welcome/AddStuRegister")
        http.send(data)

        console.log(http)

          http.onreadystatechange=function(){
            if(http.status===200 && http.readyState===4){
                  console.log(http.response)
                  let obj=JSON.parse(http.response)
                 console.log(obj)
                 //obj={status: 0, message: 'Your Details Alredy Exists'}
                  error.innerHTML=obj.message
                if(obj.status===1){
                      error.style.color="green"  
                }else{
                    error.style.color="red" 
                  }
              }
          }
    }

})