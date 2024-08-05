"use client";

import { Editor } from "@/components/editor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import getGenerativeAIResponse from "@/scripts/aistudio";
import { zodResolver } from "@hookform/resolvers/zod";
import { Company } from "@prisma/client";

import axios from "axios";
import { Lightbulb, Loader2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Preview } from "@/components/preview";

interface WhyJoinUSFormProps {
  initialData: Company;
  companyId: string;
}

const formSchema = z.object({
  whyJoinUs: z.string().optional(),
});

const WhyJoinUSForm = ({ initialData, companyId }: WhyJoinUSFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [rollname, setRollname] = useState("");
  const [aiValue, setAiValue] = useState("");
  const [isPrompting, setIsPrompting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { whyJoinUs: initialData.whyJoinUs || "" },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(`/api/companies/${companyId}`, values);
      if (response.status !== 200) {
        toast.error("Company not updated");
        return;
      }
      toast.success("Company updated");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const toggleEditing = () => setIsEditing((current) => !current);

  const handlePromptGeneration = async () => {
    try {
      setIsPrompting(true);

      const customPrompt = `Please create a comprehensive yet concise "Why Join Us" section for a company named ${rollname}. This section should include the following details:
1. Company Overview: Briefly introduce the company, including its history, mission, and core values.
2. Culture and Work Environment: Describe the company culture, including the work environment, team dynamics, and any unique cultural aspects.
3. Career Growth and Opportunities: Highlight the opportunities for career advancement, professional development, and any training programs offered.
4. Benefits and Perks: Detail the benefits and perks provided to employees, such as health insurance, retirement plans, remote work options, wellness programs, and other incentives.
5. Impact and Innovation: Explain the company's impact on the industry and community, including any innovative projects, contributions, or recognitions.
6. Employee Testimonials: Optionally include one or two brief testimonials from current employees about their experiences working at the company.

Make sure the content is engaging and tailored to attract potential employees who share the company's values and vision.`;

      const data = await getGenerativeAIResponse(customPrompt);
      const cleanedText = data.replace(/^'|'$/g, "").replace(/[*#]/g, "").replace(/\n/g, " ");
      setAiValue(cleanedText);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong...");
    } finally {
      setIsPrompting(false);
    }
  };

  const onCopy = () => {
    navigator.clipboard.writeText(aiValue);
    toast.success("Copied to Clipboard");
  }

  useEffect(() => {
    form.setValue("whyJoinUs", aiValue);
  }, [aiValue, form]);

  return (
    <div className="mt-6 border bg-neutral-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Why Join Us
        <Button onClick={toggleEditing} variant={"ghost"}>
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <div className={cn("text-sm mt-2", !initialData.whyJoinUs && "text-neutral-500 italic")}>
          {!initialData.whyJoinUs && "No details"}
          {initialData.whyJoinUs && (
            <Preview value={initialData.whyJoinUs}/>
          )}
        </div>
      )}

      {isEditing && (
        <>
          <div className="flex items-center gap-2 my-2">
            <input
              type="text"
              placeholder="Company Name"
              value={rollname}
              onChange={(e) => setRollname(e.target.value)}
              className="w-full p-2 rounded-md"
            />
            {isPrompting ? (
              <Button>
                <Loader2 className="w-4 h-4 animate-spin" />
              </Button>
            ) : (
              <Button onClick={handlePromptGeneration}>
                <Lightbulb className="w-4 h-4" />
              </Button>
            )}
          </div>
          <p className="text-xs text-muted-foreground text-right">
            Note*: Type the company name over here to generate the whyJoinUs content
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="whyJoinUs"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Editor
                        {...field}
                        value={field.value || aiValue}
                        onChange={(value) => {
                          field.onChange(value);
                          setAiValue(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2">
                <Button disabled={!isValid || isSubmitting} type="submit">
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </>
      )}
    </div>
  );
};

export default WhyJoinUSForm;
