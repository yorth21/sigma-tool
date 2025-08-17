import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/advanced")({
	component: Advanced,
});

function Advanced() {
	return <div>Hello "/advanced"!</div>;
}
