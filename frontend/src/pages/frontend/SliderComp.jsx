import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import 'react-awesome-slider/dist/styles.css';

const SliderComp = ({ images = [] }) => {

  return (

    <AwesomeSlider  animation="cubeAnimation">
      {images.map((image, index) => (
       <div key={index} data-src={`http://localhost:7000/uploads/${image}`} />
      ))}
    </AwesomeSlider>
  );
};

export default SliderComp;
