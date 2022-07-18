import { conn } from '../../../utils/db'

export default async (req, res) => {
  const { method, body } = req
  const { title, description } = body

  if (method === 'GET') {
    try {
      const response = await conn.query('SELECT * FROM task') // seleccionamos la tabla de tareas (task) y seleccionamos todos los campos de la tabla
      return res.status(200).json(response.rows)
    } catch (error) {
      console.log(error)
    }
  }

  if (method === 'POST') {
    try {
      const comand =
        'INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *'

      const respuesta = await conn.query(comand, [title, description])
      console.log(respuesta.rows[0])

      return res.status(200).json({
        message: 'Peticion POST ==> created task',
        respuesta: respuesta.rows,
      })
    } catch (error) {
      return res.status(500).json({
        message: 'Error al crear la tarea',
        error,
      })
    }
  }

  if (method === 'PUT') {
    return res.status(200).json({
      message: 'Peticion PUT',
    })
  }
  if (method === 'DELETE') {
    return res.status(200).json({
      message: 'Peticion DELETE',
    })
  }
  if (method !== 'GET' || 'POST' || 'PUT' || 'DELETE') {
    return res.status(400).json({
      message: 'Peticion INVALID',
    })
  }
}
