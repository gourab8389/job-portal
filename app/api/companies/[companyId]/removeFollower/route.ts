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
    
      const userIndex = company?.followers.indexOf(userId)

      if(userIndex !== -1){
        const updatedCompany = await db.company.update({
            where : {
                id : companyId,
                userId
            },
            data : {
                followers : {
                    set : company.followers.filter(followerId => followerId !== userId)
                }
            }
        })
        return new NextResponse(JSON.stringify(updatedCompany), {status : 200})
      }else{
        return new NextResponse("User not found in the followers", {status : 404})
      }

  } catch (error) {
    console.error(`[COMPANY_PATCH] : ${error}`);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};