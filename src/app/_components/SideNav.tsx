
'use client'
import React from 'react'
import Image from 'next/image'
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import { usePathname } from 'next/navigation'

const SideNav = () => {
    const menuList = [{
        id:1,
        name:'Dashboard',
        icon:LayoutGrid
    },{
        id:2,
        name:'Budgets',
        icon:PiggyBank
    },{
        id:3,
        name:'Expenses',
        icon:ReceiptText
    },{
        id:4,
        name:'Upgrade',
        icon:ShieldCheck
    }]
  return (
    <div className='p-5  dark:bg-boxdark-2/50 h-screen shadow-sm'>
     
     <div className='flex justify-center items-center '>
        <Image src={'/logo.svg'} alt='logo' width={50} height={50} />
     </div>
     <div>
        {menuList.map((menu) => (
            <h2 key={menu.id} className={`flex items-center gap-2 font-medium p-5 cursor-pointer rounded dark:text-primary hover:text-primary hover:bg-primary/10`}>
                <menu.icon size={20} />
                {menu.name}
            </h2>
        ))}
     </div>
     <div className='fixed bottom-10 flex gap-2 p-5 items-center'>
        <p>user</p>
     </div>
    </div>
  )
}

export default SideNav
