import { useState, useEffect } from 'react';

const useSearchLs = (initialValue: string) => {
  const [searching, setSearching] = useState<string>(
    localStorage.getItem('searching') || initialValue
  );

  useEffect(() => {
    localStorage.setItem('searching', searching);
  }, [searching]);

  return [searching, setSearching] as const;
};

export default useSearchLs;
