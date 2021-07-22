import React, { useEffect, useState } from 'react';
import axios from './axios';
import requests from './request';
import './Banner.css';
const base_url = "https://image.tmdb.org/t/p/original";


function Banner() {

    const [movie,setMovie]=useState([]);

    useEffect(()=>{

        async function fetchData(){
            const request = await axios.get(requests.fetchTrending);
            setMovie(
                request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
                ]
              ); ;
            return request;
        }
        fetchData();
    },[])

    // console.log(movie);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
      }

    return (
        <header className="banner"
            style={{
                backgroundSize:"cover",
                backgroundImage:`url(
                    ${base_url}${movie?.backdrop_path}
                )`,
                backgroundPosition:"center center"
            }}
        >
            <div className="banner_container" >
                {/* title */}
                <h1 className="banner_title">
                    {movie?.title || movie?.name || movie?.original_title || movie?.original_name}
                </h1> 
            

                {/* 2 btns */}
            <div className="banner_btns">
                <button className="banner_btn">Play</button>
                <button className="banner_btn">My List</button>
            </div>

            {/* details */}
            <div className="banner_details">
                {truncate(movie?.overview,200)}
            </div>

           </div>    
           <div className="banner_fadeBottom"></div>
        </header>
    )
}

export default Banner