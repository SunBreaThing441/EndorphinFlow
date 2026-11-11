import myVideo from '../landing/video.mov'
export default function Background() {
return (
  <div>

<video id="background-video" muted loop autoPlay>
  
    <source src={myVideo} type="video/mp4" />
    
</video>
</div>
)
}