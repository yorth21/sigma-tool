import { Decimal } from "@/domain/config";
import type { OperationParams, OperationResult } from "@/domain/types";

export function product({ x, y, dx, dy }: OperationParams): OperationResult {
	const X = new Decimal(x);
	const Y = new Decimal(y);
	const DX = new Decimal(dx);
	const DY = new Decimal(dy);

	const measurand = X.times(Y); // times -> product

	const relativeDX = DX.div(X);
	const relativeDY = DY.div(Y);

	const root = relativeDX.pow(2).plus(relativeDY.pow(2)).sqrt();
	const uncertainty = measurand.abs().times(root);

	return { measurand, uncertainty };
}
