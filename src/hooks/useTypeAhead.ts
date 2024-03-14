/* eslint-disable unicorn/no-useless-undefined */
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
    if (query.length === 0) {
      return;
    }
    const delayDebounce = setTimeout(() => {
      typeAhead
        ?.typeAheadFilters?.(query)
        .then((filter) =>
          setRecomendedFilters(
            filter.slice(0, typeAhead.typeAheadFiltersNumber ?? 3)
          )
        );
      typeAhead?.typeAheadQueries?.(query).then((elements) => {
        setRecomendedQueries(
          elements.slice(0, typeAhead.typeAheadQueriesNumber ?? 5)
        );
      });
    }, 200);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return {
    recomendedQueries,
    recomendedFilters,
  };
};

export default useTypeAhead;
