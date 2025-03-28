import { Button } from '@/components/ui/button'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationNext, PaginationPrevious, PaginationFirst, PaginationLast } from '@/components/ui/pagination'
import React from 'react'
import { useFilterContext } from '@/context/filter-context';

interface PaginationProps {
  totalPages: number
}
const PaginationTable = ({ totalPages }: PaginationProps) => {
  const {filters ,setFilter} = useFilterContext()
  const page: number = filters.page ? Number(filters.page) : 1;
  return (
    <Pagination className="flex justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationFirst
            onClick={() => page > 1 && setFilter("page",1)}
            className={`cursor-pointer ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => page > 1 && setFilter("page", page-1)}
            className={`cursor-pointer ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          />
        </PaginationItem>
        {page > 2 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
        {Array.from({ length: totalPages }, (_, i) => i + 1).slice(page - 1, page + 2).map((p) => (
          <PaginationItem key={p}>
            <Button variant={p === page ? "default" : "outline"} onClick={() => setFilter("page",p)}>
              {p}
            </Button>
          </PaginationItem>
        ))}
        {page < totalPages - 1 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
        <PaginationItem>
          <PaginationNext
            onClick={() => page < totalPages && setFilter("page",page + 1)}
            className={`cursor-pointer ${page === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLast
            onClick={() => page < totalPages && setFilter("page",totalPages)}
            className={`cursor-pointer ${page === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationTable
