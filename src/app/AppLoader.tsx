import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import ScatteredPawPrints from "./components/loading-screen/LoadingScreen";
import images from "./assests/images";


type AppLoaderProps = {
  progress: number;
};

export default function AppLoader({ progress }: AppLoaderProps) {
  return (
    <div className="fixed inset-0 z-[100000]">
      <ScatteredPawPrints
        pawImageSrc={images.whitePawPrint}
        minHeight="100svh"
        className="z-[10000]"
      >
        <section className="flex min-h-screen w-full flex-col items-center justify-center px-6">
          <DotLottieReact
            src="https://lottie.host/3ae7265d-fe3a-4205-b5fb-6a1a2d018022/WdYo5uq6UD.lottie"
            loop
            autoplay
            speed={0.75}
            className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[500px]"
          />

          <div className="flex w-full max-w-[420px] flex-col items-center gap-5">
            <div className="h-3 w-full overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-[#D6EBAE] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <span className="text-sm font-semibold tracking-[0.12em] text-white">
              {Math.round(progress)}%
            </span>
          </div>
        </section>
      </ScatteredPawPrints>
    </div>
  );
}