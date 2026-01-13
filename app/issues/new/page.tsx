"use client";
import React, { useState } from "react";
import { TextField, Flex, Box, Callout, Text } from "@radix-ui/themes";
import { MagnifyingGlassIcon, DotsHorizontalIcon, InfoCircledIcon} from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { Button } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod";
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
  const { register, control, handleSubmit, formState : {errors}} = useForm<IssueForm>({
    resolver: zodResolver(schema), //  Zod resolver for validation
  });
  const [error, setError] = useState("");

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root  className="mb-4 w-125">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text color="red">
            {error}
            application.
          </Callout.Text>
        </Callout.Root>
      )}
      <form
        className="max-w-xl "
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issue", data);
            router.push("/issues");
          } catch (error) {
            setError("Failed to create issue. Please try again.");
          }
        })}
      >
        <Flex direction="column" gap="5" maxWidth="600px">
          <Box maxWidth="500px">
            <TextField.Root placeholder="Issue Title" {...register("title")} className="mb-2">
              <TextField.Slot>
                <MagnifyingGlassIcon height="30" width="16" />
              </TextField.Slot>
              <TextField.Slot>
                <IconButton size="1" variant="ghost">
                  <DotsHorizontalIcon height="14" width="14" />
                </IconButton>
              </TextField.Slot>
            </TextField.Root>
            {errors.title && <Text color="red" size="2">{errors.title.message} </Text>}
          </Box>
          <Box maxWidth="500px">
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <SimpleMDE placeholder="Issue Description" {...field} />
              )}
            />
             {errors.description && <Text color="red" size="2">{errors.description.message}</Text>}
          </Box>
          <Box maxWidth="200px">
            <Button type="submit">Create Issue</Button>
          </Box>
        </Flex>
      </form>
    </div>
  );
};

export default NewIssuePage;
