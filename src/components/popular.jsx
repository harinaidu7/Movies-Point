import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularMovies } from "../store/movies/moviesSlice";
import { Link } from "react-router-dom";
import starSVG from '../assets/star-svgrepo-com.svg';
import '../App.css';

export default function PopularMovies() {
    const dispatch = useDispatch();
    const { movies, loading, error } = useSelector((state) => state.movies);

    useEffect(() => {
        dispatch(fetchPopularMovies());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

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
                                                
                                                <span>{movie.rating}</span>
                                            </div>
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
