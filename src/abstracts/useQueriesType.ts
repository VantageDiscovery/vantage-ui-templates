import { UseMutationResult } from "@tanstack/react-query";
import { Item } from "./ItemTypes";

export type UseQueriesType = {
  querySearchResult: UseMutationResult<[number, Item[], number], Error>;
  moreLikeThisResult: UseMutationResult<[number, Item[], number], Error>;
  vibeSearchResult: UseMutationResult<[number, Item[], number], Error>;
  vibeDocumentIdResult: UseMutationResult<[number, Item[], number], Error>;
  moreLikeTheseResult: UseMutationResult<[number, Item[], number], Error>;
  personalizationMoreLikeTheseResults: UseMutationResult<
    [number, Item[], number],
    Error
  >;
};
