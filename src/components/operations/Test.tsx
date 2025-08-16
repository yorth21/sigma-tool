import { Calculator, Divide, Minus, Plus, X } from "lucide-react";
import React, { useState } from "react";

// Configuración de Decimal.js (simulado para el ejemplo)
const Decimal = {
	set: (config) => config,
	precision: 50,
	rounding: 4, // ROUND_HALF_UP
};

// Función para crear un Decimal (simulado)
const decimal = (value) => {
	const num = parseFloat(value);
	return {
		plus: (other) => decimal(num + parseFloat(other.toString())),
		minus: (other) => decimal(num - parseFloat(other.toString())),
		mul: (other) => decimal(num * parseFloat(other.toString())),
		div: (other) => decimal(num / parseFloat(other.toString())),
		pow: (exp) => decimal(num ** exp),
		sqrt: () => decimal(Math.sqrt(num)),
		abs: () => decimal(Math.abs(num)),
		toString: () => num.toString(),
		toNumber: () => num,
	};
};

// Función para encontrar la primera cifra significativa de un número
const findFirstSignificantDigit = (num) => {
	const absNum = Math.abs(num);
	if (absNum === 0) return 0;

	const log = Math.floor(Math.log10(absNum));
	return -log;
};

// Función para redondear error a 1 cifra significativa
const roundErrorToOneSignificantFigure = (error) => {
	const errorNum = parseFloat(error.toString());
	if (errorNum === 0) return { rounded: 0, decimals: 0 };

	const firstSigDigitPos = findFirstSignificantDigit(errorNum);
	const factor = 10 ** firstSigDigitPos;
	const rounded = Math.round(errorNum * factor) / factor;

	// Determinar cuántos decimales tiene el error redondeado
	const decimals = Math.max(0, firstSigDigitPos);

	return {
		rounded: rounded,
		decimals: decimals,
		formatted: rounded.toFixed(decimals),
	};
};

// Función para redondear mesurando al mismo número de decimales que el error
const roundMeasurandToMatchError = (measurand, errorDecimals) => {
	const measurandNum = parseFloat(measurand.toString());
	return {
		rounded: parseFloat(measurandNum.toFixed(errorDecimals)),
		formatted: measurandNum.toFixed(errorDecimals),
	};
};

