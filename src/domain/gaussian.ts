// src/domain/gaussian.ts

import type { Decimal as DecimalType } from "decimal.js";
import { Decimal } from "@/domain/config";

export interface GaussianParams {
	data: Decimal.Value[]; // tus x[i]
}

export interface GaussianResult {
	n: number;
	mean: DecimalType; // prom
	stdDev: DecimalType; // sigma (muestral, N-1)
	stdError: DecimalType; // error = sigma / sqrt(N)
}

export function gaussianStats({ data }: GaussianParams): GaussianResult {
	const N = data.length;
	if (N === 0) throw new Error("At least one data point is required.");
	if (N === 1)
		throw new Error("N must be > 1 to compute sample standard deviation.");

	// Suma y promedio
	const sum = data.reduce((acc, v) => {
		const val = new Decimal(acc);
		return new Decimal(val.plus(new Decimal(v)));
	}, new Decimal(0));

	const sumDecimal = new Decimal(sum);

	const mean = sumDecimal.div(N);

	// Suma de cuadrados de diferencias (dos pasadas, estable)
	const sqDiffSum = data.reduce((acc, v) => {
		const Xi = new Decimal(v);
		const diff = Xi.minus(mean);
		const val = new Decimal(acc);
		return val.plus(diff.pow(2));
	}, new Decimal(0));

	const sqDiffSumDecimal = new Decimal(sqDiffSum);

	const stdDev = sqDiffSumDecimal.div(N - 1).sqrt(); // sigma
	const stdError = stdDev.div(new Decimal(N).sqrt()); // error = sigma / sqrt(N)

	return { n: N, mean, stdDev, stdError };
}
