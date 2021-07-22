import "./Row.css";
import React, { useEffect, useState } from 'react';
import axios from './axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
const base_url = "https://image.tmdb.org/t/p/original";


function Row({ title, fetchUrl, isLarge }) {

    const [movies, setMovies] = useState([]);
    const [trailer, setTrailer] = useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            // console.log(request.data.results);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);



    const opts = {
        height: "400",
        width: '100%',
        playerVars:{
            autoplay:1
        },
    };

    const handleClick = (movie) => {
        // console.table(movie?.title)
        if (trailer) {
          setTrailer('')
        } else {
          movieTrailer(movie?.title || "")
            .then(url => {
              const urlParams = new URLSearchParams(new URL(url).search);
              setTrailer(urlParams.get('v'));
            }).catch((error) => console.log(error));
        }
      }

    // console.log(movies);
    // console.log(trailer);

    return (
        <div className="row">
            {/* title */}
            <h2>{title}</h2>

            {/* row container*/}
            <div className="row_posters">
                {/* posters */}
                {movies.map(movie => (
                    <img
                        key={movie.id}
                        onClick={()=> handleClick(movie)}
                        className={`row_poster ${isLarge && "large_rowPoster"}`}
                        src={`${base_url}${ isLarge ? movie.poster_path : movie.backdrop_path}`} alt={movie.name || movie.title}></img>
                ))}
            </div>
            {trailer && <YouTube videoId={trailer} opts={opts} />}
        </div>
    )
}

export default Row
