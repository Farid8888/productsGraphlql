import React, { useRef, useEffect } from "react";
import classes from '../styles/CanvasImage.module.css'


const CanvasImage = (props) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src =props.img
  }, [props.img]);
  return <canvas className={classes.image} ref={canvasRef}/>;
};
export default CanvasImage;
