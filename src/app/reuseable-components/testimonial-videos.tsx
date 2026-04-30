import {
  CSSProperties,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import videos from "../assests/videos";
import svgPaths from "../components/svgpath";
import InertiaHover from "./inertia-hover";

type VideoItem = {
  id: number;
  src: string;
  label: string;
};

type RectLike = {
  left: number;
  top: number;
  width: number;
  height: number;
};

const VIDEO_ITEMS: VideoItem[] = [
  { id: 1, src: videos.catVideo, label: "Cat testimonial" },
  { id: 2, src: videos.vet, label: "Vet testimonial" },
  { id: 3, src: videos.bigVideo, label: "Pet story" },
];

function SpeakerIcon() {
  return (
    <div
      className="absolute left-[11px] top-[11px] size-[24px]"
      data-name="fluent:speaker-2-20-filled"
    >
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="fluent:speaker-2-20-filled">
          <path
            d={svgPaths.p2109bbf0}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function ExpandIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 3H3v5" />
      <path d="M16 3h5v5" />
      <path d="M8 21H3v-5" />
      <path d="M16 21h5v-5" />
      <path d="M3 3l7 7" />
      <path d="M21 3l-7 7" />
      <path d="M3 21l7-7" />
      <path d="M21 21l-7-7" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

function TestimonialVideoCard({
  video,
  label,
  onOpen,
  className = "",
}: {
  video: string;
  label: string;
  onOpen: (rect: RectLike) => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        onOpen({
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
        });
      }}
      aria-label={`Open ${label}`}
      className={`group relative block shrink-0 overflow-hidden text-left outline-none aspect-[324.62/513.141] ${className}`}
    >
      <video
        src={video}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-90" />

      <div className="absolute bottom-3 right-3 flex items-center gap-2">
        <div className="relative size-[46px] overflow-hidden rounded-full bg-[rgba(0,0,0,0.39)] backdrop-blur-md">
          <SpeakerIcon />
        </div>

        <div className="flex items-center gap-2 bg-white/12 px-3 py-2 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-white/20">
          <ExpandIcon />
          <span className="text-xs font-medium tracking-wide">Watch</span>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border-8 border-solid border-white"
      />
    </button>
  );
}

export default function TestimonialImageStack() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const originRectRef = useRef<RectLike | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  const getModalTransformFromOrigin = () => {
    const modalEl = modalRef.current;
    const originRect = originRectRef.current;

    if (!modalEl || !originRect) {
      return { x: 0, y: 0, scaleX: 1, scaleY: 1 };
    }

    const modalRect = modalEl.getBoundingClientRect();

    const originCenterX = originRect.left + originRect.width / 2;
    const originCenterY = originRect.top + originRect.height / 2;
    const modalCenterX = modalRect.left + modalRect.width / 2;
    const modalCenterY = modalRect.top + modalRect.height / 2;

    return {
      x: originCenterX - modalCenterX,
      y: originCenterY - modalCenterY,
      scaleX: originRect.width / modalRect.width,
      scaleY: originRect.height / modalRect.height,
    };
  };

  const openVideo = (item: VideoItem, rect: RectLike) => {
    originRectRef.current = rect;
    setSelectedVideo(item);
  };

  const closeVideo = () => {
    if (!selectedVideo || !overlayRef.current || !modalRef.current) {
      setSelectedVideo(null);
      return;
    }

    const overlayEl = overlayRef.current;
    const modalEl = modalRef.current;
    const videoEl = modalVideoRef.current;
    const { x, y, scaleX, scaleY } = getModalTransformFromOrigin();

    animationRef.current?.kill();

    const tl = gsap.timeline({
      onComplete: () => {
        setSelectedVideo(null);
      },
    });

    tl.to(
      videoEl,
      {
        scale: 1.04,
        duration: 0.22,
        ease: "power2.inOut",
      },
      0
    )
      .to(
        modalEl,
        {
          x,
          y,
          scaleX,
          scaleY,
          opacity: 0.78,
          duration: 0.42,
          ease: "power3.inOut",
        },
        0
      )
      .to(
        overlayEl,
        {
          opacity: 0,
          duration: 0.24,
          ease: "power2.out",
        },
        0
      );

    animationRef.current = tl;
  };

  useLayoutEffect(() => {
    if (!selectedVideo || !overlayRef.current || !modalRef.current) return;

    const overlayEl = overlayRef.current;
    const modalEl = modalRef.current;
    const videoEl = modalVideoRef.current;
    const { x, y, scaleX, scaleY } = getModalTransformFromOrigin();

    animationRef.current?.kill();

    gsap.set(overlayEl, { opacity: 0 });
    gsap.set(modalEl, {
      x,
      y,
      scaleX,
      scaleY,
      opacity: 0.88,
      transformOrigin: "center center",
      willChange: "transform, opacity",
    });
    gsap.set(videoEl, {
      scale: 1.08,
      willChange: "transform",
    });

    const tl = gsap.timeline();

    tl.to(
      overlayEl,
      {
        opacity: 1,
        duration: 0.26,
        ease: "power2.out",
      },
      0
    )
      .to(
        modalEl,
        {
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          opacity: 1,
          duration: 0.58,
          ease: "power3.out",
        },
        0
      )
      .to(
        videoEl,
        {
          scale: 1,
          duration: 0.62,
          ease: "power3.out",
        },
        0
      );

    animationRef.current = tl;

    return () => {
      animationRef.current?.kill();
    };
  }, [selectedVideo]);

  useEffect(() => {
    if (!selectedVideo) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeVideo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedVideo]);

  return (
    <>
      <div className="relative hidden h-[593px] w-[785px] shrink-0 overflow-visible md:block">
        <div
          className="absolute left-[-112.53px] top-[-10.97px] flex h-[593.315px] w-[480.816px] items-center justify-center"
          style={
            {
              "--transform-inner-width": "1185",
              "--transform-inner-height": "43",
            } as CSSProperties
          }
        >
          <InertiaHover strength={12} rotation={1} resistance={800}>
            <div className="flex-none lg:rotate-[-20.04deg]">
              <TestimonialVideoCard
                video={VIDEO_ITEMS[0].src}
                label={VIDEO_ITEMS[0].label}
                onOpen={(rect) => openVideo(VIDEO_ITEMS[0], rect)}
                className="w-[324.62px]"
              />
            </div>
          </InertiaHover>
        </div>

        <div
          className="absolute left-[177.02px] top-[5.57px] flex h-[547.657px] w-[382.535px] items-center justify-center"
          style={
            {
              "--transform-inner-width": "1185",
              "--transform-inner-height": "43",
            } as CSSProperties
          }
        >
          <InertiaHover strength={12} rotation={1} resistance={800}>
            <div className="flex-none lg:rotate-[-6.73deg]">
              <TestimonialVideoCard
                video={VIDEO_ITEMS[1].src}
                label={VIDEO_ITEMS[1].label}
                onOpen={(rect) => openVideo(VIDEO_ITEMS[1], rect)}
                className="w-[324.62px]"
              />
            </div>
          </InertiaHover>
        </div>

        <div className="absolute left-[460.47px] top-[40.09px] h-[513.141px] w-[324.62px]">
          <InertiaHover strength={12} rotation={1} resistance={800}>
            <div className="flex-none">
              <TestimonialVideoCard
                video={VIDEO_ITEMS[2].src}
                label={VIDEO_ITEMS[2].label}
                onOpen={(rect) => openVideo(VIDEO_ITEMS[2], rect)}
                className="w-[324.62px]"
              />
            </div>
          </InertiaHover>
        </div>
      </div>

      <div className="w-full py-4 md:hidden">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[10vw] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {VIDEO_ITEMS.map((item, index) => {
          

            return (
              <div key={item.id} className="snap-center shrink-0">
                <InertiaHover strength={6} rotation={0} resistance={800}>
                  <div>
                    <TestimonialVideoCard
                      video={item.src}
                      label={item.label}
                      onOpen={(rect) => openVideo(item, rect)}
                      className="w-[78vw] max-w-[320px]"
                    />
                  </div>
                </InertiaHover>
              </div>
            );
          })}
        </div>
      </div>

      {selectedVideo && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-[10px]"
          onClick={closeVideo}
        >
          <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
            <div
              ref={modalRef}
              onClick={(event) => event.stopPropagation()}
              className="relative aspect-video w-full max-w-[1100px] overflow-hidden rounded-[30px] bg-black shadow-[0_30px_120px_rgba(0,0,0,0.55)]"
            >
              <video
                ref={modalVideoRef}
                key={selectedVideo.id}
                src={selectedVideo.src}
                className="h-full w-full object-cover"
                controls
                autoPlay
                playsInline
                preload="auto"
              />

              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/45 to-transparent" />

              <button
                type="button"
                aria-label="Close preview"
                onClick={closeVideo}
                className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-white/12 text-white backdrop-blur-md transition-transform duration-300 hover:scale-105 hover:bg-white/20"
              >
                <CloseIcon />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}