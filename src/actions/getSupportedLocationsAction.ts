"use server";

// List of locations (do the third party API calls to get the result)
const locations = [
	"Wien",
	"Burgenland",
	"Niederösterreich",
	"Salzburg",
	"Oberösterreich",
	"Steiermark",
	"Tirol",
	"Vorarlberg",
	"Kärnten",
	"Schweiz",
	"Andaman und Nicobar Islands",
	"Australien",
	"Bahamas",
	"Barbados",
	"Belize",
	"Bermuda",
	"Bolivia",
	"Brasilien",
	"Brunei Darussalam",
];

export const getSupportedLocationsAction = async (
	searchTerm: string
): Promise<string[]> => {
	return new Promise((resolve, reject) => {
		try {
			setTimeout(() => {
				const filteredLocations = locations.filter((loc) =>
					loc.toLowerCase().includes(searchTerm.toLowerCase())
				);
				resolve(filteredLocations);
			}, 50);
		} catch (error) {
			reject(error);
		}
	});
};
