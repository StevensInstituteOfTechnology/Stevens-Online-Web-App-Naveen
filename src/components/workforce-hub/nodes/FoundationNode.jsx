import React, { memo, useState } from "react";
import { Handle, Position } from "reactflow";
import { motion } from "framer-motion";
import { FoundationTooltip } from "../SkillTooltip";

const FoundationNode = ({
  data,
  isConnectable,
  sourcePosition = Position.Top,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Glow Effect on Hover */}
      <div
        className={`absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-400 rounded-lg blur transition-opacity duration-300 ${
          isHovered ? "opacity-60" : "opacity-0"
        }`}
      />

      {/* Main Card */}
      <div
        className={`relative px-4 py-3 shadow-lg rounded-md bg-gray-800 border-2 w-[180px] transition-all duration-300 ${
          data.isSelected
            ? "border-yellow-400 ring-2 ring-yellow-400 ring-offset-2 ring-offset-gray-900 shadow-yellow-500/40 shadow-xl"
            : isHovered
            ? "border-green-400 shadow-green-500/30 shadow-xl"
            : "border-gray-600"
        }`}
      >
        <div className="flex flex-col">
          <div className="text-[10px] font-bold text-green-400 mb-1 tracking-wider uppercase flex items-center gap-1">
            <span>🌱</span> Foundation
          </div>
          <div className="text-sm font-semibold text-white leading-tight">
            {data.label}
          </div>
          {data.skills && (
            <div className="text-[10px] text-gray-400 mt-2">{data.skills}</div>
          )}
          {data.credits && (
            <div className="text-[10px] text-green-300 mt-1 font-medium">
              {data.credits} Credits
            </div>
          )}
        </div>
        <Handle
          type="source"
          position={sourcePosition}
          isConnectable={isConnectable}
          className="w-3 h-3 bg-green-400"
        />
      </div>

      {/* Tooltip */}
      <FoundationTooltip data={data} isVisible={false} />
    </motion.div>
  );
};

export default memo(FoundationNode);
