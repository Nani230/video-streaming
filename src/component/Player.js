import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
function Player(){

    let navigate = useNavigate()

    let [video,setvideo]=useState('hello')
    let prams  = useRef(useParams())
        
    let realtoken = useRef(JSON.parse(localStorage.getItem("details")).token)


    let user = useRef(JSON.parse(localStorage.getItem("details")).id)
     let vid = useRef();
    useEffect(()=>{
  
       
         
        fetch('http://localhost:8000/videos/'+prams.current.id+'/'+user.current,{

            method:'GET',
            headers:{
                'Authorization':`Bearer ${realtoken.current}`
            
            }        
        }
        
        )
        .then((res)=>res.json())
        .then((data)=>{console.log(data)
            setvideo(data)
            if(data.currentTime!==undefined){
                vid.current.currentTime = data.currentTime
            }
        
         })
        .catch((err)=>console.log(err))
        
    },[])
        // console.log(video.videoPath)

     function handlevideoelement(ele){
        vid.current = ele
  }
    function closeplayer(){
        let time = vid?.current.currentTime

        fetch('http://localhost:8000/tracktime/'+user.current+'/'+prams.current.id,{

            method:'PUT',
            headers:{
                'Authorization':`Bearer ${realtoken.current}`,
                "Content-Type":"application/json"

            
            },
            body:
                JSON.stringify({currentTime:time})
              
        }
        
        )
        .then((res)=>res.json())
        .then((data)=>{console.log(data)
            if(data.success===true){

                

               
                navigate("/videos")
            }
        }
        )
        .catch((err)=>console.log(err))
    }
    
    return(
        <div className="player">
            <div className="player-container">
               <div className="player-content">
                   <h1>{video.originalTitle}</h1>
                   {
                       video.videoPath!==undefined?(
                           <div className="video-player">
                               <div className="video-controls">
                                   <p className="player-btn" onClick={closeplayer}>&#10006;</p>

                               </div>
                                <video  width='100%' controls ref={handlevideoelement} >

                                         <source src={'http://localhost:8000/stream/'+video.videoPath} />
                                </video>
                           </div>
                       ):null
                   }
                   

               </div>

            </div>

        </div>
    )

}
export default Player;