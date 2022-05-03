import React from "react";
import { Carousel} from "react-bootstrap";
import CategoryComponents from "./Category/CategoryComponents";
import FooterComponents from "./FooterComponents";
import CategoryAllComponents from "./Category/CategoryAllComponents";


function HomeComponents() {

  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="http://kamerapengintai.com/images/modules/imageslider/6054868064bc1.png"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="http://kamerapengintai.com/images/modules/imageslider/6054868064bc1.png"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="http://kamerapengintai.com/images/modules/imageslider/6054868064bc1.png"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      <CategoryComponents />
      <CategoryAllComponents />
      <FooterComponents />
    </>
  );
}

export default HomeComponents;
