import gsap from "gsap";

type FadeUpOptions = {
  element: HTMLElement;
  delay?: number;
  duration?: number;
  y?: number;
  trigger?: HTMLElement;
};

export const fadeUp = ({
  element,
  delay = 0,
  duration = 1,
  y = 100,
  trigger,
}: FadeUpOptions) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y,
    },
    {
      opacity: 1,
      y: 0,
      delay,
      duration,
      ease: "power4.out",

      scrollTrigger: trigger
        ? {
            trigger,
            start: "top 80%",
          }
        : undefined,
    },
  );
};
