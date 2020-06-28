import React from 'react';
import Link from 'next/link'

const Navigacion = ()=>{
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
             <Link href="/"><a className="navbar-brand" >Task-App</a></Link>   
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                    </button>
                 <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
            
            <li className="nav-item active">
             <Link href="/about"><a className="nav-link">About</a></Link>
            </li>
             
             <li className="nav-item">
                 <Link href="/contact"><a className="nav-link">Contacto</a></Link>
            </li>
            <li className="nav-item ">
                 <Link href="/contact"><a className="nav-link">Eduardo Quintero</a></Link>
            </li>
        
          </ul>
        </div>
      </nav>
        </div>
    )
}

export default Navigacion;