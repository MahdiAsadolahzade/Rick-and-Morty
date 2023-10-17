import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import gql from "graphql-tag";
import LoadingSpinner from "./LoadingSpinner";
import "./CustomOverflow.css";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://rickandmortyapi.com/graphql",
  }),
});

function CharacterSelector() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({
    name: null,
    status: null,
    species: null,
    type: null,
    gender: null,
  });

  const CHARACTERS_QUERY = gql`
    query Characters($page: Int, $filter: FilterCharacter) {
      characters(page: $page, filter: $filter) {
        info {
          count
          pages
          next
          prev
        }
        results {
          id
          name
          status
          species
          type
          gender
          image
          created
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(CHARACTERS_QUERY, {
    variables: { page, filter },
    client: client,
  });

  useEffect(() => {
    if (data && data.characters) {
      setCharacters(data.characters.results);
    }
  }, [data]);

  const handlePageChange = (newPage: any) => {
    setPage(newPage);
  };

  const handleFilterChange = (newFilter: any) => {
    setFilter(newFilter);
    setPage(1);
  };

  return (
    <div className="w-[70vw]  mx-auto h-[100vh] overflow-auto">
      <h2 className="text-3xl bg-black text-white rounded-[25px] text-center p-2 m-2 font-semibold mb-4">
        Characters Selector
      </h2>
      <div className="flex flex-wrap items-center justify-between mb-4">
        <div className="w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0 lg:mb-0">
          <input
            type="text"
            placeholder="Filter by Name"
            value={filter.name || ""}
            onChange={(e) =>
              handleFilterChange({ ...filter, name: e.target.value })
            }
            className="border border-gray-300 p-2 rounded-l focus:outline-none focus:ring focus:border-blue-500 w-full"
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0 lg:mb-0">
          <input
            type="text"
            placeholder="Filter by Type"
            value={filter.type || ""}
            onChange={(e) =>
              handleFilterChange({ ...filter, type: e.target.value })
            }
            className="border border-gray-300 p-2 focus:outline-none focus:ring focus:border-blue-500 w-full"
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3">
          <input
            type="text"
            placeholder="Filter by Species"
            value={filter.species || ""}
            onChange={(e) =>
              handleFilterChange({ ...filter, species: e.target.value })
            }
            className="border border-gray-300 p-2 rounded-r focus:outline-none focus:ring focus:border-blue-500 w-full"
          />
        </div>
      </div>
      {loading && <LoadingSpinner />}
      {error && (
        <p className="text-center bg-white rounded-[25px] text-red-600">
          Error: {error.message}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 custom-overflow h-[70vh]">
        {characters.map((character: any) => (
          <div
            key={character.id}
            className="bg-white border rounded-md shadow-md p-4 cursor-pointer hover:scale-105 transition-transform"
          >
            <h3 className="text-xl font-semibold mb-2">{character.name}</h3>
            <p>Status: {character.status}</p>
            <p>Species: {character.species}</p>
            <p>Type: {character.type}</p>
            <p>Gender: {character.gender}</p>
            <img
              src={character.image}
              alt={character.name}
              className="mx-auto mt-4"
            />
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center space-x-4">
        {data && data.characters && (
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={!data.characters.info.prev}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:bg-blue-700"
          >
            Previous Page
          </button>
        )}
        {data && data.characters && (
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={!data.characters.info.next}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:bg-blue-700"
          >
            Next Page
          </button>
        )}
      </div>
    </div>
  );
}

export default CharacterSelector;
