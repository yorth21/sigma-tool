import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Header } from "@/components/layout/Header";

export const Route = createRootRoute({
	component: () => (
		<>
			<Header />

			<Outlet />
			<TanStackRouterDevtools />
		</>
	),
	notFoundComponent: () => (
		<div>
			<h1>404 - Not Found</h1>
			<Link to="/">Go back home</Link>
		</div>
	),
});
