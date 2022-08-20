const Alerta = ({ alerta }) => {
  return (
    <div className="flex justify-center relative">
      <div
        className={`${
          alerta.error ? "from-red-500 to-red-700" : "from-sky-600 to-sky-900"
        } bg-gradient-to-br p-2 mt-10 rounded text-center font-bold text-white uppercase text-sm absolute -top-10 w-full`}
      >
        {alerta.msg}
      </div>
    </div>
  )
}

export default Alerta
