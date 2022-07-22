import { useState } from 'react'

export default function newPage() {
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
    const res = await fetch('http://localhost:3000/api/task', {
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
            placeholder='ingresa description'
            name='description'
            onChange={handleChenge}
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
        }

        form {
          width: : auto;
          min-width: 300px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        label {
          width: 100%;
          margin-bottom: 0.5rem;
        }
        input, textarea {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #2575D0;
          border-radius: 3px;
          margin-bottom: 0.5rem;
        }

        div {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
        }

        button {
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 3px;
          margin-bottom: 0.5rem;
          margin-rigth: 0;
        }

      
      `}</style>
    </>
  )
}
