import React, { ReactNode, useRef } from "react";

type ReusableCarouselProps = {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
  cardWrapperClassName?: string;
  buttonClassName?: string;
  cardWidth?: number;
  maxWidthClassName?: string;
};

export default function ReusableCarousel({
  children,
  className = "",
  trackClassName = "",
  cardWrapperClassName = "",
  buttonClassName = "",
  cardWidth = 300,
  maxWidthClassName = "max-w-sm",
}: ReusableCarouselProps) {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const scrollByCard = (direction: "prev" | "next") => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction === "next" ? cardWidth : -cardWidth,
      behavior: "smooth",
    });
  };

  const items = React.Children.toArray(children);

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`mx-auto mb-4 flex w-full ${maxWidthClassName} items-center justify-end gap-3`}
      >
        <button
          type="button"
          onClick={() => scrollByCard("prev")}
          className={`flex h-10 w-10 items-center justify-center rounded-full ${buttonClassName}`}
        >
          ←
        </button>

        <button
          type="button"
          onClick={() => scrollByCard("next")}
          className={`flex h-10 w-10 items-center justify-center rounded-full ${buttonClassName}`}
        >
          →
        </button>
      </div>

      <div
        ref={sliderRef}
        className={`mx-auto flex w-full ${maxWidthClassName} snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${trackClassName}`}
      >
        {items.map((child, index) => (
          <div
            key={index}
            className={`snap-center shrink-0 ${cardWrapperClassName}`}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}