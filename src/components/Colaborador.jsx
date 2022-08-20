import useProyectos from "../hooks/useProyectos"
const Colaborador = ({ colaborador }) => {
  const { handleModalEliminarColaborador } = useProyectos()

  return (
    <div className="p-5 mt-5 bg-black rounded shadow flex justify-between items-center">
      <div>
        <h4 className="text-xl font-bold capitalize">{colaborador.nombre}</h4>
        <p className=" text-sm  text-stone-500">{colaborador.email}</p>
      </div>
      <div>
        <button
          className=" rounded px-5 py-2 text-sm  bg-red-700 font-bold hover:bg-red-800 transition-colors"
          onClick={() => {
            handleModalEliminarColaborador(colaborador)
          }}
        >
          Quitar Colaborador
        </button>
      </div>
    </div>
  )
}

export default Colaborador
