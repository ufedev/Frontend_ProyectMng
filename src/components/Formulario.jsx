import { useState, useEffect } from "react"
import useProyectos from "../hooks/useProyectos"
import Alerta from "../components/Alerta"
const Formulario = ({ proyecto }) => {
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [cliente, setCliente] = useState("")
  const [fechaEntrega, setFechaEntrega] = useState("")
  const { alerta, mostrarAlerta, submitProyecto, updateProyecto } =
    useProyectos()
  const { _id } = proyecto

  useEffect(() => {
    if (proyecto._id) {
      setNombre(proyecto.nombre)
      setDescripcion(proyecto.descripcion)
      setCliente(proyecto.cliente)
      setFechaEntrega(proyecto.fechaEntrega.substring(0, 10))
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if ([nombre, descripcion, cliente, fechaEntrega].includes("")) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      })
      setTimeout(() => {
        mostrarAlerta({})
      }, 4500)
      return
    }
    if (!proyecto._id) {
      await submitProyecto({ nombre, descripcion, cliente, fechaEntrega })
      setNombre("")
      setDescripcion("")
      setCliente("")
      setFechaEntrega("")
    } else {
      await updateProyecto({ nombre, descripcion, cliente, fechaEntrega }, _id)
    }
  }

  const { msg } = alerta

  return (
    <>
      <div className="py-10 w-full">{msg && <Alerta alerta={alerta} />}</div>
      <div className="py-5 bg-stone-800 w-9/12 xl:w-5/12 mx-auto mt-10 rounded-xl shadow-xl px-10 text-stone-800">
        <form
          className="flex flex-col items-center mt-10 gap-5"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col w-full gap-2">
            <label className="font-bold text-stone-100" htmlFor="nombre">
              Nombre Proyecto
            </label>
            <input
              className="px-5 py-2 rounded"
              name="nombre"
              id="nombre"
              placeholder="Nombre del proyecto"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <label className="font-bold text-stone-100" htmlFor="descripcion">
              Descripción
            </label>
            <textarea
              className="px-5 py-2 rounded"
              id="descripcion"
              placeholder="Descripción del proyecto"
              onChange={(e) => setDescripcion(e.target.value)}
              value={descripcion}
            ></textarea>
          </div>
          <div className="flex flex-col w-full gap-2">
            <label className="font-bold text-stone-100" htmlFor="cliente">
              Nombre Cliente
            </label>
            <input
              className="px-5 py-2 rounded"
              name="cliente"
              id="cliente"
              placeholder="Nombre del Cliente"
              type="text"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <label className="font-bold text-stone-100" htmlFor="fecha-entrega">
              Fecha de Entrega
            </label>
            <input
              className="px-5 py-2 rounded text-stone-500"
              name="fecha-entrega"
              id="fecha-entrega"
              type="date"
              value={fechaEntrega}
              onChange={(e) => setFechaEntrega(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value={_id ? "Editar Proyecto" : "Agregar"}
            className="px-5 py-2 text-white border border-indigo-400 rounded cursor-pointer hover:bg-indigo-300 hover:text-black font-bold uppercase text-sm w-full mt-10 transition-colors mb-10"
          />
        </form>
      </div>
    </>
  )
}

Formulario.defaultProps = {
  proyecto: {},
}

export default Formulario
