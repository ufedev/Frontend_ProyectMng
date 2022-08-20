import useProyectos from "../hooks/useProyectos"
import PreviewProyecto from "../components/PreviewProyecto"
const Proyectos = () => {
  const { proyectos } = useProyectos()

  return (
    <div className="p-5">
      <h1 className="text-white text-5xl font-bold">Proyectos</h1>
      <div className="p-10">
        {proyectos.length > 0 ? (
          <div className="flex flex-col gap-5">
            {proyectos.map((proyecto) => (
              <PreviewProyecto key={proyecto._id} proyecto={proyecto} />
            ))}
          </div>
        ) : (
          <p>No hay proyectos aún</p>
        )}
      </div>
    </div>
  )
}

export default Proyectos
