import { useState } from "react";
import CharacterSelector from "./CharacterSelector";
import CharactersSelector from "./CharactersSelector";
import LocationSelector from "./LocationSelector";
import LocationsSelector from "./LocationsSelector";
import EpisodeSelector from "./EpisodeSelector";
import EpisodesSelector from "./EpisodesSelector";
import Icons from "../assets/Icons/Icons";

interface QuerySelectorProps {
  onSelectQuery: (query: string | null) => void;
}

function QuerySelector({ onSelectQuery }: QuerySelectorProps) {
  const queries = [
    "Character",
    "Characters",
    "location",
    "locations",
    "episode",
    "episodes",
  ];

  const [selectedQuery, setSelectedQuery] = useState<string | null>(null);
  const [choosed, setChoosed] = useState(false);

  const handleQuerySelect = (query: string) => {
    setSelectedQuery(query);
    onSelectQuery(query === "" ? null : query);
    setChoosed(!choosed);
  };

  return (
    <div>
      {choosed ? (
        <div>
          {selectedQuery === "Character" && (
            <CharacterSelector></CharacterSelector>
          )}
          {selectedQuery === "Characters" && (
            <CharactersSelector></CharactersSelector>
          )}
          {selectedQuery === "location" && (
            <LocationSelector></LocationSelector>
          )}
          {selectedQuery === "locations" && (
            <LocationsSelector></LocationsSelector>
          )}
          {selectedQuery === "episode" && <EpisodeSelector></EpisodeSelector>}
          {selectedQuery === "episodes" && (
            <EpisodesSelector></EpisodesSelector>
          )}
        </div>
      ) : (
        <div>
          <div className="flex flex-col justify-center items-center p-2 m-2">
            {Icons.rick}
            <p className="text-2xl">what are you looking for ?</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {queries.map((query, index) => (
              <div
                key={index}
                onClick={() => handleQuerySelect(query)}
                className="bg-white border rounded-md shadow-md p-4  cursor-pointer hover:scale-105 transition-transform min-w-[200px] w-[20vw] h-auto"
              >
                {query}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default QuerySelector;
