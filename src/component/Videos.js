import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



function Videos(){

    let[videos,setvideos]=useState([])

   
    useEffect(()=>{
        let token = JSON.parse(localStorage.getItem("details"))
        let realtoken = token.token 
       

        console.log(realtoken)

            fetch('http://localhost:8000/videos',{

            method:'GET',
            headers:{
                'Authorization':`Bearer ${realtoken}`
            
            }        

            }) 
            .then((res)=> res.json())
            .then((data)=>{console.log(data)
                setvideos(data)
            }
            )


    },[])


    return(
        <div className="videos">
                <h1>videos</h1>

               <div className="video-flex">
                    {
                            videos.map((video,index)=>{

                                return(
                                        <div key={index} className="video-container">
                                            <div className="video-poster">
                                                <img className="poster" src={video.posterurl} alt='' /><hr/>
                    
                                            </div>
                                          <div className="video-all">
                                                
                                            <div className="video-content">
                                                <p>{video.originalTitle}</p>
                                                <p>{ 
                                                    video.genres.map((genre,index)=>{
                                                        return(
                                                            <span key={index}>{genre} .</span>
                                                        )

                                                    })
                                                    
                                                }</p>
                                                <p>IMDB : {video.imdbRating}</p>
                                                <Link to={"/Player/"+video._id}>
                                                    <button className="watch-btn">Watch</button>
                                                </Link>
                                            </div>
                                          </div>
                                            
                    
                                        </div>
                                )

                            })
                        }

               </div>

          
        </div>
    )

}

export default Videos;