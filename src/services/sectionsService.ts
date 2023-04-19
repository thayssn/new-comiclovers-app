import api from "../infra/api";
import { useQuery } from "react-query";
import Section from "../types/Section";

const fetchSections = async (): Promise<Section[]> => {
  const { data } = await api.get<Section[]>("sections");
  return data;
};

export const useSections = () => useQuery("curated", fetchSections);

const fetchSection = async (slug: string): Promise<Section> => {
  const { data } = await api.get<Section>(`sections/${slug}`);
  return data;
};

export const useSection = (slug: string) =>
  useQuery(["sections", slug], () => fetchSection(slug));
