import { PropertyFilter } from "@/components/filter-section/PropertyFilter";
import { PropertyListing } from "@/components/PropertyListing";
import { getTotalProperties } from "@/services/getTotalProperties";
import { getRefineFilterParams } from "@/utils/refineFilterParams";
import { Suspense } from "react";
const property = {
  id: "10025",
  title: "JAHRHUNDERTVILLA MIT AUSBAUPOTENZIAL IN KLOSTERNEUBURG",
  location: "3400 Klosterneuburg",
  type: "Haus",
  rooms: 6,
  bathrooms: 3,
  area: 215.96,
  price: 750000.00,
  imageUrl: "/og-image.jpeg",
  views: 171
};

const properties = [property,property,property,property,property,property,property,property];

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

interface IHomePage {
  params: unknown[];
  searchParams: IFilterParams;
}
export default async function Home({ params,searchParams }: IHomePage) {
  console.log(params,"params");
  const refinedFilterCriteria = getRefineFilterParams(searchParams);
  console.log(refinedFilterCriteria,"refinedFilterCriteria");
  //get the total pages in the db 
  const totalPages = await getTotalProperties();
  console.log(totalPages,"totalPages");
  return (
    <div className="relative mt-10 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16  font-[family-name:var(--font-geist-sans)]">
      <Suspense fallback={"loading..."}>
        <PropertyFilter />
      </Suspense>
      <div className="p-2 w-full -mt-8">
        <PropertyListing propertyList={properties} totalPages={totalPages} />
      </div>

    </div>
  );
}
