import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState, useEffect } from "react"
import useProyectos from "../hooks/useProyectos"
import Alerta from "../components/Alerta"

const ModalEliminarTarea = ({ proyecto }) => {
  const { handleModalEliminar, modalEliminar, alerta, tarea, eliminarTarea } =
    useProyectos()

  const { msg } = alerta
  return (
    <>
      <Transition appear show={modalEliminar} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={handleModalEliminar}
        >
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
                      Proyecto {proyecto.nombre}
                    </Dialog.Title>

                    <button
                      className="text-stone-500 hover:text-stone-900 transition-all"
                      onClick={handleModalEliminar}
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
                  <div className="py-5 pb-10">
                    {msg && <Alerta alerta={alerta} />}
                  </div>
                  <div>
                    <div>
                      <div className="font-bold flex gap-2 items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10"
                          viewBox="0 0 20 20"
                          fill="red"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <p>
                          La tarea se eliminara permantentmente{" "}
                          <span className="block text-stone-700 text-sm">
                            Esta Seguro?
                          </span>
                        </p>
                      </div>

                      <div className="flex justify-end gap-2 mt-5">
                        <button
                          className="border-2 border-red-900 px-5 py-2 rounded font-bold hover:bg-red-100 transition-all"
                          onClick={handleModalEliminar}
                        >
                          Cancelar
                        </button>
                        <button
                          className="bg-red-700 text-stone-100 px-5 py-2 rounded font-bold hover:bg-red-600 transition-all"
                          onClick={() => {
                            eliminarTarea(tarea._id)
                          }}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
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

export default ModalEliminarTarea
