"use client";
import "easymde/dist/easymde.min.css";
import { Issue } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2, Pencil, ArrowLeft } from "lucide-react";
import { StatusBadge } from "@/app/components";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import z from "zod";
import { schema } from "../../validationSchema";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

// Infer the form data type from the Zod schema
type IssueFormData = z.infer<typeof schema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IssueFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: issue?.title || "",
      description: issue?.description || "",
    },
  });
  const [error, setError] = useState("");

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      {/* Back link */}
      {issue && (
        <button
          onClick={() => router.push(`/issues/${issue.id}`)}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to issue #{issue.id}
        </button>
      )}

      <Card className="shadow-lg border-2 bg-gradient-to-br from-white via-amber-50/30 to-orange-50/30 dark:from-gray-900 dark:via-amber-950/20 dark:to-orange-950/20">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/40">
                <Pencil className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">
                  Edit Issue #{issue?.id}
                </CardTitle>
                <CardDescription>
                  Update the details of this issue
                </CardDescription>
              </div>
            </div>
            {issue && (
              <StatusBadge status={issue.status} />
            )}
          </div>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form
            onSubmit={handleSubmit(async (data) => {
              try {
                setError("");
                if (issue) {
                  await axios.patch(`/api/issue/${issue.id}`, data);
                  router.push(`/issues/${issue.id}`);
                  router.refresh();
                } else {
                  await axios.post("/api/issue", data);
                  router.push("/issues");
                  router.refresh();
                }
              } catch (error) {
                setError("Failed to update issue. Please try again.");
              }
            })}
            className="space-y-6"
          >
            {/* Title field */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base font-semibold">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Enter a descriptive title for your issue"
                {...register("title")}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description field */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-base font-semibold">
                Description
              </Label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <SimpleMDE
                    placeholder="Provide detailed information about the issue (supports Markdown)"
                    {...field}
                  />
                )}
              />
              {errors.description && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-36"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Pencil className="mr-2 h-4 w-4" />
                    Update Issue
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  router.push(issue ? `/issues/${issue.id}` : "/issues")
                }
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default IssueForm;
