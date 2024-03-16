import React , {Component}from 'react';
import { movies } from './getMovies';
import axios from 'axios';
import Banner from './Banner';
import { json } from 'react-router-dom';

class Movie extends Component{

    constructor(){
        super();
        this.state={
            hover:'',
            pagArr:[1],
            currPage:1,
            movies:[],
            favMovie:[],
            movieCur:[],
            sameGenreMovies:[]
        }
    }

   async componentDidMount(){
       const moviesData = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=78e126cc9ebccbac70f567c2d36fccd7&language=en-US&page=${this.state.currPage}`);
        console.log(moviesData.data.results);
        this.setState({
            movies: [...moviesData.data.results]
        },this.handleFavState());
    }

     changeMovies=async ()=>{
        const moviesData= await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=78e126cc9ebccbac70f567c2d36fccd7&language=en-US&page=${this.state.currPage}`);
        this.setState({
            movies:[...moviesData.data.results]
        })
    }

    handleRight=()=>{
        let tempArr=[]
        for(let i=1;i<=this.state.pagArr.length +1;i++){
            tempArr.push(i);
        }
        this.setState({
            pagArr:[...tempArr],
            currPage:this.state.currPage +1
        },this.changeMovies)
    }

    handleLeft=()=>{
        if(this.state.currPage!=1){
            this.setState({
                currPage:this.state.currPage -1
            },this.changeMovies)
        }
        else{
            alert("Previous Page does not exist")
        }
       
    }

    hancleClick=(value)=>{
        if(this.state.currPage != value){
            this.setState({
                currPage:value
            },this.changeMovies)
        }
      
    }
    handleFav=(movie)=>{
        if(this.state.favMovie.includes(movie.id)){
            //remove from fav

            let oldMovies= JSON.parse(localStorage.getItem('movie') || "[]");
            oldMovies=oldMovies.filter((movieObj)=> movie.id!=movieObj.id )
            localStorage.setItem("movie",JSON.stringify(oldMovies))
        }
        else{
            
            // add to fav

            let oldMovies=[];
            oldMovies= JSON.parse(localStorage.getItem('movie') || "[]");
            oldMovies.push(movie);
            localStorage.setItem("movie",JSON.stringify(oldMovies))
        }
        this.handleFavState();
    }
    handleFavState= ()=>{
        let oldMovies=JSON.parse(localStorage.getItem("movie") || "[]");
        let temp=[];
        oldMovies.map((movie)=>{
            temp.push(movie.id);
        })

        console.log("tempo "+temp)
        this.setState({
            favMovie:[...temp]
        },console.log(this.state.favMovie))

    }
    handleModalClick=(movie)=>{
        let movies=this.state.movies;
        let movieArr=movies.filter((mov)=>(
           (mov.id!=movie.id && mov.genre_ids[0]==movie.genre_ids[0])
        ))
        this.setState({movieCur:movie,
            sameGenreMovies:[...movieArr]
        },console.log(this.state.movieCur+"   "+this.state.sameGenreMovies))
    }

    render(){
    // let movie=movies.results
    console.log(this.state.favMovie);
        return(
            <>
            {
                      this.state.movies.length ==0?
                      <div class="spinner-border text-primary" role="status">
                          <span class="visually-hidden">Loading...</span>
                      </div>
      
                 
                  :
                  <>
                  <h3 style={{textAlign:"center"}}><strong>Trending</strong></h3>
                  <div className="movie-list">
                    {
                        this.state.movies.map((movieObj)=>(
                            <div className="card movie-card"  onMouseEnter={()=>{this.setState({hover:movieObj.id})}} onMouseLeave={()=>{this.setState({hover:''})}}>
                            <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} className="card-img-top movie-img" />
                            <div className="card-body" style={{padding:'0rem'}}>
                            <h5 className="card-title movie-title">{movieObj.title}</h5>
                            {/* <p className="card-text movie-text">{movieObj.overview}</p> */}
                
                            <div className='button-wrapper movie-button'>
                            {/* {this.state.hover == movieObj.id  &&   <a className="btn btn-primary" onClick={()=>this.handleFav(movieObj)}>{this.state.favMovie.includes(movieObj.id) ? "Remove from Favourite" : "Add to Favourites"}</a>} */}
                            {/* {this.state.hover == movieObj.id  &&   <a className="btn btn-primary" onClick={()=>this.handleFav(movieObj)}>{this.state.favMovie.includes(movieObj.id) ? "Remove from Favourite" : "Add to Favourites"}</a>} */}

                            {this.state.hover == movieObj.id  && <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>this.handleModalClick(movieObj)}>Click For More Info</button>}
                                              
                                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
                                                <div class="modal-dialog">
                                                    <div class="modal-content" style={{background:'rgb(0,0,0)'}}>
                                                    <div class="modal-header">
                                                    <h1 className="modal-title fs-1 left-item" id="exampleModalLabel" style={{color:'white'}} >{this.state.movieCur.title}</h1>
                                                    <a className="btn btn-primary right-item" onClick={()=>this.handleFav(this.state.movieCur)} style={{display:"block"}}>{this.state.favMovie.includes(this.state.movieCur.id) ? "Remove from Favourite" : "Add to Favourites"}</a>
                                                    {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{color:"white"}}></button> */}

                                                    </div>
                                                    <div class="modal-body">
                                                    <img src={`https://image.tmdb.org/t/p/original${this.state.movieCur.backdrop_path}`} alt={this.state.movieCur.title} className="card-img-top" />
                                                   <p style={{color:'white'}}>{this.state.movieCur.overview}</p>
                                                    </div>

                                                    <h4>{this.state.sameGenreMovies.length>0 && "You may also like"}</h4>
                                                    <div className="modal-footer"style={{justifyContent:"flex-start"}} >
                                                       
                                            
                                                        <div style={{display:"flex",justifyContent:"space-between",overflow:"hidden",padding:"1rem", flexWrap:"wrap"}}>
                                                        {
                                                            this.state.sameGenreMovies.map((mov)=>(
                                                                <div style={{textAlign:"left",width:"8rem",justifyContent:"space-between"}} >
                                                                <img src={`https://image.tmdb.org/t/p/original${mov.backdrop_path}`} alt={mov.title} className="card-img-top" style={{width:"6rem"}}/>
                                                                <h6 style={{fontSize:"0.6rem"}}>{mov.title}</h6>
                                                                </div>
                                                                ))

                                                        }
                                                         </div>



                                                    </div>
                                                    </div>
                                                </div>
                                                </div>
                                                                            


                            </div>
                            </div>
                        </div>
                        ))

                    }
                        <div style={{display:'flex',justifyContent:'center'}}>
                        <nav aria-label="Page navigation example">
                        <ul class="pagination">
                        <li class="page-item"><a class="page-link" onClick={this.handleLeft}>Previous</a></li>
                            {
                                this.state.pagArr.map((val)=>(
                                    <li class="page-item"><a class="page-link" onClick={()=>{this.hancleClick(val)}}>{val}</a></li>  
                                ))
                            }
                            <li class="page-item"><a class="page-link" onClick={this.handleRight}>Next</a></li>
                        </ul>
                        </nav>
                        </div>
                    </div>
                </>
            }
            </>
        )
    }
}
export default Movie;