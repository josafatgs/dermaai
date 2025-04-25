import FileUpload from "~/components/FileUpload";
import ClasificationHistory from "~/components/ClasificationHistory";
import Result from "~/components/Result";



import { useState } from "react";

import { ClassificationResult } from "~/types/ClassificationResult";


export default function Classifier() {

	const [results, setResults] = useState<ClassificationResult | null>(null);
	const [resultImage, setResultImage] = useState<string | null>(null);

	const [file, setFile] = useState<File | null>(null);

	const handleSetFile = (obj: File | null) => {
		setFile(obj);
	}

	const handleSetResults = (results: ClassificationResult) => {
		setResultImage(file ? URL.createObjectURL(file) : null);
		setResults(results);
	};

	const handleSubmit = async (e: React.FormEvent) => {
			e.preventDefault();
			if (!file) return;
	


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
				return response.json(); // Return the parsing Promise
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

	return (
		<div
			className="flex flex-col"
			style={{
				padding: "0",
				margin: "0",
				width: "100%",
			}}
		>
			<div
				style={{
					width: "100%",
					padding: "12px 24px",
					margin: "0 auto",
					height: "80px",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					gap: "20px",
					flexShrink: 0,
					boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
					backgroundColor: "white",
					position: "relative",
					zIndex: 10,
				}}
			>
				{/* Logo izquierdo */}
				<div style={{ flex: "0 0 auto" }}>
					<img
						src="/dermatoss-logo.png"
						alt="Dermatoss Logo"
						width={50}
						height={50}
						style={{
							display: "block",
							objectFit: "contain",
							filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
						}}
					/>
				</div>

				{/* Mensaje educativo - ahora centrado y con mejor diseño */}
				<div
					style={{
						flex: "1 1 auto",
						maxWidth: "600px",
						backgroundColor: "#f0f7ff",
						borderRadius: "12px",
						padding: "10px 20px",
						border: "1px solid #3A7BD5",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.05)",
					}}
				>
					<span
						style={{
							textAlign: "center",
							fontSize: "0.85em",
							color: "#1B6DDE",
							fontWeight: 500,
							lineHeight: 1.4,
						}}
					>
						<span style={{ fontWeight: 600 }}>
							Herramienta educativa
						</span>{" "}
						- Para uso académico e investigación
					</span>
				</div>

				{/* Logo derecho */}
				<div style={{ flex: "0 0 auto" }}>
					<img
						src="/Logo_del_ITESM.svg"
						alt="ITESM Logo"
						width={50}
						height={50}
						style={{
							display: "block",
							objectFit: "contain",
							filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
						}}
					/>
				</div>
			</div>

			<div
				style={{
					maxWidth: "1440px",
					width: "100%",
					display: "grid",
					gridTemplateColumns: "60% 40%",
					margin: "0 auto",
					marginTop: "20px",

					paddingBottom: "20px",
				}}
			>
				<div style={{ height: "100%" }}>
					{results ? (
						<Result
							classificationResult={results}
							originalImage={resultImage}
							
						/>
					) : (
						<FileUpload handleResult={handleSetResults} handleSubmit={handleSubmit}
						handleSetFile={handleSetFile}  />
					)}
				</div>
				<ClasificationHistory></ClasificationHistory>
			</div>
		</div>
	);
}


