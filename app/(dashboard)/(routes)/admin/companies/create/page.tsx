"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
    name: z.string().min(1, { message: "Company Name cannot be empty" }),
});

const CompanyCreatePage = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const { isSubmitting, isValid } = form.formState;
    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/companies", values);
            router.push(`/admin/companies/${response.data.id}`);
            toast.success("Company Created");
        } catch (error) {
            console.log((error as Error)?.message);
            toast.error((error as Error)?.message);
        }
    };

    return (
        <div className='max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6'>
            <div className="">
                <h1 className='text-2xl'>Name your company</h1>
                <p className='text-sm text-neutral-500'>What would you like to name your company? Don&apos;t worry, you can change it later</p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'Full-Stack Developer'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>Role of this Company</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Link href={'/admin/companies'}>
                                <Button type="button" variant={'ghost'}>
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" disabled={!isValid || isSubmitting}>
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default CompanyCreatePage;
