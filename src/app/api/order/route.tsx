import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { upsertOrder } from "@/data-access/accessOrders";
import { NextRequest, NextResponse } from "next/server";
import { OrderInterface } from "@/types/order.type";

export async function POST(req: NextRequest) {
    const { order } = await req.json();

    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const res = await upsertOrder(order as OrderInterface, session?.user?.email)
        return NextResponse.json({ status: 200, id: res.id });

    } catch (e) {
        return NextResponse.json({ error: e }, { status: 400 });
    }
}