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
  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<IssueForm>({
    resolver: zodResolver(schema),
  });
  const [error, setError] = useState("");

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <Card className="shadow-lg border-2 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create New Issue</CardTitle>
          <CardDescription>
            Report a bug, request a feature, or submit any issue for tracking
          </CardDescription>
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
                await axios.post("/api/issue", data);
                router.push("/issues");
              } catch {
                setError("Failed to create issue. Please try again.");
              }
            })}
            className="space-y-6"
          >
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
                <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
              )}
            </div>

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
                <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
              )}
            </div>

            <div className="flex gap-3">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-32"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Issue"
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => router.push("/issues")}
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

export default NewIssuePage;
