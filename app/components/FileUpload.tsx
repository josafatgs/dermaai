import React, { useState, useCallback } from "react";
import { MdOutlineFileUpload, MdClose } from "react-icons/md";
import { Form, useFetcher } from "@remix-run/react";


interface FileUploadProps {
	handleSubmit: (e: React.FormEvent) => void;
	handleSetFile: (obj: File | null) => void;
}

const FileUpload = ({ handleSubmit, handleSetFile }: FileUploadProps) => {
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
				className={`upload-container ${isDragActive ? 'drag-active' : ''}`}
				onDragEnter={onDragEnter}
				onDragLeave={onDragLeave}
				onDragOver={onDragOver}
				onDrop={onDrop}
				onClick={() => document.getElementById("file-input")?.click()}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						document.getElementById("file-input")?.click();
					}
				}}
				role="button"
				tabIndex={0}
			>
				<input
					id="file-input"
					type="file"
					name="image-to-clasify"
					accept="image/jpeg, image/png"
					className="file-input"
					onChange={handleFileChange}
				/>

				{!file ? (
					<>
						<MdOutlineFileUpload className="upload-icon" />
						<p className="upload-text">
							Arrastra y suelta tu archivo aquí <br /> o haz clic
							para seleccionar
						</p>
						<p className="format-text">
							Formatos soportados: JPG, PNG
						</p>
					</>
				) : (
					<div className="preview-container">
						<div className="preview-image-container">
							<img
								src={previewUrl || ""}
								alt="Preview"
								className="preview-image"
							/>
							<button
								type="button"
								onClick={(e) => {
									e.stopPropagation();
									removeFile();
								}}
								className="remove-button"
							>
								<MdClose size={16} />
							</button>
						</div>
						<div className="file-info">
							<p className="file-name">{file.name}</p>
							<p className="file-size">
								{formatFileSize(file.size)}
							</p>
						</div>
					</div>
				)}
			</div>

			<button
				type="submit"
				disabled={!file || fetcher.state === "submitting"}
				className={`submit-button ${!file ? 'disabled' : ''}`}
			>
				{fetcher.state === "submitting" ? "Procesando..." : "Evaluar"}
			</button>
		</Form>
	);
};

export default FileUpload;