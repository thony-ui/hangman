import { useQuery } from "@tanstack/react-query";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const useGetWord = () => {
  return useQuery({
    queryKey: ["word"],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/word`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    },
  });
};
