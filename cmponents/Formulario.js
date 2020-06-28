import React,{useState} from 'react'
import fetch from 'isomorphic-fetch';
import { v4 as uuidv4 } from 'uuid';
import Error from './Error';

const Formulario = ({tareas,guardarTareas,guardarSinTareas}) =>{

    // state de Tarea
    const[tarea, guardarTarea]=useState({
        nombre:'',
        prioridad:'',
        descripcion:''
    })
    // state para el error
    const[error,guardarError]=useState(false)
    
    
    // Desdtructuring
    const{nombre,prioridad,descripcion}=tarea;

    // Funcion para leer los inputs
    const handleChange = e =>{
     guardarTarea({
         ...tarea,
         [e.target.name]: e.target.value
     })   
    }

    // Cuando el Usuario presione Submi
    const submitFormulario = async e =>{
        // Eliminar el comportamiento por default del formulario
        e.preventDefault();
    
        //Validar campos de formulario
        if(nombre.trim() === '' || prioridad === '' || descripcion.trim() === '' ){
            guardarError(true);
            return;
        }
        guardarError(false);
        guardarSinTareas(true)
        //peticion al serivicio
        const peticion = await fetch(`${process.env.RESTURL_TAREAS}/posts`, {
            method: 'POST',
            body: JSON.stringify(tarea),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
        const resJson = await peticion.json();

        
        // Generando id unico
        resJson.id = uuidv4();

        guardarTareas([
            ...tareas,
            resJson
        ]     
        );
        // Recetear Formulario
        guardarTarea({
            nombre:'',
            prioridad:'',
            descripcion:''
        })
          
    }

    return (
        <div className="container">
             <h1>Agregar Tarea</h1>
             {error ? <Error mensaje="Todos los campos son Obligatorios" /> :null}

             <form onSubmit={submitFormulario}>
                 <div className="form-group">
                 <input
                    className="form-control" 
                    type="text"
                    name="nombre"
                    placeholder="nombre de Tarea"
                    onChange={handleChange}
                    value={nombre}
                 />
                 </div>
                 <div className="form-group">
                 <select 
                    className="form-control"
                    name="prioridad"
                    onChange={handleChange}
                    value={prioridad}
                 >
                     <option>--Seleccione--</option>
                     <option>Urgente</option>
                     <option>Alta</option>
                     <option>Normal</option>
                     <option>Baja</option>

                    
                 </select>
                 </div>
              
                 <div className="form-group">
                 <textarea 
                    className="form-control" 
                    type="text"
                    name="descripcion"
                    placeholder="Descripcion"
                    onChange={handleChange}
                    value={descripcion}
                 />
                </div>
                  
                 <button className="btn btn-primary" type="submit">añadir</button>
             </form>
        </div>
       
        
    )
}
export default Formulario;