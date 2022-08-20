export function formatearFecha(fecha) {
  const numero = fecha?.split("T")[0]
  const spliteado = numero?.split("-")
  const fechaFormateada = new Date(spliteado).toLocaleString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return fechaFormateada
}
