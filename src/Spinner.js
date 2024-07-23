import React from "react";

const Spinner = () => {
  const spinnerStyle = {
    display: "inline-block",
    width: "80px",
    height: "80px",
    margin: "auto",
  };

  const animationStyle = {
    width: "100%",
    height: "100%",
    border: "8px solid #f3f3f3",
    borderRadius: "50%",
    borderTop: "8px solid #3498db",
    animation: "spin 2s linear infinite",
  };

  return (
    <div style={spinnerStyle}>
      <div style={animationStyle}></div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Spinner;
