import { gsap } from "@/lib/gsap";

const isTouchDevice = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

export const initWorkGridHover = () => {
  if (isTouchDevice()) return;

  const items = gsap.utils.toArray<HTMLElement>(".work-grid-item");
  const previews = gsap.utils.toArray<HTMLElement>(".work-grid-preview");
  const cursor = document.querySelector<HTMLElement>(".view-cursor");

  if (!items.length || !cursor) return;

  /*
   * --------------------------------
   * INITIAL CURSOR
   * --------------------------------
   */

  gsap.set(cursor, {
    opacity: 0,
    scale: 0.5,
    xPercent: -50,
    yPercent: -50,
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 9999,
    pointerEvents: "none",
  });

  /*
   * --------------------------------
   * INITIAL PREVIEWS
   * --------------------------------
   */

  gsap.set(previews, {
    opacity: 0,
    scale: 0.92,
    xPercent: -50,
    yPercent: -50,
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 9998,
    pointerEvents: "none",
    transformOrigin: "center center",
  });

  /*
   * --------------------------------
   * CURSOR FOLLOW
   * --------------------------------
   */

  const xToCursor = gsap.quickTo(cursor, "x", {
    duration: 0.25,
    ease: "power3.out",
  });

  const yToCursor = gsap.quickTo(cursor, "y", {
    duration: 0.25,
    ease: "power3.out",
  });

  const cleanups: (() => void)[] = [];

  /*
   * --------------------------------
   * EACH PROJECT
   * --------------------------------
   */

  items.forEach((item, index) => {
    const preview = previews[index];

    if (!preview) return;

    const previewImage = preview.querySelector<HTMLElement>(
      ".work-grid-preview-image",
    );

    if (!previewImage) return;

    /*
     * EVEN:
     *   top → bottom
     *
     * ODD:
     *   bottom → top
     */

    const fromTop = index % 2 === 0;

    /*
     * --------------------------------
     * IMAGE INITIAL POSITION
     * --------------------------------
     */

    gsap.set(previewImage, {
      xPercent: 0,
      yPercent: fromTop ? -100 : 100,
    });

    /*
     * --------------------------------
     * PREVIEW ENTER
     * --------------------------------
     */

    const showPreview = gsap.to(preview, {
      opacity: 1,
      scale: 1,
      duration: 0.35,
      ease: "power3.out",
      paused: true,
    });

    /*
     * --------------------------------
     * PREVIEW EXIT
     * --------------------------------
     */

    const hidePreview = gsap.to(preview, {
      opacity: 0,
      scale: 0.92,
      duration: 0.25,
      ease: "power3.inOut",
      paused: true,
    });

    /*
     * --------------------------------
     * IMAGE ENTER
     * --------------------------------
     */

    const showImage = gsap.to(previewImage, {
      yPercent: 0,
      duration: 0.7,
      ease: "power4.out",
      paused: true,
    });

    /*
     * --------------------------------
     * IMAGE EXIT
     * --------------------------------
     */

    const hideImage = gsap.to(previewImage, {
      yPercent: fromTop ? 100 : -100,
      duration: 0.55,
      ease: "power3.inOut",
      paused: true,
    });

    /*
     * --------------------------------
     * CURSOR ENTER
     * --------------------------------
     */

    const showCursor = gsap.to(cursor, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "power3.out",
      paused: true,
    });

    /*
     * --------------------------------
     * CURSOR EXIT
     * --------------------------------
     */

    const hideCursor = gsap.to(cursor, {
      opacity: 0,
      scale: 0.5,
      duration: 0.25,
      ease: "power3.inOut",
      paused: true,
    });

    /*
     * --------------------------------
     * PREVIEW FOLLOW
     * --------------------------------
     */

    const xToPreview = gsap.quickTo(preview, "x", {
      duration: 0.45,
      ease: "power3.out",
    });

    const yToPreview = gsap.quickTo(preview, "y", {
      duration: 0.45,
      ease: "power3.out",
    });

    /*
     * --------------------------------
     * ENTER
     * --------------------------------
     */

    const handleEnter = (event: MouseEvent) => {
      const { clientX, clientY } = event;

      // Reset image to its correct starting side.
      gsap.set(previewImage, {
        yPercent: fromTop ? -100 : 100,
      });

      // Put preview and cursor directly under pointer.
      gsap.set(preview, {
        x: clientX,
        y: clientY,
      });

      gsap.set(cursor, {
        x: clientX,
        y: clientY,
      });

      // Stop opposite animations.
      hidePreview.pause();
      hideCursor.pause();
      hideImage.pause();

      // Play enter animations.
      showPreview.restart();
      showCursor.restart();
      showImage.restart();
    };

    /*
     * --------------------------------
     * MOVE
     * --------------------------------
     */

    const handleMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;

      xToPreview(clientX);
      yToPreview(clientY);

      xToCursor(clientX);
      yToCursor(clientY);
    };

    /*
     * --------------------------------
     * LEAVE
     * --------------------------------
     */

    const handleLeave = () => {
      showPreview.pause();
      showCursor.pause();
      showImage.pause();

      hideImage.restart();
      hidePreview.restart();
      hideCursor.restart();
    };

    item.addEventListener("mouseenter", handleEnter);
    item.addEventListener("mousemove", handleMove);
    item.addEventListener("mouseleave", handleLeave);

    cleanups.push(() => {
      item.removeEventListener("mouseenter", handleEnter);
      item.removeEventListener("mousemove", handleMove);
      item.removeEventListener("mouseleave", handleLeave);

      showPreview.kill();
      hidePreview.kill();

      showImage.kill();
      hideImage.kill();

      showCursor.kill();
      hideCursor.kill();
    });
  });

  /*
   * --------------------------------
   * CLEANUP
   * --------------------------------
   */

  return () => {
    cleanups.forEach((cleanup) => cleanup());

    gsap.killTweensOf(cursor);

    gsap.set(cursor, {
      opacity: 0,
    });

    gsap.killTweensOf(previews);
  };
};
