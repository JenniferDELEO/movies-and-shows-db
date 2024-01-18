export type People = {
  adulte: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  popularity: number;
  profile_path: string | null;
  known_for: any[];
};

export type ApiResultPeople = {
  page: number;
  results: People[];
  total_pages: number;
  total_results: number;
};
