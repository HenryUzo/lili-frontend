
import videos from '../assests/videos'

const DogCatVideo = () => {
  return (
<section className="relative z-10 h-screen w-full overflow-hidden bg-[#f1ffeb]">
  <video
    className="absolute inset-0 h-full w-full object-cover object-center"
    autoPlay
    muted
    loop
    playsInline
  >
    <source src={videos.catDogVideo} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</section>
  )
}

export default DogCatVideo