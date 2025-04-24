// src/types/classification.ts
export interface ClassificationResult {
    Mancha: number;
    Pustula: number;
    Roncha: number;
    Ampolla: number;
    predictedClass: 'Mancha' | 'Pustula' | 'Roncha' | 'Ampolla';
    confidence?: number; // Opcional: nivel de confianza general
    description?: string; // Opcional: descripción adicional
  }