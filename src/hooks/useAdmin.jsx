import useProyectos from "./useProyectos"
import useAuth from "./useAuth"

const useAdmin = () => {
  const { proyecto } = useProyectos()
  const { auth } = useAuth()

  return auth._id === proyecto.creador
}

export default useAdmin
