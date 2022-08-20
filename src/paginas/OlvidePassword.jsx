import { Link } from "react-router-dom"
import { useState } from "react"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"
const OlvidePassword = () => {
  const [email, setEmail] = useState("")
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (email.includes("@") && email.includes(".com") && email.length > 10) {
      try {
        const url = `/usuarios/olvide-password`
        const datos = {
          email,
        }

        const { data } = await clienteAxios.post(url, datos)
        setAlerta({
          msg: data.msg,
        })
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        })
      }
    } else if (email === "") {
      setAlerta({
        msg: "El email es obligatorio",
        error: true,
      })
      return
    } else {
      setAlerta({
        msg: "El email no es valido",
        error: true,
      })
      return
    }
  }

  const { msg } = alerta
  return (
    <>
      <h1 className="text-indigo-400 font-bold text-6xl">
        Recupera tu cuenta y no pierdas tus{" "}
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
              type="text"
              name="email"
              placeholder="Tú Correo Electronico"
              className="py-2 px-5 border border-slate-700 rounded"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </div>

          <input
            type="submit"
            value="Recuperar Cuenta"
            className="bg-stone-900 rounded text-white font-bold py-2 px-5 hover:bg-stone-700 transition-all cursor-pointer"
          />
        </form>
      </div>

      <nav className="flex flex-col lg:flex-row lg:justify-between w-full gap-5 mt-5">
        <Link
          className="text-center uppercase text-xs font-bold text-stone-300 hover:text-slate-400 transition-colors"
          to="/"
        >
          Inicia Sesión
        </Link>
        <Link
          className="text-center uppercase text-xs font-bold text-stone-300 hover:text-slate-400 transition-colors"
          to="/registro"
        >
          Registrate
        </Link>
      </nav>
    </>
  )
}
export default OlvidePassword