const PhysicsCalculator = () => {
	const [x, setX] = useState("");
	const [dx, setDx] = useState("");
	const [y, setY] = useState("");
	const [dy, setDy] = useState("");
	const [results, setResults] = useState(null);

	const calculateSum = () => {
		try {
			const xVal = decimal(x);
			const dxVal = decimal(dx);
			const yVal = decimal(y);
			const dyVal = decimal(dy);

			// Cálculo del mesurando
			const measurand = xVal.plus(yVal);

			// Cálculo del error: √(dx² + dy²)
			const errorSquared = dxVal.pow(2).plus(dyVal.pow(2));
			const error = errorSquared.sqrt();

			// Aplicar reglas de cifras significativas
			const errorFormatted = roundErrorToOneSignificantFigure(error);
			const measurandFormatted = roundMeasurandToMatchError(
				measurand,
				errorFormatted.decimals,
			);

			setResults({
				operation: "suma",
				measurand: measurandFormatted.formatted,
				error: errorFormatted.formatted,
				measurandRaw: measurand.toString(),
				errorRaw: error.toString(),
				formula: "x + y",
				errorFormula: "√(dx² + dy²)",
				decimals: errorFormatted.decimals,
				precision: "cifras significativas",
			});
		} catch (error) {
			alert("Por favor ingresa valores numéricos válidos");
		}
	};

	const calculateSubtraction = () => {
		try {
			const xVal = decimal(x);
			const dxVal = decimal(dx);
			const yVal = decimal(y);
			const dyVal = decimal(dy);

			const measurand = xVal.minus(yVal);
			const errorSquared = dxVal.pow(2).plus(dyVal.pow(2));
			const error = errorSquared.sqrt();

			const errorFormatted = roundErrorToOneSignificantFigure(error);
			const measurandFormatted = roundMeasurandToMatchError(
				measurand,
				errorFormatted.decimals,
			);

			setResults({
				operation: "resta",
				measurand: measurandFormatted.formatted,
				error: errorFormatted.formatted,
				measurandRaw: measurand.toString(),
				errorRaw: error.toString(),
				formula: "x - y",
				errorFormula: "√(dx² + dy²)",
				decimals: errorFormatted.decimals,
				precision: "cifras significativas",
			});
		} catch (error) {
			alert("Por favor ingresa valores numéricos válidos");
		}
	};

	const calculateMultiplication = () => {
		try {
			const xVal = decimal(x);
			const dxVal = decimal(dx);
			const yVal = decimal(y);
			const dyVal = decimal(dy);

			const measurand = xVal.mul(yVal);
			const relativeErrorX = dxVal.div(xVal.abs());
			const relativeErrorY = dyVal.div(yVal.abs());
			const relativeErrorSquared = relativeErrorX
				.pow(2)
				.plus(relativeErrorY.pow(2));
			const relativeError = relativeErrorSquared.sqrt();
			const error = measurand.abs().mul(relativeError);

			const errorFormatted = roundErrorToOneSignificantFigure(error);
			const measurandFormatted = roundMeasurandToMatchError(
				measurand,
				errorFormatted.decimals,
			);

			setResults({
				operation: "multiplicación",
				measurand: measurandFormatted.formatted,
				error: errorFormatted.formatted,
				measurandRaw: measurand.toString(),
				errorRaw: error.toString(),
				formula: "x × y",
				errorFormula: "|xy| × √((dx/x)² + (dy/y)²)",
				decimals: errorFormatted.decimals,
				precision: "cifras significativas",
			});
		} catch (error) {
			alert(
				"Error en el cálculo. Verifica que los valores no sean cero para errores relativos.",
			);
		}
	};

	const calculateDivision = () => {
		try {
			const xVal = decimal(x);
			const dxVal = decimal(dx);
			const yVal = decimal(y);
			const dyVal = decimal(dy);

			if (parseFloat(y) === 0) {
				alert("No se puede dividir por cero");
				return;
			}

			const measurand = xVal.div(yVal);
			const relativeErrorX = dxVal.div(xVal.abs());
			const relativeErrorY = dyVal.div(yVal.abs());
			const relativeErrorSquared = relativeErrorX
				.pow(2)
				.plus(relativeErrorY.pow(2));
			const relativeError = relativeErrorSquared.sqrt();
			const error = measurand.abs().mul(relativeError);

			const errorFormatted = roundErrorToOneSignificantFigure(error);
			const measurandFormatted = roundMeasurandToMatchError(
				measurand,
				errorFormatted.decimals,
			);

			setResults({
				operation: "división",
				measurand: measurandFormatted.formatted,
				error: errorFormatted.formatted,
				measurandRaw: measurand.toString(),
				errorRaw: error.toString(),
				formula: "x ÷ y",
				errorFormula: "|x/y| × √((dx/x)² + (dy/y)²)",
				decimals: errorFormatted.decimals,
				precision: "cifras significativas",
			});
		} catch (error) {
			alert("Error en el cálculo. Verifica que los valores no sean cero.");
		}
	};

	const clearAll = () => {
		setX("");
		setDx("");
		setY("");
		setDy("");
		setResults(null);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
			<div className="max-w-4xl mx-auto">
				<div className="bg-white rounded-xl shadow-lg p-8">
					<div className="flex items-center gap-3 mb-8">
						<Calculator className="text-blue-600" size={32} />
						<div>
							<h1 className="text-3xl font-bold text-gray-800">
								Calculadora de Propagación de Errores
							</h1>
							<p className="text-gray-600">
								Física Práctica 1 - Universidad de Nariño
							</p>
						</div>
					</div>

					<div className="grid md:grid-cols-2 gap-8">
						{/* Entrada de datos */}
						<div className="space-y-6">
							<div className="bg-gray-50 p-6 rounded-lg">
								<h2 className="text-xl font-semibold mb-4 text-gray-700">
									Datos de Entrada
								</h2>

								<div className="grid grid-cols-2 gap-4 mb-4">
									<div>
										<label className="block text-sm font-medium text-gray-600 mb-2">
											Valor x
										</label>
										<input
											type="number"
											step="any"
											value={x}
											onChange={(e) => setX(e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
											placeholder="Ej: 5.2"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-600 mb-2">
											Error dx
										</label>
										<input
											type="number"
											step="any"
											value={dx}
											onChange={(e) => setDx(e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
											placeholder="Ej: 0.1"
										/>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4 mb-6">
									<div>
										<label className="block text-sm font-medium text-gray-600 mb-2">
											Valor y
										</label>
										<input
											type="number"
											step="any"
											value={y}
											onChange={(e) => setY(e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
											placeholder="Ej: 3.8"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-600 mb-2">
											Error dy
										</label>
										<input
											type="number"
											step="any"
											value={dy}
											onChange={(e) => setDy(e.target.value)}
											className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
											placeholder="Ej: 0.05"
										/>
									</div>
								</div>

								<div className="text-center text-gray-600 mb-4">
									<p>
										x ± dx = {x || "?"} ± {dx || "?"}
									</p>
									<p>
										y ± dy = {y || "?"} ± {dy || "?"}
									</p>
								</div>
							</div>

							{/* Botones de operaciones */}
							<div className="grid grid-cols-2 gap-3">
								<button
									onClick={calculateSum}
									className="flex items-center justify-center gap-2 bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors font-medium"
								>
									<Plus size={20} />
									Suma
								</button>
								<button
									onClick={calculateSubtraction}
									className="flex items-center justify-center gap-2 bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-colors font-medium"
								>
									<Minus size={20} />
									Resta
								</button>
								<button
									onClick={calculateMultiplication}
									className="flex items-center justify-center gap-2 bg-purple-500 text-white py-3 px-4 rounded-lg hover:bg-purple-600 transition-colors font-medium"
								>
									<X size={20} />
									Multiplicación
								</button>
								<button
									onClick={calculateDivision}
									className="flex items-center justify-center gap-2 bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium"
								>
									<Divide size={20} />
									División
								</button>
							</div>

							<button
								onClick={clearAll}
								className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
							>
								Limpiar Todo
							</button>
						</div>

						{/* Resultados */}
						<div className="space-y-6">
							{results ? (
								<div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
									<h2 className="text-xl font-semibold mb-4 text-blue-800">
										Resultado de la {results.operation}
									</h2>

									<div className="space-y-4">
										<div className="bg-white p-4 rounded-lg">
											<p className="text-sm text-gray-600 mb-1">Operación:</p>
											<p className="text-lg font-mono">{results.formula}</p>
										</div>

										<div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
											<p className="text-sm text-gray-600 mb-1">
												📏 Resultado con Cifras Significativas:
											</p>
											<p className="text-3xl font-bold text-green-600">
												{results.measurand} ± {results.error}
											</p>
											<p className="text-xs text-gray-500 mt-1">
												Error: 1 cifra significativa | Mesurando:{" "}
												{results.decimals} decimales
											</p>
										</div>

										<div className="bg-white p-4 rounded-lg">
											<p className="text-sm text-gray-600 mb-1">
												Fórmula del error:
											</p>
											<p className="text-sm font-mono text-gray-800">
												{results.errorFormula}
											</p>
										</div>

										<div className="bg-gray-50 p-4 rounded-lg">
											<p className="text-sm text-gray-600 mb-1">
												🔬 Valores antes del redondeo:
											</p>
											<p className="font-mono text-xs break-all text-gray-700">
												Mesurando: {results.measurandRaw}
											</p>
											<p className="font-mono text-xs break-all text-gray-700">
												Error: {results.errorRaw}
											</p>
										</div>

										<div className="bg-blue-50 p-4 rounded-lg">
											<p className="text-sm text-gray-600 mb-1">
												📊 Análisis de Cifras Significativas:
											</p>
											<div className="text-sm space-y-1">
												<p>
													• Error redondeado a{" "}
													<strong>1 cifra significativa</strong>
												</p>
												<p>
													• Mesurando con{" "}
													<strong>{results.decimals} decimales</strong> (igual
													que el error)
												</p>
												<p>• Redondeo según normas de laboratorio científico</p>
											</div>
										</div>
									</div>
								</div>
							) : (
								<div className="bg-gray-100 p-6 rounded-lg text-center">
									<Calculator
										className="mx-auto mb-4 text-gray-400"
										size={48}
									/>
									<p className="text-gray-600">
										Ingresa los valores y selecciona una operación para ver los
										resultados
									</p>
								</div>
							)}

							{/* Información adicional */}
							<div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
								<h3 className="font-semibold text-green-800 mb-2">
									📏 Reglas de Cifras Significativas
								</h3>
								<ul className="text-sm text-green-700 space-y-1">
									<li>
										• <strong>Error:</strong> Siempre 1 cifra significativa
										(norma laboratorio)
									</li>
									<li>
										• <strong>Mesurando:</strong> Mismos decimales que el error
										redondeado
									</li>
									<li>
										• <strong>Redondeo:</strong> Matemático (0.5 → hacia arriba)
									</li>
									<li>
										• <strong>Ejemplo:</strong> Error 0.0347 → 0.03, entonces
										5.267 → 5.27
									</li>
								</ul>
							</div>
						</div>
					</div>

					<div className="mt-8 text-center text-sm text-gray-500">
						Basado en el código original de Yithsbey Giraldo - Universidad de
						Nariño
					</div>
				</div>
			</div>
		</div>
	);
};

export default PhysicsCalculator;
