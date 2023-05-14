import React, { useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { Tabs, Tab } from '@mui/material';

const TABS = [
    {
      label: "All",
      value: "ALL",
    },
    {
      label: "Pending",
      value: "PENDING",
    },
    {
      label: "Confirmed",
      value: "CONFIRMED",
    },
    {
        label: "Cancelled",
        value: "CANCELLED",
    },
  ];

  const TABLE_HEAD = ["Place", "Booking Date", "Slot", "Status"];
    
  


const UserBookings = () => {
    const [bookings, setBookings] = useState([])
    const [data, setData] = useState([])
    const [selectedTab, setSelectedTab] = useState("ALL");
    const [searchText, setSearchText] = useState("");
    

    useEffect(() => {
        fetchBookings()
    }, [])

    useEffect(() => {
        filterSearch()
    }, [searchText]);

    const fetchBookings = async () => {
        const user = JSON.parse(localStorage.getItem('user'))
        const res = await fetch('/api/booking/user_bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId: user.id}),
        })
        const json = await res.json()
        console.log(json.data)
        setData(json.data);
        setBookings(json.data)
    }

    const filterSearch = () => {
        let filteredData = data;
        filteredData = filteredData.filter((item) => item.place.name.toLowerCase().startsWith(searchText.toLowerCase()));
        setBookings(filteredData);
    }

    const handleTabChange = (event, value) => {
        setSelectedTab(value);
        if (value === "ALL") {
            setBookings(data);
        } else {
            const filteredData = data.filter((item) => item.status === value);
            setBookings(filteredData);
        }
    };

    return (
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Booking list
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  See information abput all bookings
                </Typography>
              </div>
              
            </div>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <Tabs 
                    variant="scrollable"
                    scrollButtons={false}
                    value={selectedTab} className="w-full md:w-max" onChange={handleTabChange}>
                
                  {TABS.map(({ label, value }) => (
                    <Tab key={value} value={value} label={label}>
                    </Tab>
                  ))}
              </Tabs>
              <div className="w-full md:w-72">
                <Input value={searchText} onChange={(e) => setSearchText(e.target.value)} label="Search Place" icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-scroll px-0">
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.map(({ id, slot, place, status, date }, index) => {
                  const isLast = index === bookings.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                  
                  const dateTime = new Date(date);
                  const formattedDate  = dateTime.toLocaleDateString().replace(/\//g, '/');
                  return (
                    <tr key={id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          
                          <div className="flex flex-col">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                              {place.name}
                            </Typography>
                            
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {formattedDate}
                          </Typography>
                          
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {slot}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={status}
                            color={status === "CONFIRMED" ? "green" : status === "PENDING" ? "amber" : "red"}
                          />
                        </div>
                      </td>
                      
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
          
        </Card>
      );
}

export default UserBookings