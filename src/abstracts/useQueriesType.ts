import { UseQueryResult } from "@tanstack/react-query";
import { Item } from "./ItemTypes";

export type UseQueriesType = {
  multiQuerySearchResults: UseQueryResult<[number, Item[]], Error>[];
  multiMLTSearchResults: UseQueryResult<[number, Item[]], Error>[];
  multiMLTheseSearchResults: UseQueryResult<[number, Item[]], Error>[];
  multiMLTheseDocumentIdResults: UseQueryResult<[number, Item[]], Error>[];
};
