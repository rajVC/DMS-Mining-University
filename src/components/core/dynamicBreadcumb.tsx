"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useBreadcrumb } from "@/context/breadcrumb-context";
import React from "react";

const DynamicBreadcumb = () => {
  const { breadcrumbs } = useBreadcrumb();

  return (
    <Breadcrumb className="pl-2">
      <BreadcrumbList>
        {breadcrumbs.map((data, index: number) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem className={`${isLast && "text-black"}`}>
                <BreadcrumbLink href={data.href}>{data.label}</BreadcrumbLink>
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcumb;
