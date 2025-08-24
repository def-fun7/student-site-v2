//  page.tsx
import BackgroundVideo from "@/components/BackgroundVideo";
import ThreeDivsLayout from "@/components/ThreeDivsLayout";

export default function Home() {
  return (
    <main className="relative h-screen w-full">
      <BackgroundVideo />
      <div className="absolute inset-0 z-0 ocean-gradient-overlay">
        <ThreeDivsLayout />
      </div>

    </main >
  );
}
