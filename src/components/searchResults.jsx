import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResults, setSearchQuery } from "../store/Search/searchSlice";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // Optional for blur effect
import starIcon from '../assets/star-svgrepo-com.svg';
import "../App.css";
import fallbackImage from '../assets/default-fallback-image.png'

export default function SearchResults() {
  const { query } = useParams();
  const dispatch = useDispatch();
  const { searchResults, status, error } = useSelector(state => state.search);

  useEffect(() => {
    if (query) {
      dispatch(setSearchQuery(query));
      dispatch(fetchSearchResults(query));
    }
  }, [query, dispatch]);

  const handleError =(event)=>{
    event.target.onerror = null;
    event.target.src = fallbackImage;
    event.target.classList.add('fallback-image');
  }

  return (
    <div>
      <h1 className="text-center">Search Results for "{query}"</h1>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Error: {error}</div>}
      <div className="container-fluid">
        <div className="row mb-10">
          {searchResults.map((movie) => (
            <div key={movie.id} className="col-md-2 col-sm-3 col-6 mb-5">
              <Link to={`/movie-details/${movie.id}`} className="card-link" style={{ textDecoration: 'none' }}>
                <div className="card h-100">
                  <LazyLoadImage
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    effect="blur" 
                    className="card-img-top"
                    onError={handleError}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <div className="card-details">
                      <div className="card-date">{movie.release_date}</div>
                      <div className="card-rating">
                        <img
                          src={starIcon}
                          alt="Star"
                          className="star-icon"
                        />
                        <span>{movie.vote_average}</span>
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
