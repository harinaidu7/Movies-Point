import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './movie-details.css'
import starSVG from 'C:/Users/91776/Desktop/New Work Space/React/Movies Point/Movies-point/src/assets/star-svgrepo-com.svg';
export default function MoviesDetail() {
    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=5e999b2d6beaadc6a81d80f6bc17beb7`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMovieDetails(data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [movieId]);

    return (
        <div>
            
            {movieDetails ? (
                <div  className="backdrop-container" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url(https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path})` }}>
                    {/* <img src={`https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}`} className="backdrop-img" alt={movieDetails.title} /> */}
                    <div className="movie-details-section">
                        <div className="movie-details-poster">
                            <img src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}` } className="movie-details-poster" />
                        </div>
                        <div className="movie-details-info">
                            <h2>{movieDetails.title}</h2>
                            <div>language: {movieDetails.original_language}</div>
                            <div>Original title: {movieDetails.original_title}</div>
                            <div>popularity: {movieDetails.popularity}</div>
                            <div>Release Date: {movieDetails.release_date}</div>
                            <div>  <img src={starSVG} alt="Star" className="star-icon" />{movieDetails.vote_average}</div>
                            <p>Overview: {movieDetails.overview}</p>

                        </div>

                    </div>
                    {/* Display other movie details */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
