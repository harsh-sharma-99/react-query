import { useQuery } from "react-query";
import axios from "axios";

const fetchData = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery("super-heroes", fetchData, {
    onSuccess,
    onError,
    select: (data) => {
      const superHeroNames = data?.data.map((hero) => hero.name);
      return superHeroNames;
    },
  });
};
