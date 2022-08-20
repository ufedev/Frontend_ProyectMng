import { Link } from "react-router-dom"
import { useState } from "react"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta.jsx"
const Registro = () => {
  const [alerta, setAlerta] = useState({})
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repetirPassword, setRepetirPassword] = useState("")

  const { msg } = alerta

  const handleLengthPassword = (pass) => {
    if (pass.length < 6) {
      setAlerta({
        msg: "La contraseña debe contener al menos 6 caractaeres",
        error: true,
      })
      return
    }

    setAlerta({})
  }
  const handleSumbmit = async (e) => {
    e.preventDefault()
    setAlerta({})
    if (alerta.error) {
      return
    }
    if ([nombre, email, password, repetirPassword].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      })
      return
    }

    if (password !== repetirPassword) {
      setAlerta({
        msg: "Las contraseñas no coinciden",
        error: true,
      })
      return
    }

    setAlerta({})

    //Crear Usuario

    try {
      const url = `/usuarios`
      const { data } = await clienteAxios.post(url, {
        nombre,
        email,
        password,
      })

      setAlerta({
        msg: data.msg,
      })
      setNombre("")
      setEmail("")
      setPassword("")
      setRepetirPassword("")
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      })
    }
  }

  return (
    <>
      <h1 className="text-indigo-400 font-bold text-6xl pb-10">
        Registrate y comienza a Administrar tus{" "}
        <span className="text-white">Proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      <div className="p-5 py-10 bg-stone-100 mt-20 rounded">
        <form className="flex flex-col gap-5" onSubmit={handleSumbmit}>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="nombre"
              className="font-bold uppercase text-sm px-5 text-stone-700"
            >
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              name="nombre"
              placeholder="Su nombre"
              className="py-2 px-5 border border-slate-700 rounded"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
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
              placeholder="Nueva Contraseña"
              className="py-2 px-5 border border-slate-700 rounded"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                handleLengthPassword(e.target.value)
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password2"
              className="font-bold uppercase text-sm px-5 text-stone-700"
            >
              Repetir Contraseña
            </label>
            <input
              id="password2"
              type="password"
              name="password2"
              placeholder="Repita la Contraseña"
              className="py-2 px-5 border border-slate-700 rounded"
              value={repetirPassword}
              onChange={(e) => setRepetirPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Registrarme"
            className="bg-stone-900 rounded text-white font-bold py-2 px-5 hover:bg-stone-700 transition-all cursor-pointer"
          />
        </form>
      </div>

      <nav className="flex flex-col lg:flex-row lg:justify-between w-full gap-5 mt-5">
        <Link
          className="text-center uppercase text-xs font-bold text-stone-300 hover:text-slate-400 transition-colors"
          to="/"
        >
          Iniciar Sesión
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

export default Registro
