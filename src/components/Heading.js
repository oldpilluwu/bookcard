import React from "react";

const Heading = ({ title, subtitle }) => {
  return (
    <div style={{
        marginBottom: "1rem"

    }}>
    <div className="
    text-xl 
    font-semibold 
    flex 
    flex-row 
    items-center
    gap-2
  ">
      <div>{title}</div>
    </div>
    <div className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
        >
            <div>
                {subtitle}
                </div>
        </div>
    </div>
  );
};

export default Heading;
