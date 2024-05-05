import { useEffect, useState } from "react"
import MoviesDetail from "./movie-details/movie-details"
import { popularURL } from "../api"
import '../App.css'
import { Link } from "react-router-dom";
import starSVG from '../assets/star-svgrepo-com.svg';
export default function PopularMovies (){
    const [movies, setMovies] = useState([]);
    useEffect(()=>{

       const moviesDetails= async () =>{

        try{
            const response = await fetch(`${popularURL}`)
            if(!response.ok){
                throw new error('Network response was not ok')
            }
            const data = await response.json()
            console.log("Fetched popular movies:", data);
            const extractedMovies = data.results.map(movie => ({
                id: movie.id,
                title: movie.title,
                release_date : movie.release_date,
                rating : movie.vote_average,
                // Add other properties you want to extract
                // Example: image URL
                imgUrl: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            }));
            setMovies(extractedMovies); 
        }
        catch(error){
            console.error("Error fetching popular movies:", error);
        }
       };
       moviesDetails();
    
    },[]);
    
    
    return (
        <div>
            <h1 className="text-center">Popular Movies</h1>
            <div className="container-fluid">
                <div className="row mb-10">
                    {movies.map(movie => (
                        <div key={movie.id} className="col-md-2 col-sm-3 col-6 mb-5">
                            <Link to={`/movie-details/${movie.id}`} className="card-link" style={{ textDecoration: 'none' }}>
                            <div className="card h-100">
                                <img src={movie.imgUrl} className="card-img-top" alt={movie.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{movie.title}</h5>
                                    <div className="card-details">
                                        <div className="card-date">{movie.release_date}</div>
                                        <div className="card-rating">
                                            <img src={starSVG} alt="Star" className="star-icon" />    
                                            <span>{movie.vote_average}</span>
                                            {movie.rating}</div>
                                        </div>
                                </div>
                            </div>

                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

}