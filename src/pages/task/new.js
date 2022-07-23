import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Modal } from 'src/components/modal'
// import PORT from " /.env "

export default function newPage(props) {

  console.log(process.env.NEXT_PUBLIC_URL_CLIENT)
  console.log(process.env.PORT);
  const router = useRouter()

  const [modal, setModal] = useState(false)

  const [task, setTask] = useState({
    title: '',
    description: '',
  })

  const handleChenge = (e) => {
    const { name, value } = e.target

    setTask({
      ...task,
      [name]: value,
    })
  }

  const createTask = async () => {
    await fetch(`${process.env.NEXT_PUBLIC__VERCEL_URL || 'http://localhost:3000'}/api/task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
  }

  const loadTask = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC__VERCEL_URL || 'http://localhost:3000'}/api/task/${id}`)
    const data = await res.json()
    // console.log(data)
    setTask({ title: data.title, description: data.description })
  }

  const updateTask = async (id, task) => {
    await fetch(`${process.env.NEXT_PUBLIC__VERCEL_URL || 'http://localhost:3000'}/api/task/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (typeof router.query.edit === 'string')
        updateTask(router.query.edit, task)
      if (!router.query.edit) await createTask(task)
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (typeof router.query.edit === 'string') loadTask(router.query.edit)
  }, [router.query])

  return (
    <>
      <section>
        {router.query.edit ? <h2>Edit Task</h2> : <h2>New Task</h2>}
        <form onSubmit={handleSubmit}>
          <label htmlFor='title'>
            Title:
            <input
              type='text'
              placeholder='ingresa title'
              name='title'
              onChange={handleChenge}
              value={task.title}
            />
          </label>
          <label htmlFor='description'>
            Description:
            <textarea
              placeholder='ingresa description'
              name='description'
              onChange={handleChenge}
              value={task.description}
            />
          </label>
          <div>
            {router.query.edit ? (
              <>
                <button
                  onClick={() => setModal(!modal)}
                  className='clear'
                  type='button'>
                  Clear
                </button>
                <button
                  onClick={() => router.push('/')}
                  className='edit'
                  type='submit'>
                  Edit
                </button>
              </>
            ) : (
              <button className='create' type='submit'>
                Create
              </button>
            )}
          </div>
        </form>
      </section>

      <Modal
        isOpen={modal}
        onClose={setModal}
        id={typeof router.query.edit === 'string' && router.query.edit}
      />

      <style jsx>{`
        section {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          margin-top: 4rem;
          width: min-content;
          padding: 2rem;
          background: #fefefefe;
          border-radius: 1rem;
        }
        form {
          min-width: 25rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        h2 {
          font-size: 2rem;
        }
        label {
          font-size: 1.4rem;
          font-weight: bold;
          width: 100%;
          margin-bottom: 0.5rem;
        }
        input,
        textarea {
          font-size: 1.2rem;
          font-weight: 500;
          width: 100%;
          min-width: 25rem;
          min-height: 3rem;
          height: auto;
          padding: 0.5rem;
          border: 1px solid #2575d0;
          border-radius: 0.4rem;
          margin-bottom: 0.5rem;
          outline: none;
        }
        textarea {
          min-height: 8rem;
          overflow: hidden;
        }
        div {
          width: 100%;
          display: flex;
          flex-direction: row;
          ${router.query.edit
            ? 'justify-content: space-between;'
            : 'justify-content: flex-end;'}
        }
        button {
          font-size: 1.5rem;
          font-weight: bold;
          padding: 0.5rem 1rem;
          border: 1px solid #ccc;
          border-radius: 0.5rem;
          margin-top: 1rem;
          background: #2575d0ff;
        }
        .create:hover {
          background: #2575d0dd;
        }
        .clear {
          background: #f00;
        }
        .clear:hover {
          background: #f00000bb;
        }
        .edit {
          background: #257333dd;
        }
        .edit:hover {
          background: #257333aa;
        }
      `}</style>
    </>
  )
}


export const getStaticsProps = () => {
  // console.log(process.env.PORT)
  return {
    props: {}
  }
}


