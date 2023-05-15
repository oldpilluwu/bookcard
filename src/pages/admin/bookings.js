import AdminLayout from '@/components/AdminLayout'
import { CustomTable } from '@/components/CustomTable';
import { formatDate } from '@/lib/utils';
import React, { useEffect, useState } from 'react'

const columns = [

  { id: 'place', label: 'Place Name', },
  { id: 'renterEmail', label: 'Renter Email', },
  { id: 'userEmail', label: 'User Email',  },
  { id: 'date', label: 'Date', },
  { id: 'slot', label: 'Slot', },
  { id: 'status', label: 'Status', },
  
];

export default function Bookings() {

  const [bookings, setBookings] = useState([])

  const fetchData = async () => {
    const res = await fetch('/api/admin/bookings')
    const json = await res.json()
    let list = []
    // console.log(json.data)
    json.data.forEach((item) => {
      list.push({
        place: item.place.name,
        renterEmail: item.place.user.email,
        userEmail: item.user.email,
        date: formatDate(item.date),
        slot: item.slot,
        status: item.status,
      })
    })

    setBookings(list)
  }

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <AdminLayout>
      <CustomTable columns={columns} data={bookings} />
    </AdminLayout>
  )
}
