import { conn } from '../../utils/db'



export default async (req, res) => {
  const { method, body } = req

  if (method === 'GET') {
    return res.status(200).json({
      message: 'Peticion GET',
    })
  }
  if (method === 'POST') {

    const respuesta = await conn.query('INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *', [body.title, body.description])
    console.log(respuesta.rows[0])

    return res.status(200).json({
      message: 'Peticion POST ==> created task',
    })
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
