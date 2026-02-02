import React, { memo } from "react";
import { Handle, Position } from "reactflow";

const CertificateNode = ({
  data,
  isConnectable,
  targetPosition = Position.Top,
  sourcePosition = Position.Bottom,
}) => {
  return (
    <div className="px-4 py-3 shadow-lg rounded-md bg-gray-800 border-2 border-gray-600 w-[200px] hover:border-blue-400 transition-colors duration-300">
      <Handle
        type="target"
        position={targetPosition}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-blue-400"
      />
      <div className="flex flex-col">
        <div className="text-xs font-bold text-blue-400 mb-1 tracking-wider uppercase">
          Certificate
        </div>
        <div className="text-sm font-semibold text-white leading-tight">
          {data.label}
        </div>
        {data.skills && (
          <div className="text-[10px] text-gray-400 mt-2">{data.skills}</div>
        )}
      </div>
      <Handle
        type="source"
        position={sourcePosition}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-blue-400"
      />
    </div>
  );
};

export default memo(CertificateNode);
