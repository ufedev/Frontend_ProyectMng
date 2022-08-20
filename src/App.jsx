import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthProvider"
import { ProyectosProvider } from "./context/ProyectosProvider"
import AuthLayout from "./layout/AuthLayout"
import RutasProtegidas from "./layout/RutasProtegidas"
import Registro from "./paginas/Registro"
import OlvidePassword from "./paginas/OlvidePassword"
import CambiarPassword from "./paginas/CambiarPassword"
import Login from "./paginas/Login"
import ConfirmarCuenta from "./paginas/ConfirmarCuenta"
import Proyectos from "./paginas/Proyectos"
import NuevoProyecto from "./paginas/NuevoProyecto"
import Proyecto from "./paginas/Proyecto"
import EditarProyecto from "./paginas/EditarProyecto"
import NuevoColaborador from "./paginas/NuevoColaborador"
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProyectosProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registro" element={<Registro />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route
                path="olvide-password/:token"
                element={<CambiarPassword />}
              />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>

            <Route path="/proyectos" element={<RutasProtegidas />}>
              <Route index element={<Proyectos />} />
              <Route path="nuevo-proyecto" element={<NuevoProyecto />} />
              <Route path=":id" element={<Proyecto />} />
              <Route path="editar/:id" element={<EditarProyecto />} />
              <Route
                path="nuevo-colaborador/:id"
                element={<NuevoColaborador />}
              />
            </Route>
          </Routes>
        </ProyectosProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
