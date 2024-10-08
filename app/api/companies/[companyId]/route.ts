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
      return NextResponse.json({ message: "Id is missing" }, { status: 401 });
    }

    const updatedValues = await req.json();

    const company = await db.company.update({
      where: {
        id: companyId,
        userId,
      },
      data: {
        ...updatedValues,
      },
    });

    return NextResponse.json(company);
  } catch (error) {
    console.error(`[COMPANY_PATCH] : ${error}`);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
