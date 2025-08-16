import { Decimal } from "@/domain/config";
import type { OperationParams, OperationResult } from "@/domain/types";

export function naturalLog({ x, dx }: OperationParams): OperationResult {
	const X = new Decimal(x);
	const DX = new Decimal(dx);

	const measurand = X.ln();
	const uncertainty = DX.div(X);

	return { measurand, uncertainty };
}
