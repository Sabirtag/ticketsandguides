import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CityCard from "./CityCard";
import { City } from "./types";
interface CityTabsProps {
  cities: City[];
  activeTab: string;
  onTabChange: (value: string) => void;
  onCityClick: (cityId: number) => void;
}
const CityTabs: React.FC<CityTabsProps> = ({
  cities,
  activeTab,
  onTabChange,
  onCityClick
}) => {
  return <Tabs defaultValue={activeTab} className="w-full">
      <TabsList className="w-full justify-start overflow-x-auto space-x-2 bg-transparent h-auto pb-2 mb-6 border-b scrollbar-none">
        {cities.slice(0, 6).map(city => <TabsTrigger key={city.id} value={city.name} onClick={() => onTabChange(city.name)} className="bg-[rgba(100,73,37,255)] text-white hover:bg-[rgba(100,73,37,0.9)]">
            {city.name}
          </TabsTrigger>)}
      </TabsList>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {cities.map(city => city.name === activeTab && <CityCard key={city.id} city={city} onCityClick={onCityClick} />)}
      </div>
    </Tabs>;
};
export default CityTabs;