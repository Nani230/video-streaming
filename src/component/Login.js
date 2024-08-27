import {useState} from "react";
import {Link, useNavigate} from "react-router-dom"

 
function Login(){


    let navigate = useNavigate()



    let[login,statelogin]=useState('hello')
    let [loginbox,setboxlogin]=useState(false)
    let user = {};
  
   function readvalue(pro,value){

       user[pro]=value

    

   }
   function loginuser(){

       if(user.password & user.username===null){
        console.log('something wrong')
        console.log(user)

       }
       
       else{
         
           
                 
        console.log(user)
          
   
        fetch("http://localhost:8000/loginUser",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
        })
        .then((res)=>res.json())
        .then((data)=>{console.log(data)
            if(data.success===true){

                

                localStorage.setItem("details",JSON.stringify({token:data.token,id:data.user._id
                }))
                navigate("/videos")
            }
            else{
                statelogin(data.message)
                setboxlogin(true)

                setTimeout(()=>{
                    setboxlogin(false)
                },1500)
            }
        
        })
        .catch((err)=>{console.log(err)})
    }      
      
   }
   return(
     <section className="login-main">
           
             <div className="login-msg-body">
                   {loginbox===true?(<div className="login-msg">{login}</div>):null}
             </div>
           
         <div className="login">
             <h1 className="login-reg-name">Login</h1>
          
             <input type="text" placeholder="Enter UserName" onChange={(event)=>{readvalue('username',event.target.value)}}/>
             <input type="password" placeholder="Enter Password" onChange={(event)=>{readvalue('password',event.target.value)}}/>
             <button className="login-btn" onClick={loginuser} >Login</button>

            <div className="account-register">
                 <h1 className="dont-account">Don't Have an Account ?</h1>
            
                 <Link to={'/register'}><button className="regsiter-btn" >Register</button></Link>
            </div>

         </div>

     </section>
   )
}

export default Login;