import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"

const CambiarPassword = () => {
  const [alertaToken, setAlertaToken] = useState({})
  const [alerta, setAlerta] = useState({})
  const [password, setPassword] = useState("")
  const [passwordModif, setPasswordModif] = useState(false)

  const { token } = useParams()

  useEffect(() => {
    async function comprobarToken() {
      try {
        const url = `/usuarios/olvide-password/${token}`
        await clienteAxios(url)
      } catch (error) {
        setAlertaToken({ msg: error.response.data.msg, error: true })
      }
    }
    comprobarToken()
  }, [])

  const { msg } = alerta
  const { msg: msg2 } = alertaToken

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password === "" || password.length < 6) {
      setAlerta({
        msg: "La contraseña debe contener al menos 6 caracteres",
        error: true,
      })
      return
    }
    setAlerta({})
    try {
      const url = `/usuarios/olvide-password/${token}`

      const { data } = await clienteAxios.post(url, {
        password,
      })
      setAlerta({
        msg: data.msg,
      })
      setPassword("")
      setPasswordModif(true)
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      })
    }
  }

  return (
    <>
      <h1 className="text-indigo-400 font-bold text-6xl">
        Recupera tu cuenta y no pierdas tus{" "}
        <span className="text-white">Proyectos</span>
      </h1>
      <div className="pt-10">
        {msg2 ? (
          <Alerta alerta={alertaToken} />
        ) : (
          <>
            <div className="pt-10">{msg && <Alerta alerta={alerta} />}</div>
            <div className="p-5 py-10 bg-stone-100 mt-20 rounded">
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="password"
                    className="font-bold uppercase text-sm px-5 text-stone-700"
                  >
                    Nueva Contraseña
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Eligé tu nueva contraseña"
                    className="py-2 px-5 border border-slate-700 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Cambiar Contraseña"
                  className="bg-stone-900 rounded text-white font-bold py-2 px-5 hover:bg-stone-700 transition-all cursor-pointer"
                />
              </form>
            </div>
          </>
        )}
      </div>
      {passwordModif && (
        <>
          <Link
            className="mt-10 text-center block uppercase text-xs font-bold text-stone-300 hover:text-slate-400 transition-colors"
            to="/"
          >
            Iniciar Sesión
          </Link>
        </>
      )}
    </>
  )
}

export default CambiarPassword
