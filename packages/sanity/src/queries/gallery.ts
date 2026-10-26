export const GALLERY_FIELDS = `
{
  _id,
  title,
  description,
  speed,
  images[]{
    _key,
    alt,
    backgroundColor,
    image
  }
}
`.trim();
