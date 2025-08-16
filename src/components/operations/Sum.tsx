import { useEffect } from "react";
import { sum } from "@/domain/sum";

export function Sum() {
	useEffect(() => {
		const params = { x: "3.3", y: "7.25", dx: "0.2", dy: "0.02" };

		const result = sum(params);

		console.log(result.measurand.toString());
		console.log(result.uncertainty.toString());
	}, []);
	return <div>Suma</div>;
}
