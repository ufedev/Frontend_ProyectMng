import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import useProyectos from "../hooks/useProyectos"
import Alerta from "../components/Alerta"
const FormularioColaborador = () => {
  const [email, setEmail] = useState("")
  const { alerta, mostrarAlerta, buscarColaborador } = useProyectos()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (email === "") {
      mostrarAlerta({
        msg: "Debe colocar un email",
        error: true,
      })
      setTimeout(() => {
        mostrarAlerta({})
      }, 3000)
      return
    }

    mostrarAlerta({})
    await buscarColaborador(email)
    setEmail("")
  }

  const { msg } = alerta

  return (
    <>
      <div className="p-5">{msg && <Alerta alerta={alerta} />}</div>

      <div className="p-5 bg-stone-800 rounded w-3/4 xl:w-1/5 mx-auto mt-10 ">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-bold">
              Email colaborador
            </label>
            <input
              className="px-5 py-2 rounded shadow text-black"
              type="email"
              name="email"
              id="email"
              placeholder="Email que desea Buscar"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <input
            type="submit"
            className="px-5 py-2 border rounded w-full mt-5 font-bold text-sm hover:bg-stone-200 hover:text-black cursor-pointer transition-all"
            value="Buscar Colaborador"
          />
        </form>
      </div>
    </>
  )
}

export default FormularioColaborador
