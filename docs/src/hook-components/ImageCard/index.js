import ProgressiveImage from 'react-progressive-image';
import Loading from '../Loading';
import './style.css';

function ImageCard(props) {
  const { src, title, alt = "image" } = props;

  const renderPlaceholder = () => {
    return (
      <div style={{
        height: 300,
        backgroundColor: '#cecece'
      }}>
        <Loading />
      </div>
    )
  }

  return (
    <div className="col-12 col-sm-6 col-md-4">
 <div className=" d-flex flex-column  ">
        <ProgressiveImage
          delay={1000}
          src={src}
        >
          {(src, loading) => {
            return loading ? renderPlaceholder() : <img className="img-card"src={src} alt={alt} />
          }}
        </ProgressiveImage>
        <div>{title}</div>
      </div>
    </div>
     
  )

}

export default ImageCard;
