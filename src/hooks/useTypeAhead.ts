import { Filter } from "abstracts";
import { TypeAheadProperties, TypeAheadType } from "abstracts/typeAheadType";
import { useEffect, useState } from "react";

const useTypeAhead = ({
  query,
  typeAhead,
}: TypeAheadProperties): TypeAheadType | undefined => {
  const [recomendedQueries, setRecomendedQueries] = useState<string[]>();
  const [recomendedFilters, setRecomendedFilters] = useState<Filter[]>();
  useEffect(() => {
    typeAhead
      ?.typeAheadFilters?.(query)
      .then((filter) =>
        setRecomendedFilters(
          filter.slice(0, typeAhead.typeAheadFiltersNumber ?? 3)
        )
      );
  }, [query]);

  useEffect(() => {
    typeAhead?.typeAheadQueries?.(query).then((elements) => {
      setRecomendedQueries(
        elements.slice(0, typeAhead.typeAheadQueriesNumber ?? 5)
      );
    });
  }, [query]);

  if (!typeAhead) return;

  return {
    recomendedQueries,
    recomendedFilters,
  };
};

export default useTypeAhead;
