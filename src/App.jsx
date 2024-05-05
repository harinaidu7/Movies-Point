import { useEffect, useState } from 'react';
import './App.css'
import { AsyncPaginate } from 'react-select-async-paginate';
import Search from './components/search';
import PopularMovies from './components/popular';
import MoviesDetail from './components/movie-details/movie-details';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  // const [data,setData] = useState(null);
  // const [search,setSearch] = useState(null);

  // const fetchData = async()=>{
  //   try{
  //     const response = await fetch('https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=1b447b6e832a4445361419de20dcaefc');
  //     console.log("response",response)
  //     const jsonData = await response.json();
  //     console.log("jsonData",jsonData)
  //     setData(jsonData)
  //   }
  //   catch(error){
  //     console.error('error is :',error)
  //   }
  // };

  // const onloadOption = async(inputValue) =>{
  //   try{
  //     const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${inputValue}&api_key=1b447b6e832a4445361419de20dcaefc`)
  //     const jsonData = await response.json();
  //     console.log("jsonData-type",jsonData)
  //     setData(jsonData)
  //   }
  //   catch(error){
  //     console.log('error is :',error)
  //   }
  // }



  // useEffect(() => {
  //   fetchData();
  //   onloadOption();
  // }, []);
  const handleOnSearchChange=(searchData)=>{
    console.log(searchData)
  }  

  return(
    <div>
      
      {/* <AsyncPaginate
        placeholder="Search for movies"
        debounceTimeout={600}
        value={search}
        loadOptions={onloadOption} 
        onChange={handleOnChange}
      />      */}
      {/* <Search 
        onSearchChange={handleOnSearchChange}  
      />
      <PopularMovies/>
      <MoviesDetail/> */}
      <Router>
      
       <Switch>
          <Route path='/' exact>
            <Search onSearchChange={handleOnSearchChange} />
            <PopularMovies />
          </Route>
          {/* <Route path='/' exact  component={Search} /> */}
          {/* <Route path='/movie-details/:movieId' component={MoviesDetail}  /> */}
          <Route path='/movie-details/:movieId' component={MoviesDetail} />
       </Switch>
      </Router>
      
    </div>
  )
  
}

export default App
