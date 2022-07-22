import { NavBar } from './navbar'

export const Layout = ({ children }) => {
  return (
    <>
      <div>
        <NavBar />
        {children}
      </div>
      <style jsx>{`
        div {
          width: 100%;
          height: 100%;
          background: #2575d0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </>
  )
}
