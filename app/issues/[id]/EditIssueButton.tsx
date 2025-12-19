import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const EditIssueButton = ({ id }: { id: number }) => {
    return (
        <Button className='w-24' size="2" radius="large">
            <Pencil2Icon />
            <Link href={`/issues/${id}/edit`} className='ml-2'>
                Edit
            </Link>
        </Button>
    )
}
export default EditIssueButton