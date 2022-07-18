// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { conn } from '../../utils/db'

export default async (req, res) => {
  
  const response = await conn.query('SELECT NOW()')

  console.log(response)

  return res.status(200).json({ name: 'Pong', time: response.rows[0].now })
}
