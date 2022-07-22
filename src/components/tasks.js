import { useRouter } from 'next/router'



export const ListTasks = ({ tasks }) => {

  const router = useRouter()

  return (
    <>
      {tasks.length === 0 ? (
        <section>
          <div>
            <h2>No hay tareas</h2>
          </div>
        </section>
      ) : (
        tasks.map((task) => (
          <section>
            <div key={task.id} onClick={() => {router.push(`/task/edit/${task.id}`)}}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              {task.created_on && (
                <small>{new Date(task.created_on).toLocaleDateString()}</small>
              )}
            </div>
          </section>
        ))
      )}
      <style jsx>{`
        section {
          width: 100%;
          height: 100%;
          min-height: 10rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0.5rem;
        }
        div {
          width: 100%;
          height: 100%;
          max-height: 17rem;
          background: #eee;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          /* border: 1px solid #fff; */
          border-radius: .5rem;
        }
        h3 {
          text-transform: uppercase;
          font-weight: 800;
          font-size: 1.2rem;
          padding: .5rem;
        }
        p {
          height: auto;
          display: inline-block
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          width: 95%;
          text-align: center;
        }
        small {
          text-align: end;
          width: 95%;
          font-size: 0.7rem;
        }
      `}</style>
    </>
  )
}
