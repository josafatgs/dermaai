// components/FeedbackModal.tsx
import { useState } from "react";

type FeedbackModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: {
    satisfaction: number | null;
    correctClassification: string | null;
    actualClassification: string | null;
  }) => void;
};

export default function FeedbackModal({ isOpen, onClose, onSubmit }: FeedbackModalProps) {
  const [satisfaction, setSatisfaction] = useState<number | null>(null);
  const [correctClassification, setCorrectClassification] = useState<string | null>(null);
  const [actualClassification, setActualClassification] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    onSubmit({
      satisfaction,
      correctClassification,
      actualClassification
    });
    setSubmitted(true);
    setTimeout(onClose, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl dark:bg-gray-800 p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4">¡Gracias por tu feedback!</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Tu opinión nos ayuda a mejorar.</p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">¿Cómo calificarías tu experiencia?</h3>
            
            {/* Pregunta 1: Satisfacción */}
            <div className="mb-8">
              <p className="text-gray-700 dark:text-gray-300 mb-4">¿Qué tan fácil fue usar la aplicación?</p>
              <div className="flex justify-between">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => setSatisfaction(num)}
                    className={`flex flex-col items-center p-2 rounded-full ${satisfaction === num ? 'bg-blue-100 dark:bg-blue-900' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                  >
                    <span className="text-2xl">
                      {num === 1 && '😠'}
                      {num === 2 && '😞'}
                      {num === 3 && '😐'}
                      {num === 4 && '😊'}
                      {num === 5 && '😍'}
                    </span>
                    <span className="text-xs mt-1">{num}</span>
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Muy difícil</span>
                <span>Muy fácil</span>
              </div>
            </div>

            {/* Pregunta 2: Clasificación correcta */}
            <div className="mb-6">
              <p className="text-gray-700 dark:text-gray-300 mb-4">¿La clasificación que recibiste era correcta?</p>
              <div className="flex space-x-2 mb-4">
                <button
                  onClick={() => setCorrectClassification('yes')}
                  className={`px-4 py-2 rounded ${correctClassification === 'yes' ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                >
                  Sí
                </button>
                <button
                  onClick={() => setCorrectClassification('no')}
                  className={`px-4 py-2 rounded ${correctClassification === 'no' ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                >
                  No
                </button>
              </div>

              {correctClassification === 'no' && (
                <div>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">¿Cuál sería la clasificación correcta?</p>
                  <div className="grid grid-cols-2 gap-2">
                    {['Mancha', 'Pústula', 'Roncha', 'Ampolla'].map((item) => (
                      <button
                        key={item}
                        onClick={() => setActualClassification(item)}
                        className={`p-2 rounded ${actualClassification === item ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={satisfaction === null || correctClassification === null || (correctClassification === 'no' && actualClassification === null)}
              className={`w-full py-2 px-4 rounded-md text-white ${(satisfaction === null || correctClassification === null || (correctClassification === 'no' && actualClassification === null)) ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#3A7BD5] hover:bg-[#2a6bc4]'}`}
            >
              Enviar Feedback
            </button>
          </>
        )}
      </div>
    </div>
  );
}