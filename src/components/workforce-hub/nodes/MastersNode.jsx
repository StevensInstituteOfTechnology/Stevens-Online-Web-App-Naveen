import React, { memo, useState } from "react";
import { Handle, Position } from "reactflow";
import { motion } from "framer-motion";
import { MastersTooltip } from "../SkillTooltip";
import { initialData } from "../data";

const MastersNode = ({
  id,
  data,
  isConnectable,
  targetPosition = Position.Bottom,
  sourcePosition = Position.Top,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Get certificates that unlock this degree (Layer 2 nodes pointing to this)
  const unlockedBy = initialData.nodes
    .filter(
      (node) =>
        node.type === "certificate" &&
        node.data.stacksToward &&
        node.data.stacksToward.includes(id)
    )
    .map((node) => node.data.label);

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
      {/* Glow Effect - Enhanced on hover */}
      <div
        className={`absolute -inset-1 bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-lg blur transition-all duration-300 ${
          isHovered ? "opacity-100 -inset-2" : "opacity-40"
        }`}
      />

      {/* Main Card */}
      <div
        className={`relative px-5 py-4 bg-gray-900 rounded-lg border-2 w-[240px] transition-all duration-300 ${
          data.isSelected
            ? "border-yellow-400 ring-2 ring-yellow-400 ring-offset-2 ring-offset-gray-900 shadow-yellow-500/50 shadow-2xl"
            : "border-yellow-500"
        } ${isHovered ? "shadow-yellow-500/50 shadow-2xl" : "shadow-2xl"}`}
      >
        <Handle
          type="target"
          position={targetPosition}
          isConnectable={isConnectable}
          className="w-4 h-4 bg-yellow-500 border-2 border-gray-900"
        />
        <div className="flex flex-col items-center text-center">
          <div className="text-[10px] font-bold text-yellow-500 mb-1 tracking-[0.2em] uppercase flex items-center gap-1">
            <span>🎓</span> Master's Degree
          </div>
          <div className="text-lg font-bold text-white leading-tight mb-2 drop-shadow-md">
            {data.label}
          </div>
          {data.totalCredits && (
            <div className="text-xs text-yellow-300 font-medium mb-2">
              {data.totalCredits} Total Credits
            </div>
          )}
          {data.description && (
            <div className="text-xs text-gray-300 font-light italic border-t border-gray-700 pt-2 w-full">
              "{data.description}"
            </div>
          )}
        </div>
        {/* No source handle for end nodes */}
        <Handle
          type="source"
          position={sourcePosition}
          isConnectable={isConnectable}
          className="w-3 h-3 bg-yellow-500 !opacity-0"
        />
      </div>

      {/* Tooltip */}
      <MastersTooltip data={data} unlockedBy={unlockedBy} isVisible={false} />
    </motion.div>
  );
};

export default memo(MastersNode);
