export type Paging = {
  current_page: number;
  page_size: number;
  total_results: number;
  total_pages: number;
}

export type Pageable<T> = {
  data: T[];
  paging: Paging;
}
