import React,{useState} from 'react'
import Error from './Error';

const FormularioUpdate = ({tareaUpdate,tareaActualizar,guardarTreaUpdate,guardarFormUpdate}) =>{
  
     // state para el error
     const[error,guardarError]=useState(false)

    // Destructirong
    const{nombre,prioridad,descripcion} = tareaUpdate;
    // Funcion para leer los input
    const handleChange = e =>{
        guardarTreaUpdate({
            ...tareaUpdate,
            [e.target.name]:e.target.value
        })
        
    }

    // Cuando el usuario presione Submit

    const submitTareaUpdate = async e =>{
        e.preventDefault();

        // Validar Formulario 
        if(nombre.trim() === '' || prioridad === '' || descripcion.trim() === ''){
            guardarError(true);
            return;
        }
        guardarError(false)

        console.log(tareaUpdate)
        
        //peticion al serivicio
        const peticion = await fetch(`${process.env.RESTURL_TAREAS}/posts/100`, {
            method: 'PUT',
            body: JSON.stringify(tareaUpdate),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
        const resJson = await peticion.json();
        
        /*   Nota: En la funcion tareaActualizar iria como parametro el resultado de la peticion, pero el api solo arroja id entre 1-100, no permite id con letras o mayores a 100, por ende pase la el tareaUpdate a la funcion de actualizarTareas*/
        tareaActualizar(tareaUpdate.id,tareaUpdate);

        // Recetear FormularioUpdate
        guardarTreaUpdate({
            nombre:'',
            prioridad:'',
            descripcion:''
        })
    }

    // funcion para cerrar el formulario de edicion
    const cerrarUpdate =() =>{
        guardarFormUpdate(false);
    }

    return(
        <div>
            <h3>Editar Tarea</h3>
            {error ? <Error mensaje="Todos los campos son Obligatorios"  /> :null }
            <form  onSubmit={submitTareaUpdate}>
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

                <button className="btn btn-primary" type="submit" >Editar</button>
                <button className="btn btn-secondary ml-1" onClick={()=>cerrarUpdate()} type="submit" >Cerrar</button>
            </form>
        </div>
    )
}
export default FormularioUpdate;