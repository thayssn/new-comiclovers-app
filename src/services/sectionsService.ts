import { useQuery } from "react-query";
import Section from "../types/Section";
import { getSectionsQuery, getSectionByIdQuery } from "../infra/SectionQueries";
import { gqlClient } from "../infra/gqlClient";

const fetchSections = async (): Promise<Section[]> => {
  const { sections } = await gqlClient.request<{ sections: Section[] }>(
    getSectionsQuery()
  );
  return sections;
};

const fetchSection = async (id: string): Promise<Section> => {
  const { section } = await gqlClient.request<{ section: Section }>(
    getSectionByIdQuery(id)
  );
  return section;
};

export const useSections = () => useQuery("sections", fetchSections);

export const useSection = (id: string) =>
  useQuery(["sections", id], () => fetchSection(id));
