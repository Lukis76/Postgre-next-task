import { Pool } from 'pg'

let conn = null

if (conn === null) {
  conn = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'fazt_task',
    password: 'mano76',
    port: 7777,
  })
}

export { conn }
