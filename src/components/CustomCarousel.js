import React from "react";
import { Carousel, IconButton } from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const CustomCarousel = (props) => {
  const { image, heading } = props;
  return (
    <div className="
    w-full
    h-full
    overflow-hidden
    rounded-xl
    relative"
      
    >
      <Carousel
        className="rounded-xl"
        // style={{ width: "900px", height: "600px" }}
        prevArrow={({ handlePrev }) => (
          <IconButton
            variant="text"
            color="white"
            size="lg"
            onClick={handlePrev}
            className="!absolute left-4 top-2/4 -translate-y-2/4"
          >
            <ArrowLeftIcon strokeWidth={2} className="h-6 w-6" />
          </IconButton>
        )}
        nextArrow={({ handleNext }) => (
          <IconButton
            variant="text"
            color="white"
            size="lg"
            onClick={handleNext}
            className="!absolute !right-4 top-2/4 -translate-y-2/4"
          >
            <ArrowRightIcon strokeWidth={2} className="h-6 w-6" />
          </IconButton>
        )}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Institute_of_Fine_Arts_%28Charukala%29_DU_003.jpg"
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Charukola_Institute.JPG"
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <img
          src="https://ssl.du.ac.bd/fontView/images/body/16763506505341.jpg"
          alt="image 3"
          className="h-full w-full object-cover"
        />
      </Carousel>
    </div>
  );
};

export default CustomCarousel;
