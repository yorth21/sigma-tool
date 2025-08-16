import type { Decimal as DecimalType } from "decimal.js";
import { Decimal } from "@/domain/config";

export interface CosineParams {
	x: Decimal.Value; // valor en radianes
	dx: Decimal.Value; // incertidumbre de x (>= 0)
}

export interface CosineResult {
	measurand: DecimalType; // cos(x)
	uncertainty: DecimalType; // |sin(x)| * dx
}

export function cosine({ x, dx }: CosineParams): CosineResult {
	const X = new Decimal(x);
	const DX = new Decimal(dx);

	if (DX.isNeg()) {
		throw new Error("Uncertainty (dx) must be non-negative.");
	}

	// cos(x)
	const measurand = new Decimal(Math.cos(X.toNumber()));

	// σz = |sin(x)| * dx
	const uncertainty = new Decimal(Math.sin(X.toNumber())).abs().times(DX);

	return { measurand, uncertainty };
}
