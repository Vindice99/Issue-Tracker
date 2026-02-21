"use client";
import "easymde/dist/easymde.min.css";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import {
  DotsHorizontalIcon,
  InfoCircledIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Callout,
  Flex,
  IconButton,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import z from "zod";
import { schema } from "../../validationSchema";

// Infer the form data type from the Zod schema
type IssueFormData = z.infer<typeof schema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(schema), //  Zod resolver for validation
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if (issue) {
        await axios.patch(`/api/issue/${issue.id}`, data);
        return;
      } else {
        await axios.post("/api/issue", data);
        router.push("/issues");
        // Refresh the issues list after creating a new issue
        router.refresh();
      }
    } catch (error) {
      setIsSubmitting(false);
      setError("Failed to create issue. Please try again.");
    }
  });

  return (
    <div className="max-w-xl mt-6 ml-11">
      {error && (
        <Callout.Root className="mb-4 w-125">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text color="red">
            {error}
            application.
          </Callout.Text>
        </Callout.Root>
      )}
      <form className="max-w-xl " onSubmit={onSubmit}>
        <Flex direction="column" gap="5" maxWidth="600px">
          <Box maxWidth="500px">
            <TextField.Root
              defaultValue={issue?.title}
              placeholder="Issue Title"
              {...register("title")}
              className="mb-2"
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
            {<ErrorMessage>{errors.title?.message}</ErrorMessage>}
          </Box>
          <Box maxWidth="500px">
            <Controller
              name="description"
              control={control}
              defaultValue={issue?.description || ""}
              render={({ field }) => (
                <SimpleMDE placeholder="Issue Description" {...field} />
              )}
            />
            {<ErrorMessage>{errors.description?.message}</ErrorMessage>}
          </Box>
          <Box maxWidth="200px">
            <Button type="submit">
              {issue ? "Update Issue" : "Create Issue"}{" "}
              {isSubmitting && <Spinner />}
            </Button>
          </Box>
        </Flex>
      </form>
    </div>
  );
};

export default IssueForm;
