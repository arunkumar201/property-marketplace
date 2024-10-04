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
			}, 100);
		} catch (error) {
			reject(error);
		}
	});
};