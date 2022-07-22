import { useState } from 'react'
import { useRouter } from 'next/router'

export default function newPage() {
  const router = useRouter()

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
    await fetch('http://localhost:3000/api/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createTask(task)
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <section>
        <h1>New Task</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='title'>Title:</label>
          <input
            type='text'
            placeholder='ingresa title'
            name='title'
            onChange={handleChenge}
          />
          <label htmlFor='description'>Description:</label>
          <textarea
            constentEditable='true'
            placeholder='ingresa description'
            name='description'
            onChange={handleChenge}
            role='textbox'
          />
          <div>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </section>
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
        label {
          font-weight: bold;
          width: 100%;
          margin-bottom: 0.5rem;
        }
        input,
        textarea {
          width: 100%;
          min-width: 25rem;
          min-height: 3rem;
          height: auto;
          padding: 0.5rem;
          border: 1px solid #2575d0;
          border-radius: 0.3rem;
          margin-bottom: 0.5rem;
          outline: none;
          /* resize: none; */
        }
        textarea {
          min-height: 8rem;
          overflow: hidden;
        }
        textarea::-webkit-scrollbar {
          width: 0px;
        }
        div {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
        }
        button {
          /* text-transform: uppercase; */
          font-size: 1.2rem;
          font-weight: bold;
          padding: 0.5rem 1rem;
          border: 1px solid #ccc;
          border-radius: 0.5rem;
          margin-top: 1rem;
          background: #2575d0dd;
          cursor: pointer;
        }
      `}</style>
    </>
  )
}
