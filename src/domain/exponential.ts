import { Decimal } from "@/domain/config";
import type { OperationResult } from "@/domain/types";

export interface ExponentialParams {
	x: Decimal.Value; // valor medido
	dx: Decimal.Value; // incertidumbre de x (>= 0)
}

export function exponential({ x, dx }: ExponentialParams): OperationResult {
	const X = new Decimal(x);
	const DX = new Decimal(dx);

	const measurand = X.exp();
	const uncertainty = measurand.times(DX);

	return { measurand, uncertainty };
}
