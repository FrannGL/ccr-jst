interface SucesoReseñaProps {
  reseña: string;
}

export function SucesoReseña({ reseña }: SucesoReseñaProps) {
  return (
    <div className="bg-white rounded-lg border p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Reseña</h3>
      <p className="text-gray-700 leading-relaxed">{reseña}</p>
    </div>
  );
}
