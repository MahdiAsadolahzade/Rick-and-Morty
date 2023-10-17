import { useState } from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import LoadingSpinner from "./LoadingSpinner";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import "./CustomOverflow.css";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://rickandmortyapi.com/graphql",
  }),
});

function LocationSelector() {
  const [locationId, setLocationId] = useState("");
  const LOCATION_QUERY = gql`
    query Location($id: ID!) {
      location(id: $id) {
        id
        name
        type
        dimension
        created
        residents {
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

  const { loading, error, data } = useQuery(LOCATION_QUERY, {
    variables: { id: locationId },
    client: client,
  });

  return (
    <div className="">
      <h2 className="text-3xl bg-black text-white rounded-[25px] text-center p-3 font-semibold mb-4">
        Location Selector
      </h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Location ID"
          value={locationId}
          onChange={(e) => setLocationId(e.target.value)}
          className="border border-gray-300 p-2 focus:outline-none focus:ring focus:border-blue-500 w-full"
        />
      </div>

      {loading && <LoadingSpinner />}
      {error && (
        <p className="text-center bg-white rounded-[25px] text-red-600">
          Error: {error.message}
        </p>
      )}

      {data && data.location && (
        <div className="bg-white p-4 rounded shadow mb-4">
          <h3 className="text-xl font-semibold mb-2">{data.location.name}</h3>
          <p>Type: {data.location.type}</p>
          <p>Dimension: {data.location.dimension}</p>
        </div>
      )}
      <div className="bg-black text-white font-bold text-xl rounded-[25px] text-center m-1">
        residents
      </div>
      {data && data.location && data.location.residents && (
        <div className="bg-white p-4 rounded shadow custom-overflow h-[50vh]">
          <h3 className="text-xl font-semibold mb-2">Residents</h3>
          {data.location.residents.map((resident: any) => (
            <div
              key={resident.id}
              className="bg-white border rounded-md shadow-md p-4 cursor-pointer hover:scale-105 transition-transform mb-2 "
            >
              <h4 className="text-lg font-semibold mb-2">{resident.name}</h4>
              <p>Status: {resident.status}</p>
              <p>Species: {resident.species}</p>
              <p>Type: {resident.type}</p>
              <p>Gender: {resident.gender}</p>
              <img
                src={resident.image}
                alt={resident.name}
                className="mx-auto mt-4"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LocationSelector;
