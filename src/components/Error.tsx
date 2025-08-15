const Error = ({message}: {message?: string}) => {
  return (
    <div>
        <p>{message || "Ocorreu um erro"}</p>
    </div>
  )
}

export default Error