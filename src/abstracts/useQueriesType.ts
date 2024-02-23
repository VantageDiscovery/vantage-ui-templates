import { UseQueryResult } from "@tanstack/react-query";
import { Item } from "./ItemTypes";

export type UseQueriesType = {
  multiQuerySearchResults: UseQueryResult<[number, Item[]], Error>[];
  multiMLTSearchResults: UseQueryResult<[number, Item[]], Error>[];
  multiVibeSearchResults: UseQueryResult<[number, Item[]], Error>[];
  multiVibeDocumentIdResults: UseQueryResult<[number, Item[]], Error>[];
  multiMoreLikeTheseResults: UseQueryResult<[number, Item[]], Error>[];
};
