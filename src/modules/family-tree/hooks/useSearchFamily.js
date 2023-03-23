import { useCallback, useState } from 'react';

const useSearchFamily = () => {
  const [search, setSearch] = useState('');
  const [searchFocusIndex, setSearchFocusIndex] = useState(null);
  const [searchFoundCount, setSearchFoundCount] = useState(null);

  const onSearchChange = useCallback(event => {
    setSearch(event?.target?.value || '');
  }, []);

  const customSearchMethod = useCallback(({ node, searchQuery }) => {
    const searchQ = searchQuery || '';
    return searchQuery && node.name?.toLowerCase().indexOf(searchQ?.toLowerCase()) > -1;
  }, []);

  const selectPrevMatch = useCallback(
    () =>
      setSearchFocusIndex(
        searchFocusIndex !== null
          ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
          : searchFoundCount - 1
      ),
    [searchFocusIndex, searchFoundCount]
  );
  const selectNextMatch = useCallback(
    event => {
      event?.preventDefault();
      setSearchFocusIndex(
        searchFocusIndex !== null ? (searchFocusIndex + 1) % searchFoundCount : 0
      );
    },
    [searchFocusIndex, searchFoundCount]
  );

  const searchFinishCallback = useCallback(
    matches => {
      setSearchFocusIndex(matches.length > 0 ? searchFocusIndex % matches.length : 0);
      setSearchFoundCount(matches.length);
    },
    [searchFocusIndex]
  );

  return {
    search,
    searchFocusIndex,
    searchFoundCount,
    onSearchChange,
    customSearchMethod,
    selectPrevMatch,
    selectNextMatch,
    searchFinishCallback,
  };
};

export default useSearchFamily;
