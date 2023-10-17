import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import gql from "graphql-tag";
import LoadingSpinner from "./LoadingSpinner";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://rickandmortyapi.com/graphql",
  }),
});

function CharacterSelector() {
  const [characterId, setCharacterId] = useState("");
  const [characterData, setCharacterData] = useState<any | null>(null);

  const GET_CHARACTER = gql`
    query GetCharacter($id: ID!) {
      character(id: $id) {
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
  `;

  const { loading, error } = useQuery(GET_CHARACTER, {
    variables: { id: characterId },
    client: client,
  });

  const handleCharacterIdChange = (event: any) => {
    setCharacterId(event.target.value);
  };

  const handleGetCharacter = () => {
    setCharacterData(null);
    client
      .query({
        query: GET_CHARACTER,
        variables: { id: characterId },
      })
      .then((response) => {
        const character = response.data.character;
        setCharacterData(character);
      })
      .catch((error) => {
        console.error("GraphQL request error:", error);
      });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-3xl bg-black text-white rounded-[25px] text-center p-3 font-semibold mb-4">
        Character Selector
      </h2>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Enter Character ID"
          value={characterId}
          onChange={handleCharacterIdChange}
          className="flex-grow border border-gray-300 p-2 rounded-l focus:outline-none focus:ring focus:border-blue-500"
        />
        <button
          onClick={handleGetCharacter}
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-700 focus:outline-none focus:ring focus:bg-blue-700"
        >
          Get Character
        </button>
      </div>

      {loading && <LoadingSpinner />}
      {error && (
        <p className="text-center bg-white rounded-[25px] text-red-600">
          Error: {error.message}
        </p>
      )}

      {characterData && (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">{characterData.name}</h3>
          <p>Status: {characterData.status}</p>
          <p>Species: {characterData.species}</p>
          <p>Type: {characterData.type}</p>
          <p>Gender: {characterData.gender}</p>
          <img
            src={characterData.image}
            alt={characterData.name}
            className="mx-auto mt-4"
          />
        </div>
      )}
    </div>
  );
}

export default CharacterSelector;
