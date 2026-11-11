import './singlevid.css';

export default function SingleVid(props) {
  return (
    <iframe
      className='singleVideo'
      id='player'
      type='text/html'
      src={props.src}
      frameBorder='0'></iframe>
  );
}
