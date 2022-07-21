import { conn } from '../../../../utils/db'

export const DELETED_TASK = async (query, res) => {
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
    // si el resultado de la consultaen rowCount es 0 entramos en este if,
    // de lo contrario el rowCount es distinto de 0, no entramos en el if
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: `Task con id ==> ${query.id_task} <== inexistente`,
      })
    }
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
