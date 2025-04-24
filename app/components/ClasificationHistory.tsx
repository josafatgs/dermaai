import { useEffect, useState } from "react";
import { MdClose, MdInfo } from "react-icons/md";

const ClassificationHistory = () => {
	const [history, setHistory] = useState([]);
	const [selectedImage, setSelectedImage] = useState(null);

	const dummyData = [
		{
			imageUrl:
				"https://images.unsplash.com/photo-1605170439002-90845e8c0137?w=200",
			fileName: "lesion-1.jpg",
			fileSize: 245678,
			timestamp: Date.now() - 3600000 * 3, // 3 horas atrás
			results: {
				Mancha: 15,
				Roncha: 72,
				Ampolla: 10,
				Pústula: 3,
			},
		},
		{
			imageUrl:
				"https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=200",
			fileName: "lesion-2.jpg",
			fileSize: 345678,
			timestamp: Date.now() - 3600000 * 24, // 1 día atrás
			results: {
				Mancha: 45,
				Pustula: 30,
				Roncha: 20,
				Ampolla: 5,
			},
		},
		{
			imageUrl:
				"https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=200",
			fileName: "lesion-3.jpg",
			fileSize: 185678,
			timestamp: Date.now() - 3600000 * 72, // 3 días atrás
			results: {
				Mancha: 5,
				Roncha: 10,
				Ampolla: 80,
				Pústula: 5,
			},
		},
	];

	// Cargar historial al montar el componente
	useEffect(() => {
		const savedHistory = localStorage.getItem("classificationHistory");
		if (savedHistory) {
			setHistory(JSON.parse(savedHistory));
		} else {
			setHistory(dummyData);
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
		localStorage.setItem(
			"classificationHistory",
			JSON.stringify(newHistory)
		);
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
		<div
			style={{
				borderRadius: "15px",
				padding: "15px",
				border: "2px solid #3A7BD5",
				height: "100%",
				margin: "10px",

				display: "flex",
				flexDirection: "column",
			}}
		>
			<h3 style={{ margin: "0 0 15px 0", color: "#3A7BD5" }}>
				Historial de Clasificaciones
			</h3>

			{history.length === 0 ? (
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						height: "100%",
						color: "#666",
						textAlign: "center",
					}}
				>
					<MdInfo size={48} style={{ marginBottom: "10px" }} />
					<p>No hay clasificaciones recientes</p>
					<p style={{ fontSize: "0.8em" }}>
						Las imágenes que subas aparecerán aquí
					</p>
				</div>
			) : (
				<div
					style={{
						display: "flex",
						height: "100%",
						overflow: "hidden",
					}}
				>
					{/* Lista de imágenes */}
					<div
						style={{
							width: "40%",
							overflowY: "auto",
							paddingRight: "10px",
							borderRight: "1px solid #eee",
						}}
					>
						{history.map((item, index) => (
							<div
								key={index}
								onClick={() =>
									setSelectedImage({ ...item, index })
								}
								style={{
									display: "flex",
									alignItems: "center",
									padding: "10px",
									marginBottom: "8px",
									borderRadius: "8px",
									backgroundColor:
										selectedImage?.index === index
											? "#f0f7ff"
											: "transparent",
									cursor: "pointer",
									border: "1px solid #eee",
								}}
							>
								<img
									src={item.imageUrl}
									alt="Preview"
									style={{
										width: "50px",
										height: "50px",
										objectFit: "cover",
										borderRadius: "5px",
										marginRight: "10px",
									}}
								/>
								<div style={{ flex: 1 }}>
									<p
										style={{
											margin: 0,
											fontSize: "0.9em",
											fontWeight: "bold",
										}}
									>
										{item.fileName}
									</p>
									<p
										style={{
											margin: "5px 0 0",
											fontSize: "0.7em",
											color: "#666",
										}}
									>
										{formatDate(item.timestamp)}
									</p>
								</div>
								<button
									onClick={(e) => {
										e.stopPropagation();
										removeFromHistory(index);
									}}
									style={{
										background: "transparent",
										border: "none",
										cursor: "pointer",
										color: "#ff4d4f",
									}}
								>
									<MdClose size={18} />
								</button>
							</div>
						))}
					</div>

					{/* Detalle de la imagen seleccionada */}
					<div
						style={{
							flex: 1,
							padding: "0 15px",
							overflowY: "auto",
							display: "flex",
							flexDirection: "column",
						}}
					>
						{selectedImage ? (
							<>
								<div
									style={{
										textAlign: "center",
										marginBottom: "15px",
									}}
								>
									<img
										src={selectedImage.imageUrl}
										alt="Selected preview"
										style={{
											maxWidth: "100%",
											maxHeight: "200px",
											borderRadius: "10px",
											margin: "0 auto",
										}}
									/>
									<h4 style={{ margin: "10px 0 5px" }}>
										{selectedImage.fileName}
									</h4>
									<p
										style={{
											margin: 0,
											fontSize: "0.8em",
											color: "#666",
										}}
									>
										{formatFileSize(selectedImage.fileSize)}{" "}
										• {formatDate(selectedImage.timestamp)}
									</p>
								</div>

								<div
									style={{
										backgroundColor: "#f6f6f6",
										borderRadius: "10px",
										padding: "15px",
										marginTop: "10px",
									}}
								>
									<h4
										style={{
											margin: "0 0 10px",
											color: "#3A7BD5",
										}}
									>
										Resultados de Clasificación
									</h4>
									{selectedImage.results ? (
										<div>
											{Object.entries(
												selectedImage.results
											).map(([key, value]) => (
												<div
													key={key}
													style={{
														marginBottom: "8px",
													}}
												>
													<div
														style={{
															display: "flex",
															justifyContent:
																"space-between",
															marginBottom: "3px",
														}}
													>
														<span
															style={{
																fontWeight:
																	"bold",
															}}
														>
															{key}:
														</span>
														<span>{value}%</span>
													</div>
													<div
														style={{
															height: "8px",
															backgroundColor:
																"#e0e0e0",
															borderRadius: "4px",
															overflow: "hidden",
														}}
													>
														<div
															style={{
																width: `${value}%`,
																height: "100%",
																backgroundColor:
																	"#3A7BD5",
																borderRadius:
																	"4px",
															}}
														></div>
													</div>
												</div>
											))}
										</div>
									) : (
										<p
											style={{
												color: "#666",
												fontStyle: "italic",
											}}
										>
											No hay datos de clasificación
										</p>
									)}
								</div>
							</>
						) : (
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									height: "100%",
									color: "#666",
								}}
							>
								<p>
									Selecciona una imagen para ver los detalles
								</p>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

// Función para añadir una nueva clasificación al historial (debes llamarla cuando se complete una clasificación)
export const addToClassificationHistory = (file, results) => {
	const historyItem = {
		imageUrl: URL.createObjectURL(file),
		fileName: file.name,
		fileSize: file.size,
		timestamp: Date.now(),
		results: results,
	};

	const existingHistory = JSON.parse(
		localStorage.getItem("classificationHistory") || "[]"
	);
	const newHistory = [historyItem, ...existingHistory].slice(0, 50); // Limitar a 50 elementos
	localStorage.setItem("classificationHistory", JSON.stringify(newHistory));
};

export default ClassificationHistory;
