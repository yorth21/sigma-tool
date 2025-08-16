import type { Decimal as DecimalType } from "decimal.js";
import type { Decimal } from "@/domain/config";

export interface OperationParams {
	x: Decimal.Value;
	y: Decimal.Value;
	dx: Decimal.Value;
	dy: Decimal.Value;
}

export interface OperationResult {
	measurand: DecimalType;
	uncertainty: DecimalType;
}
