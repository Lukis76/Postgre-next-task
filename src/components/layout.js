import { NavBar } from './navbar'
import { Modal } from './modal'

export const Layout = ({ children }) => {
  return (
    <>
      <section>
        <NavBar />
        {children}
        {/* <Modal /> */}
      </section>
      <style jsx>{`
        section {
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
