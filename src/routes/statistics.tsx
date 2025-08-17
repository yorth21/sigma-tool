import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/statistics")({
	component: Statistics,
});

function Statistics() {
	return <div>Hello "/statistics"!</div>;
}
