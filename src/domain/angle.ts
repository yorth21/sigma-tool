import type { Decimal as DecimalType } from "decimal.js";
import { Decimal } from "@/domain/config";

export interface AngleParams {
	x: Decimal.Value; // valor en cm
}

export interface AngleResult {
	angleRad: DecimalType; // ángulo en radianes
	angleDeg: DecimalType; // ángulo en grados
}

export function angleFromInclinedPlane({ x }: AngleParams): AngleResult {
	const X = new Decimal(x);

	// 1 - x^2 / 2380.5
	const inside = new Decimal(1).minus(X.pow(2).div(2380.5));

	// Validación de dominio
	if (inside.lt(-1) || inside.gt(1)) {
		throw new Error("acos argument out of range [-1, 1]. Check input x.");
	}

	// ángulo en radianes
	const thetaRad = new Decimal(Math.acos(inside.toNumber()));

	// convertir a grados
	const thetaDeg = thetaRad.times(180).div(Math.PI);

	return { angleRad: thetaRad, angleDeg: thetaDeg };
}
