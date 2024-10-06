import React from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

const Navbar = () => {
	return (
		<nav className="relative top-0 h-full flex items-center justify-between bg-white shadow-sm  w-full">
			<div className="text-xl font-bold p-2">IMMOBILIEN SUCHE</div>
			<div className="hidden md:flex items-center space-x-4 p-2">
				<Button variant="ghost">Kaufen</Button>
				<Button variant="ghost">Mieten</Button>
				<Button variant="ghost">Inserat schalten</Button>
				<Button variant="default">Sign in</Button>
				<Button variant="outline">ENG</Button>
			</div>

			{/* Mobile menu */}
			<div className="md:hidden">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" size="icon">
							<Menu className="h-[1.2rem] w-[1.2rem]" />
							<span className="sr-only">Toggle menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>Kaufen</DropdownMenuItem>
						<DropdownMenuItem>Mieten</DropdownMenuItem>
						<DropdownMenuItem>Inserat schalten</DropdownMenuItem>
						<DropdownMenuItem>Sign in</DropdownMenuItem>
						<DropdownMenuItem>ENG</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</nav>
	);
};

export default Navbar;
