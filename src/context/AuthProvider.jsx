import { createContext, useState, useEffect } from "react"

import clienteAxios from "../config/clienteAxios"
const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token")

      if (!token) {
        setCargando(false)
        return
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }

      try {
        const { data } = await clienteAxios(
          `${import.meta.env.VITE_API_URL}/api/usuarios/perfil`,
          config
        )
        setAuth(data)
      } catch (error) {
        setAuth({})
      }

      setCargando(false)
    }
    autenticarUsuario()
  }, [])

  const cerrarSession = () => {
    setAuth({})
    localStorage.removeItem("token")
  }
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }
export default AuthContext
