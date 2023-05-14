import DashboardLayout from "@/components/DashboardLayout";
import { Carousel, IconButton } from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import CustomCarousel from "@/components/CustomCarousel";
import Heading from "@/components/Heading";
import { useRouter } from "next/dist/client/router";
import useUser from "@/lib/useUser";
import { DatePicker } from "@material-tailwind/react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Calendar } from "react-date-range";
import { DateRangePicker } from "react-date-range";
import { useState } from "react";
import { Button } from "@material-tailwind/react";

function place() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const router = useRouter();
  return (
    <DashboardLayout page="Place">
      <div className="container mx-auto px-4">
        <Heading
          title="Charukola"
          subtitle="Faculty of Fine Art, University of Dhaka, Dhaka, 1000"
        />
        <div className="grid grid-cols-2 gap-8">
          <div>
            <CustomCarousel />
          </div>
          <div>
            {/* raect date range picker is used */}
            <DateRangePicker
              ranges={[selectionRange]}
              minDate={new Date()}
              rangeColors={["#FD5B61"]}
              onChange={(item) => {
                setStartDate(item.selection.startDate);
                setEndDate(item.selection.endDate);
              }}
            />
            {/* <Calendar
        date={new Date()}
        onChange={(date) => setStartDate(date)}       
      /> */}
          </div>
        </div>
        <div className="col-span-4 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <div
              className="
            flex 
            flex-row 
            items-center 
            gap-2 
            text-xl
            font-semibold
          "
            >
              <div>Hosted by ( Renter's Name)</div>
            </div>
            <div
              className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
            >
              <div>5000 capacity</div>
              <div>100$ booking cost</div>
              <div>1000 square feet area</div>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default place;
