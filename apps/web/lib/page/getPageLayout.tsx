export function getPageLayout(sections: unknown) {
  if (!Array.isArray(sections)) {
    return {
      hasHeroSection: false,
      excludeGallerySections: [],
      gallerySections: [],
    };
  }
  const hasHeroSection = sections.some((s) => s._type === "heroSection");
  const excludeGallerySections = sections.filter(
    (s) => s._type !== "gallerySection",
  );
  const gallerySections = sections.filter((s) => s._type === "gallerySection");

  return {
    hasHeroSection,
    excludeGallerySections,
    gallerySections,
  };
}
