import PropTypes from "prop-types";
import images from "../assests/images";

export default function TeamCard({
  name,
  role,
  image,
  description,
}) {
  return (
    <div className="relative w-full max-w-[430px] mx-auto pt-[260px]">
      
      {/* User Image */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-full flex justify-center">
        <img
          src={image}
          alt={name}
          className="w-[320px] sm:w-[380px] md:w-[430px] object-contain"
        />
      </div>
 {/* Sticker */}
        <div className="absolute top-50 right-5 z-[10000]">
          <img
            src={images.happySticker}
            alt="badge"
            className="w-[95px] sm:w-[110px] object-contain"
          />
        </div>
      {/* Main Card */}
      <div className="relative overflow-hidden bg-[#f7f7f7] z-[1000] rounded-[18px]  shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-black/10 min-h-[660px]">
        
        {/* Dotted Lines */}
        <div className="absolute inset-0">
          {[...Array(11)].map((_, i) => (
            <div
              key={i}
              className="absolute left-0 w-full border-t border-dotted border-black/35"
              style={{ top: `${80 + i * 90}px` }}
            />
          ))}
        </div>

       

        {/* Content */}
        <div className="relative z-10 px-6 sm:px-8 pt-14  overflow-hidden">
          
          {/* Name */}
          <h2
            className="text-[48px] sm:text-[58px] md:text-[64px] leading-none text-[#013220]"
            style={{
              fontFamily: '"Brush Script MT", cursive',
            }}
          >
            {name}
          </h2>

          {/* Role */}
          <div className="inline-block mt-2 rotate-[-6deg]">
            <span className="bg-[#00A63E] text-white text-[10px] sm:text-[11px] tracking-[2px] uppercase px-4 py-2 rounded-full font-bold">
              {role}
            </span>
          </div>

          {/* Description */}
          <div className="mt-16 space-y-7">
            {description?.map((text, index) => (
              <p
                key={index}
                className="text-[14px] sm:text-[15px] leading-8 text-[#2c2c2c] font-light"
              >
                {text}
              </p>
            ))}
          </div>
        </div>

        {/* Paper Texture */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>
    </div>
  );
}

TeamCard.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.arrayOf(PropTypes.string),
};