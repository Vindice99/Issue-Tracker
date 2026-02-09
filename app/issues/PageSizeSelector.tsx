'use client'

import { useRouter, useSearchParams } from "next/navigation";
import Dropdown from "../components/Dropdown";

const PageSizeSelector = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPageSize = searchParams.get('pageSize') || '10';

  const pageSizeOptions = [
    { label: "3", value: "3" },
    { label: "5", value: "5" },
    { label: "10", value: "10" },
    { label: "20", value: "20" },
    { label: "50", value: "50" },
  ];

  const handlePageSizeChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('pageSize', value);
    params.set('page', '1'); // Reset to first page when changing page size
    router.push(`?${params.toString()}`);
  };

  return (
    <Dropdown
      value={currentPageSize}
      options={pageSizeOptions}
      onChange={handlePageSizeChange}
    />
  );
};

export default PageSizeSelector;
