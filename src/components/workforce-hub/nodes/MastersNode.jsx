import React, { memo } from "react";
import { Handle, Position } from "reactflow";

const MastersNode = ({
  data,
  isConnectable,
  targetPosition = Position.Top,
  sourcePosition = Position.Bottom,
}) => {
  return (
    <div className="relative group">
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-lg blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

      {/* Main Card */}
      <div className="relative px-5 py-4 bg-gray-900 rounded-lg border-2 border-yellow-500 w-[240px] shadow-2xl">
        <Handle
          type="target"
          position={targetPosition}
          isConnectable={isConnectable}
          className="w-4 h-4 bg-yellow-500 border-2 border-gray-900"
        />
        <div className="flex flex-col items-center text-center">
          <div className="text-[10px] font-bold text-yellow-500 mb-1 tracking-[0.2em] uppercase">
            Master's Degree
          </div>
          <div className="text-lg font-bold text-white leading-tight mb-2 drop-shadow-md">
            {data.label}
          </div>
          {data.description && (
            <div className="text-xs text-gray-300 font-light italic border-t border-gray-700 pt-2 w-full">
              "{data.description}"
            </div>
          )}
        </div>
        {/* No source handle usually for ultimate nodes, but adding one just in case chains continue */}
        <Handle
          type="source"
          position={sourcePosition}
          isConnectable={isConnectable}
          className="w-3 h-3 bg-yellow-500 !opacity-0" // Hidden if end node
        />
      </div>
    </div>
  );
};

export default memo(MastersNode);
