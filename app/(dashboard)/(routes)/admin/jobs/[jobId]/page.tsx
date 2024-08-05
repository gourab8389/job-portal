import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, Building2, LayoutDashboard, ListChecks } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import JobPublishAction from "./_components/job-publish-actions";
import Banner from "@/components/banner";
import IconBadge from "@/components/icon-badge";
import TitleForm from "./_components/title-form";
import CategoryForm from "./_components/category-form";
import ImageForm from "./_components/image-form";
import JobLink from "./_components/job-link";
import ShortDescription from "./_components/short-description";
import ShiftTimingForm from "./_components/shift-timing-mode";
import HourlyRateForm from "./_components/hourly-rate-form";
import WorkModeForm from "./_components/work-mode-form";
import WorkExperienceForm from "./_components/work-experience-form";
import JobDescription from "./_components/job-description";
import TagsForm from "./_components/tags-form";
import CompanyForm from "./_components/company-form";

const JobDetailsPage = async ({ params }: { params: { jobId: string } }) => {
  const validObjectRegex = /^[0-9a-fA-F]{24}$/;
  if (!validObjectRegex.test(params.jobId)) {
    return redirect("/admin/jobs");
  }

  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const job = await db.job.findUnique({
    where: {
      id: params.jobId,
      userId,
    },
  });

  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
  });
  const companies = await db.company.findMany({
    where : {
      userId
    },
    orderBy : {
      createdAt : "desc"
    }
  })

  if (!job) {
    return redirect("admin/jobs");
  }

  const requiredFields = [
    job.title,
    job.description,
    job.imageUrl,
    job.categoryId,
    job.jobLink,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <div className="p-6">
      <Link href={"/admin/jobs"}>
        <div className="flex items-center gap-3 text-sm text-neutral-500">
          <ArrowLeft className="w-4 h-4" />
          Back
        </div>
      </Link>

      <div className="flex items-center justify-between my-4">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Job Setup</h1>
          <span className="text-sm text-neutral-500">
            Complete All Fields {completionText}
          </span>
        </div>
        <JobPublishAction
          jobId={params.jobId}
          isPublished={job.isPublished}
          disabled={!isComplete}
        />
      </div>
      {!job.isPublished && (
        <Banner
          variant={"warning"}
          label="This job is unpublished. It will not be visible in the jobs list"
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl text-neutral-700">Customize your job</h2>
          </div>
          <TitleForm initialData={job} jobId={job.id} />

          <CategoryForm
            initialData={{ ...job, categoryId: job.categoryId || "" }}
            jobId={job.id}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />

          <ImageForm initialData={job} jobId={job.id} />
          <JobLink initialData={job} jobId={job.id} />

          <ShortDescription initialData={job} jobId={job.id} />

          {/* Shift Timing mode */}
          <ShiftTimingForm
            initialData={{ ...job, categoryId: job.categoryId || "" }}
            jobId={job.id}
          />

          <HourlyRateForm
            initialData={{ ...job, categoryId: job.categoryId || "" }}
            jobId={job.id}
          />

          <WorkModeForm initialData={job} jobId={job.id} />

          <WorkExperienceForm initialData={job} jobId={job.id} />
        </div>
        <div className="space-y-6">

          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecks}/>
              <h2 className="text-xl text-neutral-700">Job Requirements</h2>
            </div>
            <TagsForm initialData={job} jobId={job.id}/>
          </div>


          <div className="">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Building2}/>
              <h2 className="text-xl text-neutral-700">Company Details</h2>
            </div>
            <CompanyForm
            initialData={{ ...job, companyId: job.companyId || "" }}
            jobId={job.id}
            options={companies.map((company) => ({
              label: company.name,
              value: company.id,
            }))}
          />
          </div>
        </div>

        <div className="col-span-2">
          <JobDescription initialData={job} jobId={job.id} />
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
