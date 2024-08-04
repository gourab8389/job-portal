import Banner from '@/components/banner';
import IconBadge from '@/components/icon-badge';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { ArrowLeft, LayoutDashboard, ListChecks } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation';
import React from 'react'
import CompanyNameForm from '../_components/name-form';

const CompanyEditPage = async ({ params }: { params: { companyId: string } }) => {
    const validObjectRegex = /^[0-9a-fA-F]{24}$/;
  if (!validObjectRegex.test(params.companyId)) {
    return redirect("/admin/companies");
  }

  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const company = await db.company.findUnique({
    where: {
      id: params.companyId,
      userId,
    },
  });

  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
  });

  if (!company) {
    return redirect("admin/companies");
  }

  const requiredFields = [
    company.name,
    company.description,
    company.logo,
    company.coverImage,
    company.mail,
    company.website,
    company.linkedIn,
    company.address_line_1,
    company.city,
    company.state,
    company.overview,
    company.whyJoinUs,
    
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);
  return (
    <div className="p-6">
    <Link href={"/admin/companies"}>
      <div className="flex items-center gap-3 text-sm text-neutral-500">
        <ArrowLeft className="w-4 h-4" />
        Back
      </div>
    </Link>

    <div className="flex items-center justify-between my-4">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl font-medium">Company Setup</h1>
        <span className="text-sm text-neutral-500">
          Complete All Fields {completionText}
        </span>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
      <div>
        <div className="flex items-center gap-x-2">
          <IconBadge icon={LayoutDashboard} />
          <h2 className="text-xl text-neutral-700">Customize your company</h2>
        </div>
        <CompanyNameForm initialData={company} companyId={company.id}/>
      </div>
      <div className="space-y-6">

      </div>

    </div>
  </div>
  )
}

export default CompanyEditPage
