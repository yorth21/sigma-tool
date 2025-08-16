import type { Decimal as DecimalType } from "decimal.js";
import { Decimal } from "@/domain/config";

export interface SineParams {
	x: Decimal.Value; // valor en radianes
	dx: Decimal.Value; // incertidumbre de x (>= 0)
}

export interface SineResult {
	measurand: DecimalType; // sin(x)
	uncertainty: DecimalType; // |cos(x)| * dx
}

export function sine({ x, dx }: SineParams): SineResult {
	const X = new Decimal(x);
	const DX = new Decimal(dx);

	if (DX.isNeg()) {
		throw new Error("Uncertainty (dx) must be non-negative.");
	}

	// sin(x)
	const measurand = new Decimal(Math.sin(X.toNumber()));

	// σz = |cos(x)| * dx
	const uncertainty = new Decimal(Math.cos(X.toNumber())).abs().times(DX);

	return { measurand, uncertainty };
}
