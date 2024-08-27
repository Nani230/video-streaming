import {useState} from "react";

function Register(){
  
     let[message,statemsg]=useState('hello')
     let [box,setbox]=useState(false)
    let users = {};
   
    function readvalue(pro,value){

        users[pro]=value

     

    }
    function register (){
        if(users.password===users.cpassword){


            delete users.cpassword
            console.log(users)
    
            fetch("http://localhost:8000/createUser",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(users)
            })
            .then((res)=>res.json())
            .then((data)=>{console.log(data)
                if(data.success===true){
                    statemsg(data.message)
                    setbox(true)
   
                    setTimeout(()=>{
                        setbox(false)
                    },1000)
                }
            
            })
            .catch((err)=>{console.log(err)})
        }
        
        else{
            console.log('password donot match')
    
    
        }      
       
    }
    return(
      <section className="main">
            
              <div className="msg-body">
                    {box===true?(<div className="msg">{message}</div>):null}
              </div>
            
          <div className="register">
              <h1 className="reg-name">Create an account</h1>
              <input type="text" placeholder="Enter Name" onChange={(event)=>{readvalue('name',event.target.value)}}/>
              <input type="text" placeholder="Enter Email" onChange={(event)=>{readvalue('email',event.target.value)}}/>
              <input type="text" placeholder="Enter UserName" onChange={(event)=>{readvalue('username',event.target.value)}}/>
              <input type="password" placeholder="Enter Password" onChange={(event)=>{readvalue('password',event.target.value)}}/>
              <input type="password" placeholder="Conform Password" onChange={(event)=>{readvalue('cpassword',event.target.value)}}/>
              <button className="btn" onClick={register} >Register</button>

          </div>
      </section>
    )
}

export default Register