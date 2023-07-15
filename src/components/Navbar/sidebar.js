import React from "react";
import Items from "./items";
import { useSpring, animated } from "react-spring";

const Sidebar = ({ show, Show }) => {
  const { left } = useSpring({
    from: { left: "-100%" },
    left: show ? "0" : "-100%"
  });
  return (
    <animated.div style={{ left: left }} className="Sidebar">
      <Items Show={Show}/>
    </animated.div>
  );
};

export default Sidebar; 