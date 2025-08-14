export function suma({
	x,
	y,
	dx,
	dy,
}: {
	x: number;
	y: number;
	dx: number;
	dy: number;
}): { result: number; dresult: number } {
	return { result: x + y + dx + dy, dresult: 0 };
}
