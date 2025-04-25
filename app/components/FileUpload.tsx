import React, { useState, useCallback } from "react";
import { MdOutlineFileUpload, MdClose } from "react-icons/md";
import { Form, useFetcher } from "@remix-run/react";
import type { ClassificationResult } from "~/types/ClassificationResult";
import type { ClassificationResponse } from "~/types/ClassificationResponse";



interface FileUploadProps {
	handleResult: (image: string, results: ClassificationResult) => void;
	handleSubmit: () => void;
	handleSetFile: (obj: File | null) => void;
}

const FileUpload = ({ handleResult, handleSubmit, handleSetFile }: FileUploadProps) => {

	const [file, setFile] = useState<File | null>(null);
	const [isDragActive, setIsDragActive] = useState(false);
	const fetcher = useFetcher();
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const onDragEnter = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragActive(true);
	}, []);

	const onDragLeave = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragActive(false);
	}, []);

	const onDragOver = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
	}, []);

	const onDrop = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragActive(false);

		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			const uploadedFile = e.dataTransfer.files[0];
			if (uploadedFile.type.match("image.*")) {
				setFile(uploadedFile);
				handleSetFile(uploadedFile);
				setPreviewUrl(URL.createObjectURL(uploadedFile));
			}
		}
	}, []);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const uploadedFile = e.target.files[0];
			if (uploadedFile.type.match("image.*")) {
				setFile(uploadedFile);
				handleSetFile(uploadedFile);
				setPreviewUrl(URL.createObjectURL(uploadedFile));
			}
		}
	};

	const removeFile = () => {
		setFile(null);
		handleSetFile(null);
		setPreviewUrl(null);
		if (previewUrl) {
			URL.revokeObjectURL(previewUrl);
		}
	};

	const formatFileSize = (bytes: number) => {
		if (bytes === 0) return "0 Bytes";
		const k = 1024;
		const sizes = ["Bytes", "KB", "MB", "GB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
	};


	return (
		<Form
			method="post"
			encType="multipart/form-data"
			onSubmit={handleSubmit}
		>
			<div
				style={{
					borderRadius: "15px",
					padding: "15px",
					border: isDragActive
						? "2px solid #3A7BD5"
						: "2px dotted #3A7BD5",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					backgroundColor: isDragActive ? "#f0f7ff" : "transparent",
					position: "relative",
					cursor: "pointer",
					height: "100%",
					margin: "10px",
				}}
				onDragEnter={onDragEnter}
				onDragLeave={onDragLeave}
				onDragOver={onDragOver}
				onDrop={onDrop}
				onClick={() => document.getElementById("file-input")?.click()}
			>
				<input
					id="file-input"
					type="file"
					name="image-to-clasify"
					accept="image/jpeg, image/png"
					style={{ display: "none" }}
					onChange={handleFileChange}
				/>

				{!file ? (
					<>
						<MdOutlineFileUpload
							style={{
								fontSize: "2em",
								color: "#3A7BD5",
								marginBottom: "10px",
							}}
						/>
						<p
							style={{
								margin: 0,
								color: "#3A7BD5",
								textAlign: "center",
							}}
						>
							Arrastra y suelta tu archivo aquí <br /> o haz clic
							para seleccionar
						</p>
						<p
							style={{
								margin: "5px 0 0",
								fontSize: "0.8em",
								color: "#666",
							}}
						>
							Formatos soportados: JPG, PNG
						</p>
					</>
				) : (
					<div style={{ width: "100%", textAlign: "center" }}>
						<div
							style={{
								position: "relative",
								display: "inline-block",
							}}
						>
							<img
								src={previewUrl || ""}
								alt="Preview"
								style={{
									maxWidth: "100%",
									maxHeight: "150px",
									borderRadius: "10px",
								}}
							/>
							<button
								type="button"
								onClick={(e) => {
									e.stopPropagation();
									removeFile();
								}}
								style={{
									position: "absolute",
									top: "-10px",
									right: "-10px",
									background: "#ff4d4f",
									borderRadius: "50%",
									width: "24px",
									height: "24px",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									border: "none",
									cursor: "pointer",
									color: "white",
								}}
							>
								<MdClose size={16} />
							</button>
						</div>
						<div style={{ marginTop: "10px" }}>
							<p style={{ margin: "5px 0", fontWeight: "bold" }}>
								{file.name}
							</p>
							<p style={{ margin: "5px 0", color: "#666" }}>
								{formatFileSize(file.size)}
							</p>
						</div>
					</div>
				)}
			</div>

			<button
				type="submit"
				disabled={!file || fetcher.state === "submitting"}
				style={{
					background: file ? "#1B6DDE" : "#cccccc",
					padding: "10px 20px",
					borderRadius: "15px",
					border: "none",
					fontSize: "0.8em",
					color: "white",
					width: "250px",
					fontWeight: "bold",
					fontFamily: "Inter",
					marginTop: "15px",
					cursor: file ? "pointer" : "not-allowed",
				}}
			>
				{fetcher.state === "submitting" ? "Procesando..." : "Evaluar"}
			</button>

			
		</Form>
	);
};

export default FileUpload;

