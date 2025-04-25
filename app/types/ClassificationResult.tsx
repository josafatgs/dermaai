// src/types/classification.ts
export interface ClassificationResult {
    Mancha: number;
    Pustula: number;
    Roncha: number;
    Ampolla: number;
    predictedClass: string;
  }