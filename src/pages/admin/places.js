import AdminLayout from '@/components/AdminLayout'
import { CustomTable } from '@/components/CustomTable';
import React, { useEffect, useState } from 'react'

const columns = [
  // { id: 'name', label: 'Name', minWidth: 170 },
  // { id: 'email', label: 'Email', minWidth: 170 },
  // { id: 'phone', label: 'Phone', minWidth: 100 },
  // { id: 'createdAt', label: 'Created At', minWidth: 170 },
  { id: 'name', label: 'Name', },
  { id: 'email', label: 'Email', },
  { id: 'phone', label: 'Phone',  },
  { id: 'createdAt', label: 'Created At', },
  
];


export default function Places() {
  const [data, setData] = useState([])

  const fetchData = async () => {
    const res = await fetch('/api/admin/renters')
    const json = await res.json()
    setData(json.data)
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
