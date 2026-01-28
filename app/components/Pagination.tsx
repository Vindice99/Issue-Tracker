import React, { use } from 'react'
import { Button, Flex, Text } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';

interface Props {
    itemCount: number;
    pageSize: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}
const router = useRouter();
const searchParams = useSearchParams();
const Pagination = ({ itemCount, pageSize, currentPage, onPageChange }: Props) => {
const pageCount = Math.ceil(itemCount / pageSize);

if (pageCount <= 1) return null; // No pagination needed for a single page

const 
  return (
    <Flex>
        <Text size='2'>Page {currentPage} of {pageCount}</Text>
        <Button color='gray' variant = 'soft' disabled={currentPage === 1} onClick={() => onPageChange(1)}>
            <DoubleArrowLeftIcon />
        </Button>
           <Button color='gray' variant = 'soft' disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
             <ChevronLeftIcon />
        </Button>
            <Button color='gray' variant = 'soft' disabled={currentPage === pageCount} onClick={() => onPageChange(currentPage + 1)}>
             <ChevronRightIcon />
        </Button>
            <Button color='gray' variant = 'soft' disabled={currentPage === pageCount} onClick={() => onPageChange(pageCount)}>
                <DoubleArrowRightIcon />
        </Button>
    </Flex>
  )
}

export default Pagination