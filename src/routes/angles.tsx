import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/angles")({
	component: Angles,
});

function Angles() {
	return <div>Hello "/angles"!</div>;
}
