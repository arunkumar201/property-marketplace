export const truncateText = (text: string, maxLength: number) => {
	return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};
//currency formatter 
export const formatCurrency = (locals:string,value: number, currency: string) => {
    return new Intl.NumberFormat(locals, {
			style: "currency",
			currency: currency,
		}).format(value);
};
