import { PropertyListing } from "@/components/PropertyListing";
import { getFilterProperties } from "@/services";
// const property = {
//   id: "10025",
//   title: "JAHRHUNDERTVILLA MIT AUSBAUPOTENZIAL IN KLOSTERNEUBURG",
//   location: "3400 Klosterneuburg",
//   type: "Haus",
//   rooms: 6,
//   bathrooms: 3,
//   area: 215.96,
//   saleType:"BUY",
//   price: 750000.00,
//   imageUrl: "/og-image.jpeg",
//   views: 171
// };


export interface IFilterParams {
  location?: string;
  type?: string;
  priceMin?: string;
  priceMax?: string;
  areaMin?: string;
  areaMax?: string;
  rooms?: string | string[];
  saleType?: string;
  currentPage: string;
}
import { type SearchParams } from 'nuqs/server'

interface IHomePage {
  params: unknown[];
  searchParams: SearchParams;
}
export const dynamic = 'force-dynamic'

export default async function Home({ params,searchParams }: IHomePage) {
  // const refinedFilterCriteria = getRefineFilterParams(searchParams);
  console.log("search params",searchParams,params);

  const { properties,totalPages } = await getFilterProperties({ params: searchParams });
  // console.log(properties,"-----")
  return (
    <div className="h-full w-full mt-10 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16  font-[family-name:var(--font-geist-sans)]">
      <PropertyListing propertyList={properties} totalPages={totalPages} params={JSON.stringify(searchParams)} />
    </div>
  );
}
