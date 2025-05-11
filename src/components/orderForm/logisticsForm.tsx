"use client";

import { useEffect, useState } from "react";
import NextAndBackButtons from "./nextAndBackButtons";
import { useOrderFormStore } from "@/store/orderFormStore";

const LogisticsForm = () => {
    const { order, updateField } = useOrderFormStore();

    // Handle Input Changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        updateField("logistics", { ...order.logistics, [e.target.name]: e.target.value });
    };

    return (
        <div className="w-full">
            {/* Title */}
            <div>
                <h2 className="text-3xl">Order Logistics</h2>
                <p className=" mb-4 cursor-pointer">
                    Tell us a bit more about your order...
                </p>
            </div>

            {/* Form */}
            <div className="space-y-4 ">
                {/* Video Title */}
                <div>
                    <label className="block text-gray-100">Video Title *</label>
                    <input
                        type="text"
                        name="video_title"
                        value={order.logistics.video_title}
                        onChange={handleChange}
                        placeholder="What's the title of your video?"
                        className={`w-full border p-2 rounded mt-1 bg-transparent outline-none ${order.logistics.video_title ? "" : "border-red-500"}`}
                        required
                    />
                </div>

                {/* Video Category */}
                <div>
                    <label className="block text-gray-100">Video Category</label>
                    <input
                        type="text"
                        name="video_category"
                        value={order.logistics.video_category}
                        onChange={handleChange}
                        placeholder="Gaming, cooking, talking head, video essay, etc."
                        className="w-full border p-2 rounded mt-1 bg-transparent outline-none"
                    />
                </div>

                {/* Video Description */}
                <div>
                    <label className="block text-gray-100">Video Description</label>
                    <textarea
                        name="video_description"
                        value={order.logistics.video_description}
                        onChange={handleChange}
                        placeholder="What's the video about?"
                        className="w-full border p-2 rounded mt-1 h-24 resize-none bg-transparent outline-none"
                    ></textarea>
                </div>

                {/* Publish Date */}
                <div>
                    <label className="block text-gray-100">Publish Date</label>
                    <input
                        type="date"
                        name="publish_date"
                        value={order.logistics.publish_date}
                        onChange={handleChange}
                        className="w-full border p-2 rounded mt-1 bg-transparent outline-none text-white"
                    />
                </div>

                {/* Final Length */}
                <div>
                    <label className="block text-gray-100">Final Length *</label>
                    <input
                        type="text"
                        name="final_length"
                        value={order.logistics.final_length}
                        onChange={handleChange}
                        placeholder="How long should the final version be?"
                        className={`w-full border p-2 rounded mt-1 bg-transparent outline-none ${order.logistics.final_length ? "" : "border-red-500"}`}
                        required
                    />
                </div>

            </div>

            <NextAndBackButtons
                disabled={(order.logistics.video_title && order.logistics.final_length) ? false : true}
            />

        </div>
    );
};

export default LogisticsForm;