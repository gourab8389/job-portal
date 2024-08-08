import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request, { params }: { params: { companyId: string } }) => {
  try {
    const { userId } = auth();
    const { companyId } = params;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!companyId) {
      return NextResponse.json({ message: "Company not found" }, { status: 401 });
    }


    const company = await db.company.findUnique({
      where: {
        id: companyId,
      },
      
    });
    
    if (!company) {
        return NextResponse.json({ message: "Company not found" }, { status: 401 });
      }
    
    const updatedData = {
        followers : company?.followers ? {push : userId} : [userId]
    }  

    const updatedCompany = await db.company.update({
        where : {
            id : companyId,
            userId
        },
        data : updatedData
    })

    return NextResponse.json(updatedCompany);
  } catch (error) {
    console.error(`[COMPANY_PATCH] : ${error}`);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
