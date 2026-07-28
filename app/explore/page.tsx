import { HeroSlider } from "@/components/hero-slider";
import { SearchWidget } from "@/components/search-widget";

export default function Home() {
  return (
    <div className="relative flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      <HeroSlider />
      
      <div className="relative z-10 w-full px-4 pt-20 pb-32 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight drop-shadow-xl mb-6">
          Find your next stay
        </h1>
        <p className="text-lg md:text-2xl text-white/90 drop-shadow-md mb-12 max-w-2xl font-light">
          Search low prices on hotels, luxury resorts, villas and much more...
        </p>
        
        <SearchWidget />
      </div>
    </div>
  );
}
