export default function Head() {
  return (
    <>
      {/* Preload above-the-fold project thumbnails */}
      <link rel="preload" as="video" href="/projects/persona.thumb.mp4" type="video/mp4" />
      <link rel="preload" as="image" href="/projects/persona.poster.jpg" />
      <link rel="preload" as="video" href="/projects/greenlens.thumb.mp4" type="video/mp4" />
      <link rel="preload" as="image" href="/projects/greenlens.poster.jpg" />
    </>
  );
}
