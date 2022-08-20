import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState, useEffect } from "react"
import useProyectos from "../hooks/useProyectos"
import Alerta from "../components/Alerta"
export default function ModalTarea({ proyecto }) {
  const {
    modal,
    handleModal,
    submitTarea,
    alerta,
    mostrarAlerta,
    tarea,
    submitEditarTarea,
  } = useProyectos()
  const [id, setId] = useState("")
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [fechaEntrega, setFechaEntrega] = useState("")
  const [prioridad, setPrioridad] = useState("")

  const { _id, nombre: name } = proyecto
  useEffect(() => {
    if (tarea?._id) {
      setId(tarea._id)
      setNombre(tarea.nombre)
      setDescripcion(tarea.descripcion)
      setFechaEntrega(tarea.fechaEntrega.substring(0, 10))
      setPrioridad(tarea.prioridad)
    } else {
      setId("")
      setNombre("")
      setDescripcion("")
      setFechaEntrega("")
      setPrioridad("")
    }
  }, [tarea])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if ([nombre, descripcion, fechaEntrega, prioridad].includes("")) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      })
      setTimeout(() => {
        mostrarAlerta({})
      }, 3000)
      return
    }
    mostrarAlerta({})
    if (tarea?._id) {
      await submitEditarTarea({
        id,
        nombre,
        descripcion,
        fechaEntrega,
        prioridad,
        proyecto: _id,
      })
      setTimeout(() => {
        handleModal()
      }, 2000)
      return
    } else {
      await submitTarea({
        nombre,
        descripcion,
        fechaEntrega,
        prioridad,
        proyecto: _id,
      })
    }
    setId("")
    setNombre("")
    setDescripcion("")
    setFechaEntrega("")
    setPrioridad("")
    setTimeout(() => {
      handleModal()
    }, 2000)
  }
  const { msg } = alerta
  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded bg-stone-100 p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between items-center gap-2">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-medium leading-6 text-gray-900"
                    >
                      Proyecto {name}
                    </Dialog.Title>

                    <button
                      className="text-stone-500 hover:text-stone-900 transition-all"
                      onClick={handleModal}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="py-5">
                    {msg && <Alerta alerta={alerta} />}
                  </div>
                  <div>
                    <form onSubmit={handleSubmit}>
                      <div className="flex flex-col gap-2 mt-5">
                        <label
                          htmlFor="nombre"
                          className="font-bold text-stone-600"
                        >
                          Tarea
                        </label>
                        <input
                          type="text"
                          name="nombre"
                          id="nombre"
                          placeholder="Nombre de la tarea"
                          className="px-5 py-2 rounded border shadow"
                          value={nombre}
                          onChange={(e) => setNombre(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col gap-2 mt-5">
                        <label
                          htmlFor="descripcion"
                          className="font-bold text-stone-600"
                        >
                          Descripción
                        </label>
                        <textarea
                          name="descripcion"
                          id="descripcion"
                          placeholder="Descripción"
                          className="px-5 py-2 rounded border shadow"
                          value={descripcion}
                          onChange={(e) => setDescripcion(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col gap-2 mt-5">
                        <label
                          htmlFor="fecha-entrega"
                          className="font-bold text-stone-600"
                        >
                          Fecha de Entrega
                        </label>
                        <input
                          type="date"
                          name="fecha-entrega"
                          id="fecha-entrega"
                          className="px-5 py-2 rounded border shadow"
                          value={fechaEntrega}
                          onChange={(e) => setFechaEntrega(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col gap-2 mt-5">
                        <label
                          htmlFor="prioridad"
                          className="font-bold text-stone-600"
                        >
                          Prioridad
                        </label>
                        <select
                          name="prioridad"
                          id="prioridad"
                          className="px-5 py-2 rounded border shadow"
                          value={prioridad}
                          onChange={(e) => setPrioridad(e.target.value)}
                        >
                          <option value="">--Seleccione---</option>
                          <option value="Baja">Baja</option>
                          <option value="Media">Media</option>
                          <option value="Alta">Alta</option>
                        </select>
                      </div>
                      <input
                        type="submit"
                        value={tarea?._id ? "Editar Tarea" : "Agregar Tarea"}
                        className="w-full px-5 py-2 mt-5 border border-indigo-400 rounded font-bold hover:bg-indigo-400  hover:text-stone-100 transition-all cursor-pointer shadow-xl"
                      />
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
