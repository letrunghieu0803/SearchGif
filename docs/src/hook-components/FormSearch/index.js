function FormSearch ({
  keyword,
  submitForm,
  handleChangeKeyword
}) {
  const handleClick = async () => {
    submitForm(keyword);
  }

  const handleChange = (event) => {
    handleChangeKeyword(event.target.value);
  }

  return (
    <div className="d-flex" id="form">
      <input
        value={keyword}
        onChange={handleChange}
        className="form-control"
      />
      <button
        className="btn btn-primary ml-2"
        onClick={handleClick}
      >
        Tìm
      </button>
    </div>
  )
}

export default FormSearch;
