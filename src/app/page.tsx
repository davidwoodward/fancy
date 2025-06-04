'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface StateData {
  state: string;
  counties: string[];
}

export default function Home() {
  const [statesData, setStatesData] = useState<StateData[]>([]);
  const [selectedState, setSelectedState] = useState<StateData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/states-counties.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStatesData(data);
      } catch (e: any) {
        console.error("Failed to load states data:", e);
        setError(`Failed to load states data: ${e.message}`);
      }
    }
    fetchData();
  }, []);

  const handleStateClick = (stateName: string) => {
    const state = statesData.find(s => s.state === stateName);
    setSelectedState(state || null);
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-green-50 text-green-900">
      <header className="w-full bg-green-700 p-6 shadow-md">
        <h1 className="text-4xl font-bold text-center text-green-50">Fancy</h1>
      </header>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="flex flex-row w-full max-w-5xl p-8 space-x-8">
        <div className="w-1/3 bg-green-100 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4 text-green-800">States</h2>
          {statesData.length > 0 ? (
            <ul className="space-y-2">
              {statesData.map((s) => (
                <li key={s.state}>
                  <Link
                    href={`#${s.state.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => handleStateClick(s.state)}
                    className={`block p-3 rounded-md hover:bg-green-300 transition-colors
                                ${selectedState?.state === s.state ? 'bg-green-300 font-semibold' : 'bg-green-200'}`}
                  >
                    {s.state}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            !error && <p>Loading states...</p>
          )}
        </div>

        <div className="w-2/3 bg-green-100 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4 text-green-800">
            {selectedState ? `${selectedState.state} Counties` : 'Select a State to see Counties'}
          </h2>
          {selectedState && selectedState.counties.length > 0 ? (
            <ul className="space-y-2 max-h-96 overflow-y-auto">
              {selectedState.counties.map((county) => (
                <li key={county} className="p-3 bg-green-200 rounded-md">
                  {county}
                </li>
              ))}
            </ul>
          ) : (
            selectedState && <p>No counties found for {selectedState.state}.</p>
          )}
        </div>
      </div>
    </main>
  );
}
