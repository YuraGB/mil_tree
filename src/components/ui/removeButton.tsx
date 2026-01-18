import React from "react";

const RemoveButton = ({ onRemoveHandler }: { onRemoveHandler: () => void }) => {
  return (
    <button onClick={onRemoveHandler} className="absolute top-2 right-2">
      X
    </button>
  );
};

export default React.memo(RemoveButton);
