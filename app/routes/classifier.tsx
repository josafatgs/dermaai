import FileUpload from "~/components/FileUpload";
import ClasificationHistory from "~/components/ClasificationHistory";
import Result from "~/components/Result";
import { useState } from "react";
import { ClassificationResult } from "~/types/ClassificationResult";
import "../styles/classifier.css";

export default function Classifier() {
  const [results, setResults] = useState<ClassificationResult | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleSetFile = (obj: File | null) => {
    setFile(obj);
  }

  const [base64Image, setBase64Image] = useState<string | null>(null);

  const handleBase64Image = async (img: File) => {
    const base64 = await getBase64Image(img);
    return base64;
  };
  

  const handleSetResults = (results: ClassificationResult) => {
    setResultImage(file ? URL.createObjectURL(file) : null);
    setResults(results);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const base64Image = await handleBase64Image(file);
    setBase64Image(base64Image);

    const formData = new FormData();
    formData.append('image-to-clasify', file);
    
    fetch("http://18.216.51.169:5000/classify", {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Success:", data);
      const classificationResult: ClassificationResult = {
        Mancha: data.probabilities["Mancha"],
        Pustula: data.probabilities["Pustula"],
        Roncha: data.probabilities["Roncha"],
        Ampolla: data.probabilities["Ampolla"],
        predictedClass: data.predicted_class
      };
      handleSetResults(classificationResult);
    })
    .catch(error => {
      console.error('Error classifying image:', error);
      return {
        message: error.message,
        status: error.response?.status || 500
      };
    });
  };

  const clearResults = () => {
    setResults(null);
    setResultImage(null);
    setFile(null);
    setBase64Image(null);
  };


 

  return (
    <div className="classifier-container">
      <header className="classifier-header">
        {/* Logo izquierdo */}
        <div className="header-logo for-desktop">
          <img
            src="/derma-bg-remo.png"
            alt="Dermatoss Logo"
            className="logo-img derma-logo"
          />
        </div>

		<div className="for-mobile">
			<div className="header-logo">
			<img
				src="/derma-bg-remo.png"
				alt="Dermatoss Logo"
				className="logo-img derma-logo"
			/>
			</div>

			<div className="header-logo">
			<img
				src="/Logo_del_ITESM.svg"
				alt="ITESM Logo"
				className="logo-img itesm-logo"
			/>
			</div>
			
		</div>

        {/* Mensaje educativo */}
        <div className="educational-message">
          <span className="message-text">
            <span className="message-highlight">Herramienta educativa</span> - Para uso académico e investigación
          </span>
        </div>

        {/* Logo derecho */}
        <div className="header-logo for-desktop">
          <img
            src="/Logo_del_ITESM.svg"
            alt="ITESM Logo"
            className="logo-img itesm-logo"
          />
        </div>
      </header>

      <main className={`classifier-content ${results ? "dlt-m-p": ""}`}>
        <div className={`results-section ${results ? "dlt-m-p": ""} `}>
          {results ? (
            <>
              <Result
                classificationResult={results}
                originalImage={resultImage || ""}
                base64Image={base64Image || ""}
              />
              <button
                className="cta-button" style={{ margin: "20px"}}
                onClick={clearResults}
              >
                Clasificar otra imagen
              </button>
            </>
          ) : (
            <FileUpload 
              handleSubmit={handleSubmit}
              handleSetFile={handleSetFile} 
            />
          )}
        </div>
        <div className="history-section">
          <ClasificationHistory />
        </div>
      </main>
    </div>
  );

  function getBase64Image(img: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.onload = () => {
          const canvas: HTMLCanvasElement = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;

          const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
          ctx?.drawImage(image, 0, 0);

          const dataURL: string = canvas.toDataURL("image/png");
          resolve(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
        };
        image.onerror = reject;
        image.src = reader.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(img);
    });
  }
}