"use client";
import React from 'react'
import { TextField, Flex, Box, TextArea } from "@radix-ui/themes";
import { MagnifyingGlassIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';

interface IssueForm{
  title: string;
  description: string;
}


const NewIssuePage = () => {
const router = useRouter();
const {register, control, handleSubmit} = useForm<IssueForm>();



  return (
   <form className="max-w-xl" onSubmit={handleSubmit(async (data) => {
    await axios.post('/api/issue', data);
    router.push('/issues') ;
   })}>
      <Flex direction="column" gap="5" maxWidth="600px">
        <Box maxWidth="500px">
          <TextField.Root
            placeholder="Issue Title"
            {...register("title")}
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="30" width="16" />
            </TextField.Slot>
            <TextField.Slot>
              <IconButton size="1" variant="ghost">
                <DotsHorizontalIcon height="14" width="14" />
              </IconButton>
            </TextField.Slot>
          </TextField.Root>
        </Box>
        <Box maxWidth="500px">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMDE
                placeholder="Issue Description"
                {...field}
              />
            )}
          />
        </Box>
        <Box maxWidth="200px">
          <Button type="submit">
            Create Issue
          </Button>
        </Box>
      </Flex>
    </form>
  )
}

export default NewIssuePage
