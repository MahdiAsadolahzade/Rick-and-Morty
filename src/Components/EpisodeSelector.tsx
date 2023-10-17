import { useState } from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import LoadingSpinner from "./LoadingSpinner";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://rickandmortyapi.com/graphql",
  }),
});

function EpisodeSelector() {
  const [episodeId, setEpisodeId] = useState("");
  const EPISODE_QUERY = gql`
    query Episode($id: ID!) {
      episode(id: $id) {
        id
        name
        air_date
        episode
        created
      }
    }
  `;

  const { loading, error, data } = useQuery(EPISODE_QUERY, {
    variables: { id: episodeId },
    client: client,
  });

  return (
    <div>
      <h2 className="text-3xl bg-black text-white rounded-[25px] text-center p-3 font-semibold mb-4">
        Episode Info
      </h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Episode ID"
          value={episodeId}
          onChange={(e) => setEpisodeId(e.target.value)}
          className="border border-gray-300 p-2 focus:outline-none focus:ring focus:border-blue-500 w-full"
        />
      </div>

      {loading && <LoadingSpinner />}
      {error && (
        <p className="text-center bg-white rounded-[25px] text-red-600">
          Error: {error.message}
        </p>
      )}

      {data && data.episode && (
        <div className="bg-white p-4 rounded shadow mb-4">
          <h3 className="text-xl font-semibold mb-2">{data.episode.name}</h3>
          <p>Air Date: {data.episode.air_date}</p>
          <p>Episode: {data.episode.episode}</p>
        </div>
      )}
    </div>
  );
}

export default EpisodeSelector;
