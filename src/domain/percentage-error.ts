import type { Decimal as DecimalType } from "decimal.js";
import { Decimal } from "@/domain/config";

export interface PercentageErrorParams {
	theoretical: Decimal.Value; // valor teórico
	experimental: Decimal.Value; // valor experimental
}

export interface PercentageErrorResult {
	errorPercent: DecimalType; // error relativo porcentual (%)
}

export function percentageError({
	theoretical,
	experimental,
}: PercentageErrorParams): PercentageErrorResult {
	const T = new Decimal(theoretical);
	const E = new Decimal(experimental);

	if (T.isZero()) {
		throw new Error("Theoretical value must be non-zero (division by zero).");
	}

	const errorPercent = T.minus(E).div(T).abs().times(100);

	return { errorPercent };
}
