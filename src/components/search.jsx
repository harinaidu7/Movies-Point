import { useState } from "react"
import {AsyncPaginate} from "react-select-async-paginate"
import { apiURL } from "../api";
import { useHistory } from "react-router-dom";
import "../App.css"
export default function Search({onSearchChange}){
    
    const history = useHistory();
    const handleMovieClick = (selectedValue) => {
        const [movieId] = selectedValue.split(' '); // Extract movieId from selected value
        history.push(`/movie-details/${movieId}`);
    };

    const [search,setSearch] = useState('');

    // const loadOptions = (inputValue)=>{
    //     return fetch(`${apiURL}${inputValue}`)
    //     .then(response => response.json())
    //     // .then((response) =>{
    //     //     return{
    //     //         options: response.data.map((movie)=>{
    //     //             return{
    //     //                value:`${movie.id} ${movie.original_title} `,
    //     //                label:`${movie.title} ${movie.release_date}`, 
    //     //             }
    //     //         })
    //     //     }
    //     // } )
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err))
    // }
    const loadOptions = (inputValue) => {
        return fetch(`${apiURL}${inputValue}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((response) => {
               
                if (!response.results || !Array.isArray(response.results)) {
                    throw new Error('Invalid response format or no data returned');
                }
                console.log('Response results:', response.results);
                const options = response.results.map((movie) => ({
                    value: `${movie.id} ${movie.original_title}`,
                    label: `${movie.title} ${movie.release_date}`,
                }));
                return { options }; 
            })
            .catch(err => {
                console.error(err);
                return { options: [] };
            });
    };
    

    console.log(search)
    // const handleOnChange = (searchData) => {
    //     setSearch(searchData);
    //     onSearchChange(searchData)
    //     console.log('searchData',searchData)
    // }
    const handleOnChange = (selectedOption) => {
        if (selectedOption) {
            handleMovieClick(selectedOption.value);
        }
    };
    
    return(

        <div>
            <div className="search-container">
             <div className="search-header">Movies Point</div>   
            <AsyncPaginate
                placeholder="Search for movies"
                debounceTimeout={600}
                value={search}
                onChange={handleOnChange}
                loadOptions={loadOptions}
                className="search-bar"  
            />
            </div>
        </div>

    )



}