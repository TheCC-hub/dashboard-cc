import { prisma } from "@/lib/prisma"
import { OrderInterface } from '@/types/order.type'; // adjust path if needed


export async function upsertOrder(order: OrderInterface, clientMail: string) {
    try {
        const upsertedOrder = await prisma.order.upsert({
            where: {
                id: order.order_id || "000000000000000000000000",
            },
            update: {
                orderType: order.order_type,
                rawFootageSize: order.video_footage.raw_footage_size,
                rawFootageLength: order.video_footage.raw_footage_length,

                addOns: JSON.parse(
                    JSON.stringify(
                        order.add_ons.reduce((acc, cur) => {
                            acc[cur.title] = cur.number;
                            return acc;
                        }, {} as Record<string, number>)
                    )
                ),

                videTitle: order.logistics.video_title,
                videoCategory: order.logistics.video_category,
                publishDate: order.logistics.publish_date,
                finalLength: order.logistics.final_length,

                videoTone: order.video_tone,
                videoPace: order.video_pace,

                instructionByClient: order.order_details.instruction_by_client,
                exampleVideos: order.order_details.example_videos,
                scriptLink: order.order_details.script_link,
                rawFootageUrl: order.raw_footage_url,

                status: order.status,
            },
            create: {
                clientMail,

                orderType: order.order_type,
                rawFootageSize: order.video_footage.raw_footage_size,
                rawFootageLength: order.video_footage.raw_footage_length,

                addOns: JSON.parse(
                    JSON.stringify(
                        order.add_ons.reduce((acc, cur) => {
                            acc[cur.title] = cur.number;
                            return acc;
                        }, {} as Record<string, number>)
                    )
                ),

                videTitle: order.logistics.video_title,
                videoCategory: order.logistics.video_category,
                publishDate: order.logistics.publish_date,
                finalLength: order.logistics.final_length,

                videoTone: order.video_tone,
                videoPace: order.video_pace,

                instructionByClient: order.order_details.instruction_by_client,
                exampleVideos: order.order_details.example_videos,
                scriptLink: order.order_details.script_link,
                rawFootageUrl: order.raw_footage_url,

                status: order.status,
            },
        });

        return upsertedOrder;
    } catch (err) {
        console.error('Failed to upsert order:', err);
        throw err;
    }
}

export const getAllDraftsOfUser = async (clientMail: string) => {
    const order = await prisma.order.findMany({
        where: {
            clientMail,
            status: "draft"
        },
    })

    if (!order) {
        throw new Error("Order not found")
    }

    return order;
}
export const getAllOrdersOfUser = async (clientMail: string) => {
    const orders = await prisma.order.findMany({
        where: {
            clientMail: clientMail,
            status: {
                not: "draft",
            },
        },
        select: {
            id: true,
            createdAt: true,
            status: true,
            orderType: true,
            nextDraftIn: true
        },
    });

    // if (!order) {
    //     throw new Error("Order not found")
    // }

    return orders;
}

export const getAllOrdersOfUserByStatus = async (clientMail: string, status: string) => {
    const orders = await prisma.order.findMany({
        where: {
            clientMail: clientMail,
            status
        },
        select: {
            id: true,
            createdAt: true,
            status: true,
            orderType: true,
            nextDraftIn: true
        },
    });

    // if (!order) {
    //     throw new Error("Order not found")
    // }

    return orders;
}
