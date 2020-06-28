import Formulario from '../cmponents/Formulario';
import Tareas from '../cmponents/Tareas';
import FormularioUpdate from '../cmponents/FormularioUpdate';
import Layout from '../cmponents/Layout';
import {useState} from 'react';

export default function Home() {
    // Arreglo de tareas
    const[tareas,guardarTareas]=useState([])
    // state tareaUpdate
    const[tareaUpdate,guardarTreaUpdate]=useState({
      id:'',
      nombre:'',
      prioridad:'',
      descripcion:''
  })
  // state para desplegar formulario
  const[formUpdate,guardarFormUpdate]=useState(false)

  // state administrador de componentes
  const[sinTareas, guardarSinTareas]=useState(false);

  // Funcion Para elimiar tareas
  const eliminarTarea = id =>{
    const tareaEliminada = tareas.filter(tarea => tarea.id !== id)
    guardarTareas(tareaEliminada)
  }

    // Funcion Editar Tareas
    const editarTarea = tarea =>{
      console.log(tarea)
      guardarTreaUpdate(tarea)
      guardarFormUpdate(true)
    }
    // Funcion para actualizar el state despues de editar
    const tareaActualizar = (id,tareaUpdate) =>{
      guardarTareas(tareas.map(tarea => tarea.id===id ? tareaUpdate : tarea))

    }
    // Funcion para Filtrar tareas
    const filtraTareas = palabrasClave =>{
      console.log(palabrasClave)
      
        if(palabrasClave === 'Urgente' || palabrasClave === 'Alta' || palabrasClave === 'Normal' || palabrasClave === 'Baja'){
          console.log('Busqueda por prioridad');
          const tareaFiltrada = tareas.filter(tarea => tarea.prioridad === palabrasClave);
          guardarTareas(tareaFiltrada)
        }else{
          const tareaFiltrada = tareas.filter(tarea => tarea.nombre === palabrasClave);
          guardarTareas(tareaFiltrada)
        }
    }

  
  return (
    <Layout>
          <div className="container">
            <h1 className="text-center mt-3 mb-3">Administrador de Tareas</h1>
        <div className="row">
          <div className="col-md-6">
          {formUpdate ?
            <FormularioUpdate
            tareaUpdate={tareaUpdate}
            tareaActualizar={tareaActualizar}
            guardarTreaUpdate={guardarTreaUpdate}
            guardarFormUpdate={guardarFormUpdate}

            
           />
          : 
          <Formulario 
          tareas={tareas}
          guardarTareas={guardarTareas}
          guardarSinTareas={guardarSinTareas}

        />
          }    
          </div>
         
          <div className="col-md-6">
            {sinTareas ? 
            
            <Tareas 
            tareas={tareas}
            eliminarTarea={eliminarTarea}
            editarTarea={editarTarea}
            filtraTareas={filtraTareas}
            guardarFormUpdate={guardarFormUpdate}
          />
            
            : <h3>No hay Tareas pendientes</h3>}
            
          </div>
        </div>
      </div>
    </Layout>

  

    )
  
  
}
