import { useEffect, useState } from "react";

const fetchGames = async (date: string) => {
  const res = await fetch(`/api/host?date=${encodeURIComponent(date)}`);
  if (!res.ok) {
    return [];
  }

  const data = await res.json().catch(() => null);
  if (!data || !data.games) {
    return [];
  }

  const indexes: number[] = [];
  for (const g of data.games) {
    const start = g.startIndex;
    const end = g.endIndex;
    for (let i = start; i <= end; i += 1) {
      indexes.push(i);
    }
  }

  return indexes;
};

export function useReservedIndexes(date: string) {
  const [reservedIndexes, setReservedIndexes] = useState<number[]>([]);

  const refresh = async () => {
    try {
      const indexes = await fetchGames(date);
      setReservedIndexes(indexes);
    } catch (e) {
      console.error(e);
      setReservedIndexes([]);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const fetchReserved = async () => {
      try {
        const indexes = await fetchGames(date);
        if (!cancelled) setReservedIndexes(indexes);
      } catch (e) {
        console.error(e);
        if (!cancelled) setReservedIndexes([]);
      }
    };

    fetchReserved();

    return () => {
      cancelled = true;
    };
  }, [date]);

  return [reservedIndexes, refresh] as const;
}
