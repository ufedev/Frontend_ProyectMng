import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
const PreviewProyecto = ({ proyecto }) => {
  const { _id, nombre, cliente } = proyecto
  const { auth } = useAuth()

  const admin = auth._id === proyecto.creador

  return (
    <div className="bg-stone-800 rounded flex justify-between items-center p-5 flex-col gap-5 md:flex-row">
      <div className="flex items-center gap-2">
        <p className="font-bold">{nombre}</p>
        <p className="text-sm text-stone-400">{cliente}</p>
      </div>

      <div className="flex gap-2 items-center">
        {!admin && (
          <div className="text-xs px-5 py-2 bg-green-500 font-bold uppercase rounded-xl text-stone-700">
            colaborador
          </div>
        )}
        <Link
          to={_id}
          className="font-bold underline hover:text-indigo-400 transition-colors"
        >
          Ver Proyecto
        </Link>
      </div>
    </div>
  )
}

export default PreviewProyecto
