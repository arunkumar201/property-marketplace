import React from 'react';
import { YoutubeIcon } from 'lucide-react';

const Footer = () => {
	return (
		<footer className="bg-[#33443C] text-white p-8 mt-12">
			<div className="container mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div className='flex flex-col gap-y-4'>
						<div>
							<h2 className="font-bold">Fylpi Immo-online GmbH</h2>
							<address className="not-italic">
								Forchheimergrasse 3/13, 1230 Wien, Österreich
							</address>
						</div>
						<p className="mt-2">
							<a href="mailto:office@fylpi.at" className="hover:underline">office@fylpi.at</a> | <a href="https://www.fylpi.at" className="hover:underline">www.fylpi.at</a>
						</p>
						<a href="https://www.youtube.com" className="inline-flex items-center mt-2 hover:text-gray-300">
							<YoutubeIcon size={24} className="mr-2" />
							YouTube
						</a>
					</div>

					<nav>
						<h3 className="font-bold mb-4">Über uns</h3>
						<ul className='flex flex-col gap-y-1'>
							<li><a href="#" className="hover:underline">Kontaktieren Sie uns</a></li>
							<li><a href="#" className="hover:underline">Mein Konto</a></li>
							<li><a href="#" className="hover:underline">Kaufen</a></li>
							<li><a href="#" className="hover:underline">Mieten</a></li>
						</ul>
					</nav>

					<nav>
						<h3 className="font-bold mb-4">FAQ</h3>
						<ul className='flex flex-col gap-y-1'>
							<li><a href="#" className="hover:underline">Service rund um die Immobilie</a></li>
							<li><a href="#" className="hover:underline">Praktische Anleitungen</a></li>
							<li><a href="#" className="hover:underline">Wissen rund um die Immobilie</a></li>
							<li><a href="#" className="hover:underline">Beratungsdienste</a></li>
						</ul>
					</nav>

				</div>

				<hr className="my-8 border-gray-600" />

				<div className="flex flex-col md:flex-row justify-between items-center">
					<p>&copy; 2024 Fylpi. Alle Rechte vorbehalten.</p>
					<nav>
						<ul className="flex space-x-4 mt-4 md:mt-0">
							<li><a href="#" className="hover:underline">Impressum</a></li>
							<li><a href="#" className="hover:underline">Nutzungsbedingungen</a></li>
						</ul>
					</nav>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
