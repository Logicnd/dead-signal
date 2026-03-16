type SourceMarkersProps = {
  clues: readonly string[];
};

export function SourceMarkers({ clues }: SourceMarkersProps) {
  return (
    <div
      aria-hidden="true"
      className="hidden"
      dangerouslySetInnerHTML={{
        __html: clues.map((clue) => `<!-- ${clue} -->`).join(""),
      }}
    />
  );
}
