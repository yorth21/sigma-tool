import { Decimal } from "@/domain/config";
import type { OperationResult } from "@/domain/types";

export interface ConstantParams {
	a: Decimal.Value; // constante
	x: Decimal.Value; // valor medido
	dx: Decimal.Value; // incertidumbre de x (>= 0)
}

export function constant({ a, x, dx }: ConstantParams): OperationResult {
	const A = new Decimal(a);
	const X = new Decimal(x);
	const DX = new Decimal(dx);

	const measurand = A.times(X);
	const uncertainty = A.abs().times(DX);

	return {
		measurand,
		uncertainty,
	};
}
