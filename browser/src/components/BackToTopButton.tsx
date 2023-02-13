import { ArrowUpOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

interface IProps {
  showButton?: boolean;
  onScroll: () => void
}

const BackToTopButton = ({showButton, onScroll}: IProps) => {
  
  return (
    <>
      {showButton && (
        <button
        style={{"transition":"opacity 0.4s, color ease-in-out 0.2s, background ease-in-out 0.2s"}}
          className="fixed items-center justify-center w-8 h-8 right-8 bottom-8 z-[1000] cursor-pointer bg-green-700 rounded"
          onClick={onScroll}
        >
          <ArrowUpOutlined className="text-white font-semibold"/>
        </button>
      )}
    </>
  );
};

export default BackToTopButton;
