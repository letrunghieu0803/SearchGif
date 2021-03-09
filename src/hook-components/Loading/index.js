import './style.css';

function Loading() {
  return (
    <div className="w-100 d-flex justify-content-center">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loading;