import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"
import useAuth from "../hooks/useAuth"
const Login = () => {
  const { auth, setAuth } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [alerta, setAlerta] = useState({})
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()

    if ([email, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      })
      return
    }

    try {
      const { data } = await clienteAxios.post(
        `${import.meta.env.VITE_API_URL}/api/usuarios/login`,
        {
          email,
          password,
        }
      )
      setAlerta({})
      localStorage.setItem("token", data.token)
      setAuth(data)
      navigate("/proyectos")
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      })
    }
  }
  const { msg } = alerta

  return (
    <>
      <h1 className="text-indigo-400 font-bold text-6xl">
        Inicia Sesión y Administra tus{" "}
        <span className="text-white">Proyectos</span>
      </h1>
      <div className="pt-10">{msg && <Alerta alerta={alerta} />}</div>
      <div className="p-5 py-10 bg-stone-100 mt-20 rounded">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="font-bold uppercase text-sm px-5 text-stone-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Correo Electronico"
              className="py-2 px-5 border border-slate-700 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="font-bold uppercase text-sm px-5 text-stone-700"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Contraseña"
              className="py-2 px-5 border border-slate-700 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-stone-900 rounded text-white font-bold py-2 px-5 hover:bg-stone-700 transition-all cursor-pointer"
          />
        </form>
      </div>

      <nav className="flex flex-col lg:flex-row lg:justify-between w-full gap-5 mt-5">
        <Link
          className="text-center uppercase text-xs font-bold text-stone-300 hover:text-slate-400 transition-colors"
          to="/registro"
        >
          Registrate
        </Link>
        <Link
          className="text-center uppercase text-xs font-bold text-stone-300 hover:text-slate-400 transition-colors"
          to="/olvide-password"
        >
          Olvide mi Contraseña
        </Link>
      </nav>
    </>
  )
}

export default Login
