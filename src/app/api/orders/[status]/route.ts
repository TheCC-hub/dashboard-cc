import { getAllOrdersOfUser, getAllOrdersOfUserByStatus } from "@/data-access/accessOrders";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";


// get all abundant orders of a user 
export async function GET(req: NextRequest) {
    const { url } = req
    const urlArr = url.split("/")
    const session = await getServerSession(authOptions)
    console.log(urlArr)
    if (!session || !session.user || !session.user.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const status = capitalize(urlArr[urlArr.length - 1])
        console.log(status, " status")
        const res = await getAllOrdersOfUserByStatus(session?.user?.email, status)
        console.log(res)
        return NextResponse.json({ status: 200, data: res });

    } catch (e) {
        return NextResponse.json({ error: e }, { status: 400 });
    }
}

function capitalize(str: string) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}