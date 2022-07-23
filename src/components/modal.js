import { useRouter } from 'next/router'

export const Modal = ({ children, isOpen, onClose, id }) => {
  const router = useRouter()
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/task/${id}`, {
        method: 'DELETE',
      })

      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {isOpen && (
        <div className='overlay'>
          <section>
            <div className='context'>
              <h4>Realmente desea borrar esta tarea ?</h4>
            </div>
            <div className='options'>
              <button className='cancel' onClick={() => onClose(false)}>
                Cancel
              </button>
              <button className='clear' onClick={() => handleDelete(id)}>
                Clear
              </button>
            </div>
          </section>
        </div>
      )}
      <style jsx>{`
        .overlay {
          width: 100vw;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.5);
          padding: 5rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        section {
          width: 40rem;
          height: 20rem;
          background: #fff;
          position: relative;
          border-radius: 0.8rem;
          padding: 1rem;
        }
        .context {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 4rem 0 4rem 0;
        }
        h4 {
          font-size: 2rem;
        }
        .options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem;
        }
        .cancel,
        .clear {
          background: #2575d0;
          color: #fff;
          border: none;
          border-radius: 0.8rem;
          padding: 0.5rem 1.5rem;
          font-size: 2rem;
          cursor: pointer;
        }
        .clear {
          background: #f25f5c;
        }
      `}</style>
    </>
  )
}
