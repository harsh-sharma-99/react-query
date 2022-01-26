import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";

const fetchData = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const RQSuperHeroesPage = () => {
  const [interval, setInterval] = useState(3000);

  const onSuccess = (data) => {
    console.log("Perform side effect after data fetch", data);
    if (data.length === 4) {
      setInterval(false);
      console.log("set flase");
    }
  };

  const onError = (error) => {
    console.log("Perform side effect after encountering error", error);
  };
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "super-heroes",
    fetchData,
    {
      refetchInterval: interval,
      refetchIntervalInBackground: true,
      onSuccess,
      onError,
      select: (data) => {
        const superHeroNames = data?.data.map((hero) => hero.name);
        return superHeroNames;
      },
    }
  );

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
      {/* {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })} */}
      {data?.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })}
    </>
  );
};
