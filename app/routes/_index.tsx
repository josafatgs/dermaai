import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
	return [
		{ title: "Derma AI" },
		{ name: "description", content: "Derma AI" },
	];
};

export default function Index() {
	return (
		<div
			style={{
				width: "100%",
				display: "flex",
				flexDirection: "column",
				margin: "0 auto",
				minHeight: "100vh",
				justifyContent: "space-between",
				overflow: "hidden",
			}}
		>
			<div
				style={{
					width: "100%",
					padding: "12px 24px",
					margin: "0 auto",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					gap: "20px",
					flexShrink: 0,

					backgroundColor: "white",
					position: "relative",
					zIndex: 10,
				}}
			>
				<div style={{ display: "flex", gap: "10px" }}>
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

				<Link
					to="classifier"
					style={{
						height: "fit-content",
						background: "#1A365D",
						color: "white",
						padding: "3px 20px",
						borderRadius: "10px",
						fontSize: "14px",
						display: "flex",
						alignItems: "center",
					}}
				>
					Prueba Ahora
				</Link>
			</div>

			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr",
					width: "100%",
					height: "100%", // Hereda la altura del contenedor padre
					alignContent: "center", // Centra el contenido verticalmente
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: "100%",
					}}
				>
					<img
						src="/DermaAIBg.png"
						alt="Derma AI Logo"
						style={{
							width: "auto",
							height: "100%",
							maxHeight: "800px",
							objectFit: "contain",
							filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
						}}
					/>
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						padding: "20px",
						height: "100%",
					}}
				>
					<span style={{ color: "#737373", marginBottom: "10px" }}>
						Descubre una herramienta innovadora diseñada para ayudar
						a profesores, padres y estudiantes a identificar y
						clasificar lesiones primarias dermatológicas
					</span>
					<span style={{ color: "#737373", marginBottom: "20px" }}>
						¡Pruébalo ahora y descubre lo fácil que puede ser el
						aprendizaje!
					</span>
					<Link
						to="classifier"
						style={{
							background: "#1A365D",
							color: "white",
							padding: "8px 20px",
							borderRadius: "10px",
							fontSize: "14px",
							width: "fit-content",
							textDecoration: "none",
						}}
					>
						Prueba Ahora
					</Link>
				</div>
			</div>

			<div
				style={{
					width: "95%",
					margin: "10px auto",
					background: "#F6F6F6",
					borderRadius: "10px",
					padding: "10px 0",
					flexShrink: "0",
				}}
			>
				<span
					style={{
						fontWeight: "300",
						display: "block",
						textAlign: "center",
						fontSize: "14px",
					}}
				>
					Esta herramienta es de uso educativo unicamente,{" "}
				</span>
			</div>
		</div>
	);
}
