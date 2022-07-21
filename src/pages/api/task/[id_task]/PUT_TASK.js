import { conn } from '../../../../utils/db'

export const PUT_TASK = async (query, body, res) => {
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
