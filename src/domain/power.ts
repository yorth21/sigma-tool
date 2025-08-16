import type { Decimal as DecimalType } from "decimal.js";
import { Decimal } from "@/domain/config";

export interface PowerParams {
	x: Decimal.Value; // valor medido
	dx: Decimal.Value; // incertidumbre de x (>= 0)
	n: Decimal.Value; // exponente (constante)
}

export interface PowerResult {
	measurand: DecimalType; // z = x^n
	uncertainty: DecimalType; // σz = |n * x^(n-1)| * dx
}

export function power({ x, dx, n }: PowerParams): PowerResult {
	const X = new Decimal(x);
	const DX = new Decimal(dx);
	const N = new Decimal(n);

	if (DX.isNeg()) {
		throw new Error("Uncertainty (dx) must be non-negative.");
	}

	// z = x^n
	const measurand = X.pow(N);

	// σz = |n * x^(n-1)| * dx
	const derivative = N.times(X.pow(N.minus(1)));
	const uncertainty = derivative.abs().times(DX);

	return { measurand, uncertainty };
}
