"use client";

import { useEffect, useState } from "react";
import NextAndBackButtons from "./nextAndBackButtons";
import { createOrder } from "@/utils/api-requests";
import { useOrderFormStore } from "@/store/orderFormStore";

const VideoDetailsForm = () => {
    const { order, updateField } = useOrderFormStore();
    // Handle input changes
    const handleChange = (e: any) => {
        updateField("order_details", { ...order.order_details, [e.target.name]: e.target.value })
    };


    return (
        <div className="w-full mx-auto">
            {/* Title */}
            <h2 className="text-2xl font-bold">Your video details</h2>
            <p className="text-gray-300">Tell us more about the context of your video.</p>

            {/* Rich Text Editor */}
            <div className="mt-4">
                <label className="block text-gray-200 font-medium mb-2">How do you want us to edit the video?</label>
                <textarea
                    name="instruction_by_client"
                    value={order.order_details.instruction_by_client}
                    onChange={handleChange}
                    placeholder="Type here"
                    rows={6}
                    className="w-full border p-2 rounded mt-1 bg-transparent outline-none" />
            </div>

            {/* Example Videos */}
            <div className="mt-4">
                <label className="block text-gray-200 font-medium mb-2">Example Videos (multiple links separated by commas)</label>
                <input
                    type="text"
                    name="example_videos"
                    value={order.order_details.example_videos}
                    onChange={handleChange}
                    placeholder="Leave example video links for us to draw inspiration from.(multiple links separated by commas)"
                    className="w-full border p-2 rounded mt-1 bg-transparent outline-none"
                />
            </div>

            {/* Script Link */}
            <div className="mt-4">
                <label className="block text-gray-200 font-medium mb-2">Script Link</label>
                <input
                    type="text"
                    name="script_link"
                    value={order.order_details.script_link}
                    onChange={handleChange}
                    placeholder="If you have a script, leave a link here or include it with your raw footage."
                    className="w-full border p-2 rounded mt-1 bg-transparent outline-none"
                />
            </div>
            <NextAndBackButtons
                disabled={false}
            />

        </div>
    );
};

export default VideoDetailsForm;