import { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { ClassificationResult } from "~/types/ClassificationResult";
import data from '../utils/data.json';


const Result = ({ classificationResult, originalImage }: { classificationResult: ClassificationResult; originalImage: string }) => {
	// Datos de ejemplo para el slider de imágenes similares

	console.log(data);

	const similarImages = Array.from({length: 4}, (_, i) => ({
		id: i + 1,
		url: `/${classificationResult.predictedClass.toLowerCase()}/${classificationResult.predictedClass.toLowerCase()}${i + 1}.jpg`,
		description: `Caso ${i + 1} de ${classificationResult.predictedClass}`
	}));

	console.log(similarImages);

	
	const [currentSlide, setCurrentSlide] = useState(0);

	const nextSlide = () => {
		setCurrentSlide((prev) =>
			prev === similarImages.length - 1 ? 0 : prev + 1
		);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) =>
			prev === 0 ? similarImages.length - 1 : prev - 1
		);
	};

	// Datos de ejemplo para la descripción de la lesión
	const lesionDescription = data[classificationResult.predictedClass.toLowerCase()] || {
		diagnosticos_diferenciales: "Descripción no disponible",
		definicion: "No se encontró información sobre esta lesión.",
		caracteristicas: ["N/A"],
	};

	return (
		<div
			style={{
				maxWidth: "1200px",
				margin: "0 auto",
				padding: "20px",
				backgroundColor: "#fff",
				borderRadius: "15px",
				boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
			}}
		>
			{/* Sección de clasificación */}
			<div style={{ marginBottom: "30px" }}>
				<h2
					style={{
						color: "#3A7BD5",
						marginBottom: "20px",
						textAlign: "center",
					}}
				>
					Resultado de Clasificación
				</h2>

				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(2, 1fr)",
						gap: "5px",
						marginBottom: "20px",
						height: "fit-content",
					}}
				>
					<div
						style={{
							backgroundColor: "#f8f9fa",
							padding: "5px",
							borderRadius: "10px",
							textAlign: "center",
							height: "fit-content",
							display: "flex",
							justifyContent: "space-around",
							alignItems: "center",
						}}
					>
						<h3 style={{ margin: "0 0 10px", color: "#495057" }}>
							Mancha
						</h3>
						<div
							style={{
								fontSize: "1.2em",
								fontWeight: "bold",
								color: "#9B59B6",
							}}
						>
							9%
						</div>
					</div>

					<div
						style={{
							backgroundColor: "#f8f9fa",
							padding: "5px",
							borderRadius: "10px",
							textAlign: "center",
							height: "fit-content",
							display: "flex",
							justifyContent: "space-around",
							alignItems: "center",
						}}
					>
						<h3 style={{ margin: "0 0 10px", color: "#495057" }}>
							Pústula
						</h3>
						<div
							style={{
								fontSize: "1.2em",
								fontWeight: "bold",
								color: "#E74C3C",
							}}
						>
							10%
						</div>
					</div>

					<div
						style={{
							backgroundColor: "#f8f9fa",
							padding: "5px",
							borderRadius: "10px",
							textAlign: "center",
							height: "fit-content",
							display: "flex",
							justifyContent: "space-around",
							alignItems: "center",
						}}
					>
						<h3 style={{ margin: "0 0 10px", color: "#495057" }}>
							Roncha
						</h3>
						<div
							style={{
								fontSize: "1.2em",
								fontWeight: "bold",
								color: "#3498DB",
							}}
						>
							9%
						</div>
					</div>

					<div
						style={{
							backgroundColor: "#f8f9fa",
							padding: "5px",
							borderRadius: "10px",
							textAlign: "center",
							height: "fit-content",
							display: "flex",
							justifyContent: "space-around",
							alignItems: "center",
						}}
					>
						<h3 style={{ margin: "0 0 10px", color: "#495057" }}>
							Ampolla
						</h3>
						<div
							style={{
								fontSize: "1.2em",
								fontWeight: "bold",
								color: "#2ECC71",
							}}
						>
							9%
						</div>
					</div>
				</div>

				<div
					style={{
						backgroundColor: "#e8f4fd",
						padding: "15px",
						borderRadius: "10px",
						textAlign: "center",
						marginTop: "20px",
					}}
				>
					<h3 style={{ margin: "0", color: "#3A7BD5" }}>
						Clase Predicha: <strong>Pústula</strong>
					</h3>
				</div>
			</div>

			{/* Sección de imagen y descripción */}
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					gap: "30px",
					marginBottom: "40px",
					alignItems: "center",
				}}
			>
				<div
					style={{
						border: "1px solid #ddd",
						borderRadius: "10px",
						overflow: "hidden",
						boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
					}}
				>
					<img
						src={
							originalImage ||
							"https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=500"
						}
						alt="Lesión clasificada"
						style={{
							width: "100%",
							height: "auto",
							display: "block",
						}}
					/>
				</div>

				<div>
					<h3 style={{ color: "#3A7BD5", marginTop: "0" }}>
						{lesionDescription.title}
					</h3>
					<p style={{ lineHeight: "1.6", marginBottom: "20px" }}>
						{lesionDescription.description}
					</p>

					<h4 style={{ color: "#495057" }}>
						Características principales:
					</h4>
					<ul style={{ paddingLeft: "20px", marginBottom: "20px" }}>
						{lesionDescription.characteristics.map(
							(item, index) => (
								<li key={index} style={{ marginBottom: "8px" }}>
									{item}
								</li>
							)
						)}
					</ul>

					<h4 style={{ color: "#495057" }}>
						Tratamiento recomendado:
					</h4>
					<p style={{ lineHeight: "1.6" }}>
						{lesionDescription.treatment}
					</p>
				</div>
			</div>

			{/* Slider de imágenes similares */}
			<div style={{ marginBottom: "20px" }}>
				<h3 style={{ color: "#3A7BD5", marginBottom: "15px" }}>
					Casos similares
				</h3>

				<div style={{ position: "relative" }}>
					<div
						style={{
							display: "flex",
							overflowX: "auto",
							scrollBehavior: "smooth",
							scrollbarWidth: "none",
							gap: "15px",
							padding: "10px 0",
							"::-webkit-scrollbar": {
								display: "none",
							},
						}}
					>
						{similarImages.map((image, index) => (
							<div
								key={image.id}
								style={{
									flex: "0 0 auto",
									width: "200px",
									border: "1px solid #ddd",
									borderRadius: "8px",
									overflow: "hidden",
									boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
									opacity: index === currentSlide ? 1 : 0.7,
									transition: "opacity 0.3s ease",
								}}
							>
								<img
									src={image.url}
									alt={`Caso similar ${image.id}`}
									style={{
										width: "100%",
										height: "150px",
										objectFit: "cover",
									}}
								/>
								<div style={{ padding: "10px" }}>
									<p
										style={{
											margin: "0",
											fontSize: "0.9em",
											textAlign: "center",
											fontWeight: "500",
										}}
									>
										{image.description}
									</p>
								</div>
							</div>
						))}
					</div>

					<button
						onClick={prevSlide}
						style={{
							position: "absolute",
							left: "-20px",
							top: "50%",
							transform: "translateY(-50%)",
							background: "#3A7BD5",
							color: "white",
							border: "none",
							borderRadius: "50%",
							width: "40px",
							height: "40px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							cursor: "pointer",
							boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
							zIndex: 1,
						}}
					>
						<MdChevronLeft size={24} />
					</button>

					<button
						onClick={nextSlide}
						style={{
							position: "absolute",
							right: "-20px",
							top: "50%",
							transform: "translateY(-50%)",
							background: "#3A7BD5",
							color: "white",
							border: "none",
							borderRadius: "50%",
							width: "40px",
							height: "40px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							cursor: "pointer",
							boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
							zIndex: 1,
						}}
					>
						<MdChevronRight size={24} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Result;
