import { useState, useEffect } from "react";
import QuerySelector from "./QuerySelector";
import "./PageLoading.css";
import "./Background.css";

function PageLoading() {
  const [isLoading, setIsLoading] = useState(true);
  const [, setSelectedQuery] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleQuerySelect = (query: string | null) => {
    setSelectedQuery(query);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-14 h-14 grid animate-shapes-9tptoo">
          <div className="before-after"></div>
          <div className="before-after after-reverse"></div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center h-screen custom-background">
        <QuerySelector onSelectQuery={handleQuerySelect} />
      </div>
    );
  }
}

export default PageLoading;
