import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState, useEffect } from "react"
import useProyectos from "../hooks/useProyectos"
import { Link } from "react-router-dom"

const ModalBuscar = ({ proyecto }) => {
  const { handleModalBuscar, modalBuscar, busqueda, setBusqueda, proyectos } =
    useProyectos()
  const [resultado, setResultado] = useState([])

  useEffect(() => {
    if (busqueda === "") {
      setResultado([])
    } else {
      const listaProyectos = [...proyectos]

      const filter = listaProyectos.filter((proy) =>
        proy.nombre.toLowerCase().includes(busqueda.toLowerCase())
      )

      setResultado(filter)
    }
  }, [busqueda])

  return (
    <>
      <datalist id="search">
        {proyectos.map((proy) => {
          return <option key={proy._id}>{proy.nombre}</option>
        })}
      </datalist>
      <Transition appear show={modalBuscar} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleModalBuscar}>
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
                      Buscar Proyecto
                    </Dialog.Title>

                    <input
                      type="text"
                      name="buscar"
                      list="search"
                      id="buscar"
                      placeholder="Busca el proyecto"
                      className="px-5 py-2 rounded text-black"
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2 mt-5">
                    {resultado.length > 0 &&
                      resultado.map((proy) => (
                        <a
                          key={proy?._id}
                          className="border px-5 py-2 shadow font-bold hover:bg-stone-200 transition-all"
                          href={`/proyectos/${proy?._id}`}
                        >
                          {proy?.nombre}
                        </a>
                      ))}
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

export default ModalBuscar
