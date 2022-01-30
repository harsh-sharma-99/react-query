import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHero = (id) => {
  return axios.get(`http://localhost:4000/superheroes/${id}`);
};

export const useSuperHeroData = (heroId) => {
  return useQuery(["super-hero", heroId], () => fetchSuperHero(heroId));
};
