import React from "react";
import { useSuperHeroesData } from "../hooks/useSuperHerosData";

export const RQSuperHeroesPage = () => {
  const onSuccess = (data) => {
    console.log("Perform side effect after data fetch", data);
  };

  const onError = (error) => {
    console.log("Perform side effect after encountering error", error);
  };
  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError);

  if (isLoading || isFetching) {
    return <h1>Loading ...</h1>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      <button onClick={refetch}>Call Heroes</button>

      {data?.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })}
    </>
  );
};
