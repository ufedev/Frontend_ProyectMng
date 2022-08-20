const Spinner = () => {
  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Spinner
