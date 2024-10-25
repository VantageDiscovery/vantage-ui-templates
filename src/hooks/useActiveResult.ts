import { Action, activeResultType } from "abstracts/ActiveResultTypes";
import { useState } from "react";

const useActiveResult = (moreLikeDocumentId: string): activeResultType => {
  const [activeResult, setActiveResult] = useState<Action>(
    moreLikeDocumentId.length > 0 ? Action.MORE_LIKE_THIS : Action.SEMANTIC
  );
  const [lastResult, setLastResult] = useState<Action>(
    moreLikeDocumentId.length > 0 ? Action.MORE_LIKE_THIS : Action.SEMANTIC
  );

  const setResult = (result: Action) => {
    if (activeResult !== result) {
      setLastResult(activeResult);
      setActiveResult(result);
    }
  };

  return { activeResult, setResult, lastResult };
};

export default useActiveResult;
