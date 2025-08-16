import Decimal from "decimal.js";

Decimal.set({
	precision: 20, // Cifras significativas máximas
	rounding: Decimal.ROUND_HALF_UP, // Redondeo estándar
	toExpNeg: -9, // Usar notación normal hasta 1e-9
	toExpPos: 20, // Usar notación normal hasta 1e+20
});

export { Decimal };
