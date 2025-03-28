import React from 'react'
import { SidebarHeader } from '@/components/ui/sidebar'
import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible'
import { SidebarMenuButton } from '@/components/ui/sidebar'
import Link from 'next/link'
const SidebarHeaderMenu = () => {
  return (
    <SidebarHeader>
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Link
            href={"/"}
            className="flex w-full items-center gap-2"
          >
            <SidebarMenuButton tooltip={"Home"}>
              <span className='bg-[#1B74E1] px-2 py-1 text-white font-bold'>D</span>
              <span>DMS</span>
            </SidebarMenuButton>
          </Link>
        </CollapsibleTrigger>
      </Collapsible>
    </SidebarHeader>
  )
}

export default SidebarHeaderMenu