import { Decimal } from "@/domain/config";
import type { OperationParams, OperationResult } from "@/domain/types";

export function sum({ x, y, dx, dy }: OperationParams): OperationResult {
	const X = new Decimal(x);
	const Y = new Decimal(y);
	const DX = new Decimal(dx);
	const DY = new Decimal(dy);

	const measurand = X.plus(Y);
	const uncertainty = DX.pow(2).plus(DY.pow(2)).sqrt();

	return { measurand, uncertainty };
}
