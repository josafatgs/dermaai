export interface ClassificationResponse {
    predicted_class: string;
    probabilities: {
      [key: string]: number;
    };
    // Si el endpoint devuelve campos adicionales, agrégales aquí
  }