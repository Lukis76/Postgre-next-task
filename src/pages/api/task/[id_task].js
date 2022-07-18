// traemos la connecion de la base de datos
import { conn } from '../../../utils/db'

export default async (req, res) => {
  // extraemos el metodo que contiene el tipo de peticion que se hizo
  // extraemos el query que contiene la fraccion de url
  // despues de task que en este caso el el id de la tarea
  const { method, query, body } = req

  console.log(query)

  // si la peticion es get entramos en este if
  if (method === 'GET') {
    try {
      // seleccionamos la tabla de tarea (task)
      // y con WHERE seleccionamos el id de la tarea que se encuentra en la url
      // en esta seccion tenemos dos query pero no son iguales
      // ya que el query de conn.query es una promesa de la base de datos
      // y el quer.id_task es una promesa de la url 
      // (id_task) es el nombre de la ruta relativa de next.js
      const result = await conn.query('SELECT * FROM task WHERE id = $1', [
        query.id_task,
      ])
      // console.log(result.rows)

      // si la consulta no tiene resultados entramos en este if
      if (result.rows.length === 0) {
        return res.status(404).json({
          message: 'Task not found',
        })
      }
      //
      return res.status(200).json(result.rows[0])
      //
    } catch (error) {
      return res.status(500).json({
        message: 'Error al obtener las tareas',
      })
    }
  }
  // si la peticion es post entramos en este if
  // if (method === 'POST') {
  //   return res.status(200).json({
  //     message: 'Peticion POST',
  //   })
  // }
  // si la peticion es put entramos en este if
  if (method === 'PUT') {
    try {
      const { title, description } = body
      // seleccionamos la tabla de tarea (task)
      // y con WHERE seleccionamos el id de la tarea que se encuentra en la url
      // en esta seccion tenemos dos query pero no son iguales
      // ya que el query de conn.query es una promesa de la base de datos
      // y el quer.id_task es una promesa de la url 
      // (id_task) es el nombre de la ruta relativa de next.js
      const result = await conn.query(
        'UPDATE task SET title=$1, description=$2 WHERE id = $3 RETURNING *',
        [title, description, query.id_task]
      )
      // console.log(result.rows)

      // si la consulta no tiene resultados entramos en este if
      if (result.rows.length === 0) {
        return res.status(404).json({
          message: 'Task not found',
        })
      }
      //
      return res.status(200).json(result.rows[0])
      //
    } catch (error) {
      return res.status(500).json({
        message: 'Error al obtener las tareas',
      })
    }
  }
  // si la peticion es delete entramos en este if
  if (method === 'DELETE') {
    try {
      // borramos la tarea (task) con el id que se encuentra en la url
      // en esta seccion tenemos dos query pero no son iguales
      // ya que el query de conn.query es una promesa de la base de datos
      // y el quer.id_task es una promesa de la url 
      // (id_task) es el nombre de la ruta relativa de next.js
      const result = await conn.query(
        'DELETE FROM task WHERE id = $1 RETURNING *',
        [query.id_task]
      )
      // console.log(result.rows)

      console.log(result)
      // si el resultado de la consultaen rowCount es 0 entramos en este if,
      // de lo contrario el rowCount es distinto de 0, no entramos en el if
      if (result.rowCount === 0) {
        return res.status(404).json({
          message: `Task con id ==> ${query.id_task} <== inexistente`,
        })
      }
      // //
      // return res.status(200).json(result.rows[0])
      return res
        .status(200)
        .json({ mensaje: 'Tarea eliminada', task: result.rows[0] })
      //
    } catch (error) {
      return res.status(500).json({
        message: 'Error al eliminar tarea',
      })
    }
  }
  // si la peticion no es get, post, put o delete entramos en este if
  if (method !== 'GET' || 'POST' || 'PUT' || 'DELETE') {
    return res.status(400).json({
      message: 'Peticion INVALID',
    })
  }
}
