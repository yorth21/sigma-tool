import { Calculator } from "lucide-react";

export function Header() {
	return (
		<header className="bg-card border-b border-border shadow-sm">
			<div className="container mx-auto px-4 py-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="p-2 bg-primary rounded-lg">
							<Calculator className="h-8 w-8 text-primary-foreground" />
						</div>
						<div>
							<h1 className="text-2xl font-bold text-foreground">Sigma Tool</h1>
							<p className="text-muted-foreground">
								Herramienta educativa para cálculos de propagación de
								incertidumbres
							</p>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
