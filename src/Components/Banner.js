import  React, {Component} from 'react';
import { movies } from './getMovies';

class Banner extends Component{
    render(){
        let movie=movies.results[0]
        return(
            <> 
            <div className="card banner-card" >
  <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} className="card-img-top banner-img"/>
  <div className="card-body">
    <h1 className="card-title banner-title">{movie.title}</h1>
    <p className="card-text banner-text">{movie.overview}</p>
  </div>
</div>
    
</>
        )
    }

}

export default Banner