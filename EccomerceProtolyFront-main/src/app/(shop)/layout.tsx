import { TopMenu } from "@/components";

export default function ShopLayout({ children }: { children: React.ReactNode; }) {
  return (
    <main className="relative min-h-screen bg-surface">
      <TopMenu />
      <div className="pt-32">
        {children}
      </div>
    </main>
  );
}
