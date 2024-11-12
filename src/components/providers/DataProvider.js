// import axios from 'axios';
// import { createContext, useContext, useEffect, useMemo, useState } from 'react';

// const API_URL = 'https://rickandmortyapi.com/api/character/';

// export function DataProvider({ children }) {
//   const [activePage, setActivePage] = useState(1);
//   const [characters, setCharacters] = useState([]);
//   const [isFetching, setIsFetching] = useState(false);
//   const [isError, setIsError] = useState(false);
//   const [info, setInfo] = useState({});
//   const [apiURL, setApiURL] = useState(API_URL);
//   const [filters, setFilters] = useState({
//     name: '',
//     status: '',
//     species: '',
//     type: '',
//     gender: '',
//     page: 1
//   });
//   const [reset, setReset] = useState(false);

//   useEffect(() => {
//     const query = new URLSearchParams(filters).toString();
//     setApiURL(`${API_URL}?${query}`);
//   }, [filters]);

//   const updateFilters = (field, value) => {
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       [field]: value
//     }));
//   };

//   useEffect(() => {
//     const updateFiltersFromURL = () => {
//       const searchParams = new URLSearchParams(window.location.search);
//       const newFilters = {
//         name: searchParams.get('name') || '',
//         status: searchParams.get('status') || '',
//         species: searchParams.get('species') || '',
//         type: searchParams.get('type') || '',
//         gender: searchParams.get('gender') || '',
//         page: searchParams.get('page') || 1
//       };
//       setFilters(newFilters);
//     };

//     updateFiltersFromURL();
//     const handlePopState = () => {
//       updateFiltersFromURL();
//     };
//     window.addEventListener('popstate', handlePopState);
//     return () => {
//       window.removeEventListener('popstate', handlePopState);
//     };
//   }, []);

//   useEffect(() => {
//     if (reset) {
//       setReset(false);
//     }
//   }, [reset]);

//   const triggerReset = () => {
//     setFilters({ name: '', status: '', species: '', type: '', gender: '' });
//     setReset(true);
//     setActivePage(1);
//   };

//   const fetchData = async (url) => {
//     setIsFetching(true);
//     setIsError(false);

//     axios
//       .get(url)
//       .then(({ data }) => {
//         setIsFetching(false);
//         setCharacters(data.results);
//         setInfo(data.info);
//       })
//       .catch((e) => {
//         setIsFetching(false);
//         setIsError(true);
//         console.error(e);
//       });
//   };

//   useEffect(() => {
//     fetchData(apiURL);
//   }, [apiURL]);

//   const dataValue = useMemo(
//     () => ({
//       activePage,
//       setActivePage,
//       apiURL,
//       setApiURL,
//       characters,
//       isFetching,
//       isError,
//       info,
//       updateFilters,
//       reset,
//       triggerReset
//     }),
//     [activePage, apiURL, characters, isFetching, isError, info, reset]
//   );

//   return (
//     <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
//   );
// }

// const DataContext = createContext({});

// export const useData = () => useContext(DataContext);

import axios from 'axios';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const API_URL = 'https://rickandmortyapi.com/api/character/';

export function DataProvider({ children }) {
  const getInitialFilters = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return {
      name: searchParams.get('name') || '',
      status: searchParams.get('status') || '',
      species: searchParams.get('species') || '',
      type: searchParams.get('type') || '',
      gender: searchParams.get('gender') || '',
      page: parseInt(searchParams.get('page'), 10) || 1
    };
  };

  const [filters, setFilters] = useState(getInitialFilters);
  const [activePage, setActivePage] = useState(filters.page);
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  const [apiURL, setApiURL] = useState(
    `${API_URL}?${new URLSearchParams(filters).toString()}`
  );
  const [reset, setReset] = useState(false);

  const updateFilters = (field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value
    }));
  };

  const updateFiltersFromURL = () => {
    const searchParams = new URLSearchParams(window.location.search);
    setFilters({
      name: searchParams.get('name') || '',
      status: searchParams.get('status') || '',
      species: searchParams.get('species') || '',
      type: searchParams.get('type') || '',
      gender: searchParams.get('gender') || '',
      page: parseInt(searchParams.get('page'), 10) || 1
    });
  };

  useEffect(() => {
    window.addEventListener('popstate', updateFiltersFromURL);
    return () => {
      window.removeEventListener('popstate', updateFiltersFromURL);
    };
  }, []);

  useEffect(() => {
    if (reset) {
      setReset(false);
    }
  }, [reset]);

  useEffect(() => {
    const query = new URLSearchParams(filters).toString();
    setApiURL(`${API_URL}?${query}`);
    window.history.replaceState({}, '', `?${query}`);
  }, [filters]);

  const triggerReset = () => {
    setFilters({
      name: '',
      status: '',
      species: '',
      type: '',
      gender: '',
      page: 1
    });
    setReset(true);
    setActivePage(1);
  };

  const fetchData = async (url) => {
    setIsFetching(true);
    setIsError(false);

    axios
      .get(url)
      .then(({ data }) => {
        setIsFetching(false);
        setCharacters(data.results);
        setInfo(data.info);
      })
      .catch((e) => {
        setIsFetching(false);
        setIsError(true);
        console.error(e);
      });
  };

  useEffect(() => {
    fetchData(apiURL);
  }, [apiURL]);

  const dataValue = useMemo(
    () => ({
      activePage,
      setActivePage,
      apiURL,
      setApiURL,
      characters,
      isFetching,
      isError,
      info,
      updateFilters,
      reset,
      triggerReset
    }),
    [activePage, apiURL, characters, isFetching, isError, info, reset]
  );

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}

const DataContext = createContext({});

export const useData = () => useContext(DataContext);
