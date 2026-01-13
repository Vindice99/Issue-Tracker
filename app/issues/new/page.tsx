"use client";
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../../validationSchema";
import z from "zod";

// Dynamically import SimpleMDE to avoid SSR issues
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

// Infer the form data type from the Zod schema
type IssueForm = z.infer<typeof schema>;

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

export default NewIssuePage;
