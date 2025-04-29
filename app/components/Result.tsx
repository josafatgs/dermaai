import { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { ClassificationResult } from "~/types/ClassificationResult";
import data from '../utils/data.json';
import "../styles/result.css";


interface LesionDescription {
  title: string;
  description: string;
  characteristics: string[];
}

const Result = ({ classificationResult, originalImage, base64Image }: { classificationResult: ClassificationResult; originalImage: string, base64Image: string }) => {
  const [predictedLesion, setPredictedLesion] = useState<string | null>(null);
  

  const saveToHistory = (classificationResult, file, file64Base) => {
    try {
      // Get current history or initialize empty array
      const history = JSON.parse(localStorage.getItem('classificationHistory')) || [];
      
      // Create new entry in your desired format
      const newEntry = {
        imageUrl: file64Base, // or file.url if already uploaded
        fileName: file.name,
        fileSize: file.size,
        timestamp: Date.now(),
        results: classificationResult // Assuming classificationResult has your scores
      };
      
      // Add to beginning of array (newest first)
      const updatedHistory = [newEntry, ...history].slice(0, 50); // Keep last 50 entries
      
      // Save back to localStorage
      localStorage.setItem('classificationHistory', JSON.stringify(updatedHistory));
      
      return updatedHistory;
    } catch (error) {
      console.error('Error saving to history:', error);
      return null;
    }
  };

  const [lesionDescription, setLesionDescription] = useState<LesionDescription | null>(null);

  useEffect(() => {



    if (classificationResult) {
      if (classificationResult.predictedClass === "Ampolla") {
        setLesionDescription(data.ampolla);
        setPredictedLesion("Ampolla");

      } else if (classificationResult.predictedClass === "Mancha") {
        setLesionDescription(data.mancha);
        setPredictedLesion("Mancha");
      } else if (classificationResult.predictedClass === "Pustula") {
        setLesionDescription(data.pustula);
        setPredictedLesion("Pustula");
      } else if (classificationResult.predictedClass === "Roncha") {
        setLesionDescription(data.roncha);
        setPredictedLesion("Roncha");
      }

      const clasRes = { 
        "Mancha": classificationResult.Mancha,
        "Pustula": classificationResult.Pustula,
        "Roncha": classificationResult.Roncha,
        "Ampolla": classificationResult.Ampolla
      }

      saveToHistory(clasRes, originalImage, base64Image);
    }
  }, [classificationResult]);

  const similarImages = Array.from({length: 4}, (_, i) => ({
    id: i + 1,
    url: `/${classificationResult.predictedClass.toLowerCase()}/${classificationResult.predictedClass.toLowerCase()}${i + 1}.jpg`,
    description: `Caso ${i + 1} de ${classificationResult.predictedClass}`
  }));
  
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => prev === similarImages.length - 1 ? 0 : prev + 1);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => prev === 0 ? similarImages.length - 1 : prev - 1);
  };

  return (
    <div className={"container result-cont"}>
      {/* Sección de clasificación */}
      <div className={"classificationSection"}>

		<div className={"predictedClass"}>
          <h3>
            Clase Predicha: <strong>{predictedLesion}</strong>
          </h3>
        </div>

        <div className={"resultsGrid"}>
          <div className={"resultItem"}>
            <h3 className={"resultItemTitle"}>Mancha</h3>
            <div className={"resultPercentMancha"}>
              {classificationResult.Mancha}%
            </div>
          </div>

          <div className={"resultItem"}>
            <h3 className={"resultItemTitle"}>Pústula</h3>
            <div className={"resultPercentPustula"}>
              {classificationResult.Pustula}%
            </div>
          </div>

          <div className={"resultItem"}>
            <h3 className={"resultItemTitle"}>Roncha</h3>
            <div className={"resultPercentRoncha"}>
              {classificationResult.Roncha}%
            </div>
          </div>

          <div className={"resultItem"}>
            <h3 className={"resultItemTitle"}>Ampolla</h3>
            <div className={"resultPercentAmpolla"}>
              {classificationResult.Ampolla}%
            </div>
          </div>
        </div>

        
      </div>

      {/* Sección de imagen y descripción */}
      <div className={"imageDescriptionSection"}>
        <div className={"imageContainer"}>
          <img
            src={originalImage}
            alt="Lesión clasificada"
            className={originalImage}
          />
        </div>

        <div className={"descriptionContainer"}>
          <h3 className={"descriptionTitle"}>
            {lesionDescription?.title}
          </h3>
          <p className={"description"}>
            {lesionDescription?.description}
          </p>

          <h4 className={"characteristicsTitle"}>
            Características principales:
          </h4>
          <ul className={"characteristicsList"}>
            {lesionDescription?.characteristics.map((item: string, index: number) => (
              <li key={index} className={"characteristicsItem"}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Slider de imágenes similares */}
      <div className={"similarCasesSection"}>
        <h3 className={"similarCasesTitle"}>
          Casos similares
        </h3>

        <div className={"sliderContainer"}>
          <div className={"sliderTrack"}>
            {similarImages.map((image, index) => (
              <div
                key={image.id}
                className={`${"sliderItem"} ${index === currentSlide ? "active" : ''}`}
              >
                <img
                  src={image.url}
                  alt={`Caso similar ${image.id}`}
                  className={"similarImage"}
                />
                <div className={"similarImageCaption"}>
                  <p>{image.description}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={prevSlide}
            className={`${"sliderButton"} ${"prevButton"}`}
            aria-label="Previous slide"
          >
            <MdChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className={`${"sliderButton"} ${"nextButton"}`}
            aria-label="Next slide"
          >
            <MdChevronRight size={24} />
          </button>
        </div>

        
      </div>
    </div>
  );

};

export default Result;