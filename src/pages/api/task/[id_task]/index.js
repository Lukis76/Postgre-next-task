// traemos la connecion de la base de datos
import { DELETED_TASK } from './DELETED_TASK'
import { GET_TASK } from './GET_TASK'
import { PUT_TASK } from './PUT_TASK'

export default async (req, res) => {
  // extraemos el metodo que contiene el tipo de peticion que se hizo
  // extraemos el query que contiene la fraccion de url
  // despues de task que en este caso el el id de la tarea
  const { method, query, body } = req

  // si la peticion es get entramos en este if
  if (method === 'GET') {
    // llamamos a la funcion GET_TASK
    return GET_TASK(query, res)
  }
  // si la peticion es put entramos en este if
  if (method === 'PUT') {
    // llamamos a la funcion PUT_TASK
    return PUT_TASK(query, body, res)
  }
  // si la peticion es delete entramos en este if
  if (method === 'DELETE') {
    return DELETED_TASK(query, res)
  }
  // si la peticion no es get, post, put o delete entramos en este if
  if (method !== 'GET' || 'POST' || 'PUT' || 'DELETE') {
    return res.status(400).json({
      message: 'Peticion INVALID',
    })
  }
}
