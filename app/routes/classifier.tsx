import FileUpload from "~/components/FileUpload";
import ClasificationHistory from "~/components/ClasificationHistory";
import Result from "~/components/Result";
import { classifyImage } from "~/server/Classifier.server";
import type { ActionFunction } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";


import { useState } from "react";

import { ClassificationResult } from "~/types/ClassificationResult";


export default function Classifier() {

	const fetcher = useFetcher();
	const [results, setResults] = useState<ClassificationResult | null>(null);
	const [resultImage, setResultImage] = useState<string | null>(null);

	const [file, setFile] = useState<File | null>(null);

	const handleSetFile = (obj: File | null) => {
		setFile(obj);
	}

	const handleSetResults = (image: string, results: ClassificationResult) => {
		setResultImage(image);
		setResults(results);
	};

	const handleSubmit = async (e: React.FormEvent) => {
			e.preventDefault();
			if (!file) return;
	
			fetcher.submit(
				(() => {
					const formData = new FormData();
					formData.append("image-to-clasify", file);
					return formData;
				})(),
				{
					method: "post",
					action: "classify"
				}
			);
			const response = await fetcher.data;
			
			console.log(response);
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
							handelSubmit={handleSubmit}
							handleSetFile={handleSetFile}
						/>
					) : (
						<FileUpload handleResult={handleSetResults}  />
					)}
				</div>
				<ClasificationHistory></ClasificationHistory>
			</div>
		</div>
	);
}

export const action: ActionFunction = async ({ request, params }) => {
	const formData = await request.formData();
	const action = formData.get("action");

	if (action == "classify") {
		const file = formData.get("image-to-clasify");
		if (!file) {
			return { error: "No file provided" };
		}

		const response = await classifyImage(file);

		return response;
	}

	return {"message": "hola"}
}

