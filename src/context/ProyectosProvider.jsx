import clienteAxios from "../config/clienteAxios"
import { createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { io } from "socket.io-client"

let socket
const ProyectosContext = createContext()

const ProyectosProvider = ({ children }) => {
  const [busqueda, setBusqueda] = useState("")
  const [colaborador, setColaborador] = useState({})
  const [tarea, setTarea] = useState({})
  const [proyecto, setProyecto] = useState({})
  const [proyectos, setProyectos] = useState([])
  const [alerta, setAlerta] = useState({})
  const [cargando, setCargando] = useState(false)
  const [modal, setModal] = useState(false)
  const [modalEliminar, setModalEliminar] = useState(false)
  const [modalEliminarColaborador, setModalEliminarColaborador] =
    useState(false)
  const [openAlerta, setOpenAlerta] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const [modalBuscar, setModalBuscar] = useState(false)
  useEffect(() => {
    socket = io(import.meta.env.VITE_API_URL)
  }, [])

  const mostrarAlerta = (alert) => {
    setAlerta(alert)
  }
  //############################################################################### */
  // Proyectos
  //###############################################################################*/
  useEffect(() => {
    const obtenerProyectos = async () => {
      try {
        if (!token) return

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
        const { data } = await clienteAxios(
          `${import.meta.env.VITE_API_URL}/api/proyectos`,
          config
        )

        setProyectos(data)
      } catch (error) {}
    }
    obtenerProyectos()
  }, [token])

  const obtenerProyecto = async (id) => {
    setCargando(true)

    try {
      if (!token) return
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await clienteAxios(
        `${import.meta.env.VITE_API_URL}/api/proyectos/${id}`,
        config
      )

      setProyecto(data)
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.msg,
        error: true,
      })
      navigate("/")
    }

    setCargando(false)
  }
  const submitProyecto = async (proyecto) => {
    if (!token) return

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }

      const { data } = await clienteAxios.post(
        `${import.meta.env.VITE_API_URL}/api/proyectos`,
        proyecto,
        config
      )

      setAlerta({
        msg: "Proyecto agregado correctamente",
        error: false,
      })
      setProyectos([...proyectos, data])
      setTimeout(() => {
        mostrarAlerta({})
        navigate("/")
      }, 3000)
    } catch (error) {
      setAlerta(error.response.data.msg)
    }
  }
  const updateProyecto = async (proyecto, id) => {
    if (!token) return
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await clienteAxios.put(
        `${import.meta.env.VITE_API_URL}/api/proyectos/${id}`,
        proyecto,
        config
      )
      setAlerta({
        msg: "Editado Correctamente",
      })

      const actualizados = proyectos.map((proy) =>
        proy._id === id ? data : proy
      )

      setProyectos(actualizados)
      setTimeout(() => {
        mostrarAlerta({})
        navigate(`proyectos/${id}`)
      }, 3000)
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.msg,
        error: true,
      })
      setTimeout(() => {
        mostrarAlerta({})
      }, 2000)
    }
  }

  const eliminarProyecto = async (id) => {
    const confirmar = confirm(
      "Desea eliminar este proyecto de forma permanente?"
    )
    if (!confirmar) return
    //eliminacion

    if (!token) return

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }

      const { data } = await clienteAxios.delete(
        `${import.meta.env.VITE_API_URL}/api/proyectos/${id}`,
        config
      )

      const actualizados = proyectos.filter((proy) => proy._id !== id)
      setProyectos(actualizados)
      navigate("/proyectos")
    } catch (error) {}
  }

  //#################################################//
  //Tareas //
  //################################################//
  const handleModal = () => {
    setModal(!modal)
    setTimeout(() => {
      setTarea({})
    }, 100)
  }
  const handleModalEliminar = (tarea) => {
    setTarea(tarea)
    setModalEliminar(!modalEliminar)
  }

  const submitTarea = async (tarea) => {
    try {
      if (!token) return

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }

      const { data } = await clienteAxios.post(
        `${import.meta.env.VITE_API_URL}/api/tareas`,
        tarea,
        config
      )

      //Acualizar el state del proyecto para que se muestren las ultimas tareas agregadas

      socket.emit("nueva tarea", data)
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.msg,
        error: true,
      })
      setTimeout(() => {
        mostrarAlerta({})
      }, 2000)
    }
  }

  const eliminarTarea = async (id) => {
    try {
      if (!token) return
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await clienteAxios.delete(
        `${import.meta.env.VITE_API_URL}/api/tareas/${id}`,
        config
      )

      socket.emit("eliminar tarea", data)
      setModalEliminar(false)
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.msg,
        error: true,
      })

      setTimeout(() => {
        mostrarAlerta({})
        setModalEliminar(false)
      }, 2000)
    }
  }
  const modalEditarTarea = async (tarea) => {
    setTarea(tarea)
    setModal(true)
  }
  const submitEditarTarea = async (tarea) => {
    try {
      if (!token) return

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await clienteAxios.put(
        `${import.meta.env.VITE_API_URL}/api/tareas/${tarea.id}`,
        tarea,
        config
      )
      socket.emit("editar tarea", data)
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.msg,
        error: true,
      })
      setTimeout(() => {
        mostrarAlerta({})
      }, 2000)
    }
  }
  const cambiarEstadoTarea = async (tarea) => {
    try {
      if (!token) return

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }

      const { data } = await clienteAxios(
        `${import.meta.env.VITE_API_URL}/api/tareas/estado/${tarea._id}`,
        config
      )

      socket.emit("cambiar estado", data)
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      })
      setOpenAlerta(true)
      setTimeout(() => {
        setOpenAlerta(false)
      }, 3000)
      setTimeout(() => {
        setAlerta({})
      }, 3100)
    }
  }

  //######################################################################
  // Colaboradores
  //########################################################################

  let configuracion
  if (token) {
    configuracion = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  }
  const buscarColaborador = async (email) => {
    try {
      if (!token) return

      const { data } = await clienteAxios.post(
        `${import.meta.env.VITE_API_URL}/api/proyectos/colaboradores`,
        { email },
        configuracion
      )
      setColaborador(data)
      mostrarAlerta({})
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.msg,
        error: true,
      })
      setColaborador({})
      setTimeout(() => {
        mostrarAlerta({})
      }, 3000)
    }
  }
  const agregarColaborador = async (email) => {
    try {
      if (!token) return
      const { data } = await clienteAxios.post(
        `${import.meta.env.VITE_API_URL}/api/proyectos/colaboradores/${
          proyecto._id
        }`,
        { email },
        configuracion
      )
      mostrarAlerta({ msg: data.msg })
      setTimeout(() => {
        mostrarAlerta({})
        setColaborador({})
      }, 3000)
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.msg,
        error: true,
      })
      setTimeout(() => {
        mostrarAlerta({})
      }, 3000)
    }
  }
  const eliminarColaborador = async () => {
    try {
      if (!token) return

      const { data } = await clienteAxios.post(
        `${import.meta.env.VITE_API_URL}/api/proyectos/colaboradores-eliminar/${
          proyecto._id
        }`,
        { colaborador },
        configuracion
      )

      mostrarAlerta({
        msg: data.msg,
      })
      const proyectoActualizado = { ...proyecto }
      proyectoActualizado.colaboradores = proyecto.colaboradores.filter(
        (col) => col._id !== colaborador._id
      )
      setProyecto(proyectoActualizado)
      setTimeout(() => {
        mostrarAlerta({})
        setColaborador({})
        setModalEliminarColaborador(false)
      }, 1000)
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.msg,
        error: true,
      })
      setTimeout(() => {
        mostrarAlerta({})
        setModalEliminarColaborador(false)
      }, 2000)
    }
  }

  const handleModalEliminarColaborador = (colaborador) => {
    setModalEliminarColaborador(!modalEliminarColaborador)
    setColaborador(colaborador)
  }

  //! Socket IO

  const socketAgregarTarea = (tarea) => {
    const proyectoActualizado = { ...proyecto }
    proyectoActualizado.tareas = [...proyecto.tareas, tarea]
    setProyecto(proyectoActualizado)
  }

  const socketEditarTarea = (tarea) => {
    const proyectoActualizado = { ...proyecto }
    const tareasProyactualizadas = proyecto.tareas.map((tar) =>
      tar._id === tarea._id ? tarea : tar
    )
    proyectoActualizado.tareas = tareasProyactualizadas
    setProyecto(proyectoActualizado)
  }

  const socketEliminarTarea = (tarea) => {
    const proyectoActualizado = { ...proyecto }
    const tareasProyactualizadas = proyecto.tareas.filter(
      (tar) => tar._id !== tarea._id
    )
    proyectoActualizado.tareas = tareasProyactualizadas
    setProyecto(proyectoActualizado)
  }

  const socketCambiarEstado = (tarea) => {
    const proyectoActualizado = { ...proyecto }
    const tareasProyactualizadas = proyecto.tareas.map((tar) =>
      tar._id === tarea._id ? tarea : tar
    )
    proyectoActualizado.tareas = tareasProyactualizadas
    setProyecto(proyectoActualizado)
  }

  //Buscar Proyectos

  const handleModalBuscar = () => {
    setModalBuscar(!modalBuscar)
  }

  const cerrarSessionStates = () => {
    setAlerta({})
    setBusqueda("")
    setProyecto({})
    setProyectos([])
    setTarea({})
  }

  return (
    <ProyectosContext.Provider
      value={{
        proyecto,
        proyectos,
        alerta,
        cargando,
        mostrarAlerta,
        submitProyecto,
        updateProyecto,
        obtenerProyecto,
        eliminarProyecto,
        modal,
        handleModal,
        modalEliminar,
        handleModalEliminar,
        submitTarea,
        eliminarTarea,
        modalEditarTarea,
        submitEditarTarea,
        cambiarEstadoTarea,
        tarea,
        buscarColaborador,
        agregarColaborador,
        eliminarColaborador,
        colaborador,
        setColaborador,
        modalEliminarColaborador,
        handleModalEliminarColaborador,
        openAlerta,
        busqueda,
        setBusqueda,
        socketAgregarTarea,
        socketEditarTarea,
        socketEliminarTarea,
        socketCambiarEstado,
        modalBuscar,
        handleModalBuscar,
        cerrarSessionStates,
      }}
    >
      {children}
    </ProyectosContext.Provider>
  )
}

export { ProyectosProvider }

export default ProyectosContext
