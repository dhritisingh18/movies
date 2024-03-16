import React, { Component } from 'react';
import { movies } from './getMovies';


class Favourites extends Component{
    constructor(){
        super();
        this.state={
            currGenre:'All Genre',
            movies:[],
            generes:[],
            currText:'',
            limit:5,
            currPage:1
        }
    }

    componentDidMount(){
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
      
        let data=JSON.parse(localStorage.getItem("movie") || "[]");
        let tempArrGenre=[];
        data.map((mov)=>{   
                    if(!tempArrGenre.includes(genreids[mov.genre_ids[0]])){
                    tempArrGenre.push(genreids[mov.genre_ids[0]]);  
                    } 
            })
            tempArrGenre.unshift("All Genre")

        
        this.setState({
            movies:[...data],
            generes:[...tempArrGenre]
        })
    }
    

    handleFavRemoval=(movie)=>{
        let oldMovies=JSON.parse(localStorage.getItem("movie"));
        oldMovies=oldMovies.filter((mov)=> movie.id !=mov.id);
        localStorage.setItem("movie",JSON.stringify(oldMovies));
        this.setState({
            movies:oldMovies
        })
    }

    handleGenreClick=(genre)=>{
        this.setState({
            currGenre:genre,
        })
    }

    handlePage=(page)=>{
        this.setState({
            currPage:page
        })
    }

    handleArrowUpPopularity=()=>{
        let temp=this.state.movies;
        temp.sort(function(movieObjA,movieObjB){
            return movieObjB.popularity-movieObjA.popularity
        })
        this.setState({
            movies:[...temp]
        })
    }
    handleArrowDownPopularity=()=>{
        let temp=this.state.movies;
        temp.sort(function(movieObjA,movieObjB){
            return movieObjA.popularity-movieObjB.popularity
        })
        this.setState({
            movies:[...temp]
        })
    }
    handleArrowUpRating=()=>{
        let temp=this.state.movies;
        temp.sort(function(movieObjA,movieObjB){
            return movieObjB.vote_count-movieObjA.vote_count
        })
        this.setState({
            movies:[...temp]
        })
    }
    handleArrowDownRating=()=>{
        let temp=this.state.movies;
        temp.sort(function(movieObjA,movieObjB){
            return movieObjA.vote_count-movieObjB.vote_count
        })
        this.setState({
            movies:[...temp]
        })
    }

    render(){
        // const movies=this.state.movies;
        // console.log(movies)
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
      
        let filterArr=[];
        if(this.state.currGenre=="All Genre"){
            filterArr=this.state.movies;
        }
        if(this.state.currText!==''){
            filterArr=this.state.movies.filter((movieObj)=>(
                (movieObj.original_title.toLowerCase().includes(this.state.currText.toLowerCase()))
            ))
        }

       

        if(this.state.currGenre!=="All Genre"){

            filterArr=this.state.movies.filter((movieObj)=>(
                genreids[movieObj.genre_ids[0]]==this.state.currGenre
            ))      
          }
            console.log(filterArr)
            let pages=Math.ceil(filterArr.length/this.state.limit);
            console.log(pages);
            let pageArr=[];
           for(var i=1;i<=pages;i++){
                pageArr.push(i);
           }
           let si=(this.state.currPage-1)*this.state.limit;
           let lastIndex=si+this.state.limit ;
           console.log(si+" "+lastIndex+" "+this.state.currPage)
           filterArr=filterArr.slice(si,lastIndex)

        return(
            <>

            <div className="container text-center">
                <div className="row">
                    <div className="col-3 genre-list">
                        <ul class="list-group">
                            {
                                this.state.generes.map((genre)=>(
                                    
                                   this.state.currGenre===genre ? <li class="list-group-item" style={{backgroundColor:'rgb(100, 111, 237)',color:"white",fontWeight:"bold"}} onClick={()=>this.handleGenreClick(genre)}>{genre}</li> : <li class="list-group-item" style={{color:'rgb(100, 111, 237)'}}  onClick={()=>this.handleGenreClick(genre)}>{genre}</li>
                                   
                                ))
                            }
                        </ul>
                    </div>
                    <div className="col-9 fav-table">
                        <div className='row' >
                        
                            <input className="col form-control" type="text" value={this.state.currText} placeholder='Search' onChange={(e)=>{this.setState({currText:e.target.value})}}/>
                           
                            <input className="col form-control" type="number" value={this.state.limit} placeholder='Row number' onChange={(e)=>{this.setState({limit:e.target.value})}}/>
                        </div>
                        <div className='row'>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th style={{textAlign:"left"}}>Name</th>
                                    <th>Genre</th>

                                    <th><i class="fa-solid fa-arrow-up" onClick={this.handleArrowUpPopularity}/>Popularity<i class="fa-solid fa-arrow-down"  onClick={this.handleArrowDownPopularity}/></th>

                                    <th><i class="fa-solid fa-arrow-up"  onClick={this.handleArrowUpRating}/>Rating<i class="fa-solid fa-arrow-down"  onClick={this.handleArrowDownRating}/></th>

                                </tr>
                            </thead>
                                                <tbody>
                                                    
                                                    {

                                                        filterArr.map((movie)=>(
                                                            <tr >
                                                                    <td style={{textAlign:"left"}}><img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} style={{width:'5rem',padding:'0.2rem'}}/>{movie.original_title}</td>
                                                                    <td>{genreids[movie.genre_ids[0]]}</td>
                                                                    <td>{movie.popularity}</td>
                                                                    <td>{movie.vote_count}</td>
                                                                    <button type="button" className="btn btn-danger" style={{color:'red'}} onClick={()=>this.handleFavRemoval(movie)}>Delete</button>

                                                            </tr>
                                                        )
                                                        )
                                                    
                                                    }
                                                
                                    
                                                </tbody>
                                                </table>
                        </div>
                          <div className='row text-center' style={{justifyContent:"center",textAlign:"center"}}>                 
                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                    {
                                        pageArr.map((page)=>(
                                            <li class="page-item"><a class="page-link" onClick={()=>this.handlePage(page)}>{page}</a></li>

                                        ))
                                    }
                                 
                                </ul>
                             </nav>
                          </div>     

                    </div>
                    
                </div>
               
            </div>
            </>
        )
    }

}

export default Favourites