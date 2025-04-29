import { useEffect, useState } from "react";
import { MdClose, MdInfo } from "react-icons/md";
import "../styles/clasificationHistory.css";

const ClassificationHistory = () => {
  const [history, setHistory] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const getHistory = () => {
	try {
	  return JSON.parse(localStorage.getItem('classificationHistory')) || [];
	} catch (error) {
	  console.error('Error reading history:', error);
	  return [];
	}
  };


  // Cargar historial al montar el componente
  useEffect(() => {
    const savedHistory = getHistory();
	
	console.log(savedHistory);
    if (savedHistory) {
      	//setHistory(JSON.parse(savedHistory));
		console.log(7)
		setHistory(savedHistory);
    } else {
      setHistory([]);
    }
  }, []);

  // Función para formatear la fecha
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // Función para eliminar un elemento del historial
  const removeFromHistory = (index) => {
    const newHistory = history.filter((_, i) => i !== index);
    setHistory(newHistory);
    localStorage.setItem("classificationHistory", JSON.stringify(newHistory));
    if (selectedImage && selectedImage.index === index) {
      setSelectedImage(null);
    }
  };

  // Función para formatear el tamaño del archivo
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2) + " " + sizes[i]);
  };

  return (
    <div className="classification-history">
      <h3>Historial de Clasificaciones</h3>

      {history.length === 0 ? (
        <div className="empty-history">
          <MdInfo size={48} style={{ marginBottom: "10px" }} />
          <p>No hay clasificaciones recientes</p>
          <p className="small">Las imágenes que subas aparecerán aquí</p>
        </div>
      ) : (
        <div className="history-container">
          {/* Lista de imágenes */}
          <div className="image-list">
            {history.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage({ ...item, index })}
                className={`history-item ${selectedImage?.index === index ? "active" : ""}`}
              >
                <img src={`data:image/jpg;base64,${item.imageUrl}`} alt="Preview" />
                <div className="history-item-info">
                  
                  <small>{formatDate(item.timestamp)}</small>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromHistory(index);
                  }}
                  className="remove-btn"
                >
                  <MdClose size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Detalle de la imagen seleccionada */}
          <div className="image-detail">
            {selectedImage ? (
              <>
                <div className="selected-image-container">
                  <img src={`data:image/jpg;base64,${selectedImage.imageUrl}`} alt="Selected preview"/>
                  
                  <p>
                    {formatDate(selectedImage.timestamp)}
                  </p>
                </div>

                <div className="results-container">
                  <h4>Resultados de Clasificación</h4>
                  {selectedImage.results ? (
                    <div>
                      {Object.entries(selectedImage.results).map(([key, value]) => (
                        <div key={key} className="result-item">
                          <div className="result-label">
                            <span>{key}:</span>
                            <span>{value}%</span>
                          </div>
                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{ width: `${value}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: "#666", fontStyle: "italic" }}>
                      No hay datos de clasificación
                    </p>
                  )}
                </div>
              </>
            ) : (
              <div className="no-selection">
                <p>Selecciona una imagen para ver los detalles</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassificationHistory;