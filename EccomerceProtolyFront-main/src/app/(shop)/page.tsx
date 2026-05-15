import { BannerSwiper, ProductGrid } from "@/components";

export default async function Home() {
  return (
    <>
      <BannerSwiper />
      <div className="mt-4">
        <ProductGrid />
      </div>
    </>
  );
}
