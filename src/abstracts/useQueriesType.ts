import { UseMutationResult } from "@tanstack/react-query";
import { Item } from "./ItemTypes";

export type UseQueriesType = {
  querySearchResult: UseMutationResult<[number, Item[]], Error>;
  moreLikeThisResult: UseMutationResult<[number, Item[]], Error>;
  vibeSearchResult: UseMutationResult<[number, Item[]], Error>;
  vibeDocumentIdResult: UseMutationResult<[number, Item[]], Error>;
  moreLikeTheseResult: UseMutationResult<[number, Item[]], Error>;
  personalizationMoreLikeTheseResults: UseMutationResult<
    [number, Item[]],
    Error
  >;
};
