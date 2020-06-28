import React,{useState} from 'react'
import Error from './Error';

const Tareas = ({tareas,eliminarTarea,editarTarea,filtraTareas}) =>{

    // state para el error
    const[error,guardarError]=useState(false)
    // Funcion para Leer el input de busqueda
    let palabrasClave;

    const handleChange = e =>{
        palabrasClave = e.target.value  
    }
    // Variable para numerar tareas
    let numeroTarea = 1;
    // Funcion cuando el usuario presione Buscar
    let mensajeBusqueda;
    const submitBuscar = e =>{
        e.preventDefault();
        
        // Validar PalabrasClave
        if(palabrasClave == undefined || palabrasClave.trim() === ''){
            mensajeBusqueda ='Debe ingresar el nombre o prioridad de la tarea';
            guardarError(true)
            return;
        }else{
            guardarError(false)

        }
        
        filtraTareas(palabrasClave)
    }
    return(
        <div>
            <h3>Listado de tareas</h3>
            {tareas.map(tarea => (
                    <div className="card mt-2" key={tarea.id}>
                        <div className="card-header">
                        <h5>{numeroTarea++} -Prioridad: {tarea.prioridad}</h5>
                        </div>
                        <div className="card-body">
                            <h4 className="text-center">Nombre: {tarea.nombre}</h4>
                            <p>Descripcion : {tarea.descripcion}</p>

                           
                        <button className="btn btn-secondary" onClick={()=>editarTarea(tarea)}>Editar</button>
                        <button className="btn btn-danger ml-1" onClick={()=>eliminarTarea(tarea.id)}>Eliminar</button>
                        </div>
                       
                       
                       
                    </div>
                ))}
            
            <div className="form-group mt-3">
                {error ? <Error mensaje= "No se encontraron Resultados"  /> : null}
                <form onSubmit={submitBuscar}>
                    <input
                        className="form-control" 
                        type="text"  
                        placeholder="Nombre de Tarea o Prioridad"
                        onChange={handleChange}/>
                    <button className="btn btn-primary mt-2" type="submit">Buscar</button>
                </form>
            </div>
        </div>
    )
}
export default Tareas;