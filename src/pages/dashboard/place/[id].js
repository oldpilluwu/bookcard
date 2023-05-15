import DashboardLayout from "@/components/DashboardLayout";
import { Card, Carousel, IconButton } from "@material-tailwind/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import React, {useEffect, useState} from "react";
import CustomCarousel from "@/components/CustomCarousel";
import Heading from "@/components/Heading";
import { useRouter } from "next/dist/client/router";
import useUser from "@/lib/useUser";
import { DatePicker } from "@material-tailwind/react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Calendar } from "react-date-range";
import { DateRangePicker } from "react-date-range";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import {
  CurrencyDollarIcon,
  UserGroupIcon,
  BookmarkIcon,
  MapPinIcon,
  CalendarIcon,
  PencilIcon,
} from '@heroicons/react/20/solid'
import { Divider } from "@mui/material";

function Place() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [slotIndex, setSlotIndex] = useState(0);
  const [user, setUser] = useState({});
  const [place, setPlace] = useState([]);


  const router = useRouter();
  const placeId = router.query.id;
  console.log(placeId);

  useEffect(() => {
    fetchPlace();
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);


  const fetchPlace = async () => {
    const res = await fetch("/api/places/get_place_by_id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: placeId }),
    });
    const json = await res.json();
    console.log(json.data);
    setPlace(json.data);
  };

  const handleSlotSelect = (index) => {
    setSlotIndex(index);
  };

  const handleSubmit = async () => {
    const payload = {
      userId: user.id,
      placeId: placeId,
      slot: slots[slotIndex].name,
      date: startDate.toJSON(),
    }

    console.log(payload);

    const res = await fetch("/api/booking/create_booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    const message = json.message;
    if (json.status) {
      toast.success(message);
    }else{
      toast.error(message);
    }
  };

    


  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const slots = [
    {
      name: "Morning",
      startTime: "8:00 AM",
      endTime: "1:00 PM",
    },
    {
      name: "Afternoon",
      startTime: "1:00 PM",
      endTime: "6:00 PM",
    },
    {
      name: "Night",
      startTime: "6:00 PM",
      endTime: "11:00 PM",
    },

  ]

  function buildSlots() {
    return (
      <div className="flex flex-col gap-2 w-full h-full md:w-1/2">
        <div
          className="
        flex
        flex-row
        items-center
        gap-2
        text-xl
        font-semibold
      ">
          <BookmarkIcon className="w-6 h-6" />
          <span>Slots</span>
        </div>
          <div className="flex items-center gap-2 mt-4 h-full w-full">
            {slots.map((slot, index) => {
              return (
                  <div onClick={() => handleSlotSelect(index)} key={slot.name} className={`border-solid hover:bg-blue-100 transition-all hover:cursor-pointer  rounded-lg p-4 h-full ${slotIndex === index ? "border-blue-500 border-4" : "border-2 border-gray-200"}`}>
                    <h1 className={"font-medium text-gray-700 "} >
                      {slot.name}
                    </h1>
                    <p className={"text-sm text-gray-500"}>
                      {slot.startTime} - {slot.endTime}
                    </p>
                  </div>
            )})}
            </div>
            <div className="flex justify-start w-full">
              <Button onClick={handleSubmit} color="blue" ripple="light" className="w-full md:w-1/2 mt-4">
                Book
              </Button>
              </div>
        </div>
              
    )
  }

  return (
    // <DashboardLayout page="Place">
    //   <div className="container mx-auto px-4">
    //     <Heading
    //       title="Charukola"
    //       subtitle="Faculty of Fine Art, University of Dhaka, Dhaka, 1000"
    //     />
    //     <div className="grid grid-cols-2 gap-8">
    //       <div>
    //         <CustomCarousel />
    //       </div>
    //       <div>
    //         {/* raect date range picker is used */}
    //         {/* <DateRangePicker
    //           ranges={[selectionRange]}
    //           minDate={new Date()}
    //           rangeColors={["#FD5B61"]}
    //           onChange={(item) => {
    //             setStartDate(item.selection.startDate);
    //             setEndDate(item.selection.endDate);
    //           }}
    //         /> */}
    //         <Calendar
    //           date={new Date()}
    //           onChange={(date) => setStartDate(date)}       
    //         />
    //       </div>
    //     </div>
    //     <div className="col-span-4 flex flex-col gap-8">
    //       <div className="flex flex-col gap-2">
    //         <div
    //           className="
    //         flex 
    //         flex-row 
    //         items-center 
    //         gap-2 
    //         text-xl
    //         font-semibold
    //       "
    //         >
    //           <div>Hosted by (Name)</div>
    //         </div>
    //         <div
    //           className="
    //         flex 
    //         flex-row 
    //         items-center 
    //         gap-4 
    //         font-light
    //         text-neutral-500
    //       "
    //         >
    //           <div>5000 capacity</div>
    //           <div>100$ booking cost</div>
    //           <div>1000 square feet area</div>
    //         </div>
    //       </div>
    //       <hr />
    //     </div>
    //   </div>
    // </DashboardLayout>
    <DashboardLayout>
      <div className="h-full flex md:mt-8 flex-col-reverse md:flex-row w-full md:px-8 md:gap-6">
        <div className="md:w-1/2 w-full">
          <Card className="h-full p-6">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="min-w-0">
              <h2 className="text-2xl font-bold mb-2 leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                {place.name}
              </h2>
              <div className="mt-1 flex flex-col lg:mt-0 lg:flex-row lg:flex-wrap lg:space-x-6">
                <div className="mt-2 flex items-center text-lg text-gray-600">
                  <MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                  {place.address}
                </div>
                <div className="mt-2 flex items-center text-lg text-gray-600">
                  <UserGroupIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                  {place.capacity} people
                </div>
                <div className="mt-2 flex items-center text-lg text-gray-600">
                  <CurrencyDollarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                  {place.price} BDT
                </div>
                
              </div>
              <hr class="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700"/>
              <div className="">
              {place.description}
              </div>
              </div>
            
              </div>
              </Card>
              </div>
              <img src={place.image}
                alt="ui/ux review check"
                className='md:w-1/2 w-full object-contain md:rounded-lg'/>
        </div>
        {user.role === 'RENTER' ? <></> : <div className="h-full mb-12 flex flex-col p-6 w-full md:p-8 md:gap-6 md:mt-8 bg-white">
          <div className="md:w-1/2 w-full  ">
          
          <h2 className="text-2xl font-bold mb-2 leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Book this place
              </h2>
          </div>

          
            <div className="w-full flex flex-col md:flex-row justify-between ">
            <div className="w-full md:w-1/2 flex-col justify-center items-center mt-2 md:mt-0">
            <div
          className="
        flex
        flex-row
        items-center
        gap-2
        text-xl
        font-semibold
      ">
          <CalendarIcon className="w-6 h-6" />
          <span>Calender</span>
        </div>
            <div className="w-full flex justify-center">
            <Calendar
              
               date={startDate}
               onChange={(date) => setStartDate(date)}       
               />
            </div>
            </div>
               {buildSlots()}
            </div>
          
          
        </div>}
    </DashboardLayout>
  );
}

export default Place;
