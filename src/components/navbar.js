import { useRouter } from 'next/router'

export const NavBar = () => {
  const router = useRouter()
  return (
    <>
      <nav>
        <img
          src='#'
          alt='#'
          width={30}
          height={30}
          onClick={() => router.push('/')}
        />
        <div>
          <button onClick={() => router.push('/task/new')}>New Task</button>
        </div>
      </nav>
      <style jsx>{`
        nav {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          background: #444;
          margin-bottom: 1rem;
        }
        img {
          height: 100%;
          width: auto;
          cursor: pointer;
        }
        button {
          text-transform: uppercase;
          font-weight: bold;
          background: #2575d0;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: .3rem;
          cursor: pointer;
        }
      `}</style>
    </>
  )
}
