import AdminLayout from '@/components/AdminLayout'
import { CustomTable } from '@/components/CustomTable';
import React, { useEffect, useState } from 'react'

const columns = [
  // { id: 'name', label: 'Name', minWidth: 170 },
  // { id: 'email', label: 'Email', minWidth: 170 },
  // { id: 'phone', label: 'Phone', minWidth: 100 },
  // { id: 'createdAt', label: 'Created At', minWidth: 170 },
  { id: 'name', label: 'Place Name', },
  { id: 'address', label: 'Address', },
  { id: 'seller_name', label: 'Renter Name', },
  { id: 'seller_email', label: 'Renter Email', },
  
];


export default function Places() {
  const [data, setData] = useState([])

  const fetchData = async () => {
    const res = await fetch('/api/places/all_places')
    const json = await res.json()
    const list = []
    json.data.forEach((item) => {
      list.push({
        name: item.name,
        seller_name: item.user.name,
        address: item.address,
        seller_email: item.user.email,
      })
    })
    setData(list)
    console.log(json.data);
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <AdminLayout>
        <h1>Renters</h1>
        <CustomTable columns={columns} data={data} />
    </AdminLayout>
  )
}
