import clienteAxios from "../config/clienteAxios"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Alerta from "../components/Alerta"
const ConfirmarCuenta = () => {
  const [confirmada, setConfirmada] = useState(false)
  const [alerta, setAlerta] = useState({})
  const { id: token } = useParams()

  useEffect(() => {
    async function confirmar() {
      try {
        const { data } = await clienteAxios(`/usuarios/confirmar/${token}`)

        setAlerta({
          msg: data.msg,
        })

        setConfirmada(true)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        })
      }
    }
    confirmar()
  }, [])

  const { msg } = alerta

  return (
    <>
      <h1 className="text-indigo-400 font-bold text-6xl">
        Confirma tu cuenta y crea nuevos{" "}
        <span className="text-white">Proyectos</span>
      </h1>

      <div className="py-10 pb-20 mt-20">
        {msg && <Alerta alerta={alerta} />}
      </div>
      {confirmada && (
        <>
          <Link
            className="text-center block uppercase text-xs font-bold text-stone-300 hover:text-slate-400 transition-colors"
            to="/"
          >
            Iniciar Sesión
          </Link>
        </>
      )}
    </>
  )
}

export default ConfirmarCuenta
