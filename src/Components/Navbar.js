import React , {Component}from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component{

    render(){
        return(
        
            <div style={{display:'flex',background:'rgb(100, 111, 237)',padding:'0.5rem', widht:'100vw'}}>
               <Link to="/" style={{textDecoration:"none"}}><h1 style={{color:'white',fontWeight:"bold" , textDecoration:'none'}}>Movies</h1></Link> 
               <Link to="/favourites" style={{textDecoration:"none"}}><h2 style={{marginLeft:'2rem',marginTop:'0.5rem', color:'white',fontWeight:"bold"}}>Favourites</h2></Link>  
           </div>
           
        )
    }

  
}

export default Navbar;