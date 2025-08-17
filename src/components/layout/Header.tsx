import { Link } from "@tanstack/react-router";
import { Calculator, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

const NAV = [
	{ to: "/", label: "Básica" },
	{ to: "/angles", label: "Ángulos" },
	{ to: "/advanced", label: "Avanzada" },
	{ to: "/statistics", label: "Estadística" },
];

export function Header() {
	return (
		<header className="sticky top-0 z-40 bg-card/80 backdrop-blur border-b border-border">
			<div className="container mx-auto px-4">
				<div className="flex h-16 items-center justify-between">
					{/* Brand */}
					<div className="flex items-center gap-3">
						<div className="p-2 bg-primary rounded-xl">
							<Calculator className="h-5 w-5 text-primary-foreground" />
						</div>
						<span className="text-lg font-semibold tracking-tight">
							Sigma Tool
						</span>
					</div>

					{/* Desktop nav */}
					<nav className="hidden md:flex items-center gap-6">
						{NAV.map(({ to, label }) => (
							<Link
								key={to}
								to={to}
								activeOptions={{ exact: to === "/" }} // exact en Home
								activeProps={{
									className:
										"text-foreground font-semibold underline underline-offset-4",
									"aria-current": "page",
								}}
								inactiveProps={{
									className:
										"text-muted-foreground hover:text-foreground transition-colors",
								}}
							>
								{label}
							</Link>
						))}
					</nav>

					{/* Mobile: hamburger */}
					<div className="md:hidden">
						<MobileNav />
					</div>
				</div>
			</div>
		</header>
	);
}

function MobileNav() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" aria-label="Abrir menú">
					<Menu className="h-5 w-5" />
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="w-80 p-0">
				<SheetHeader className="px-4 pb-2 pt-4">
					<SheetTitle className="flex items-center gap-2">
						<span className="inline-flex p-2 bg-primary rounded-lg">
							<Calculator className="h-5 w-5 text-primary-foreground" />
						</span>
						Sigma Tool
					</SheetTitle>
				</SheetHeader>
				<Separator />
				<nav className="flex flex-col p-2">
					{NAV.map(({ to, label }) => (
						<Link
							key={to}
							to={to}
							activeOptions={{ exact: to === "/" }}
							activeProps={{
								className:
									"mx-2 my-1 rounded-lg px-3 py-2 bg-accent text-foreground font-medium",
								"aria-current": "page",
							}}
							inactiveProps={{
								className:
									"mx-2 my-1 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors",
							}}
						>
							{label}
						</Link>
					))}
				</nav>
			</SheetContent>
		</Sheet>
	);
}
