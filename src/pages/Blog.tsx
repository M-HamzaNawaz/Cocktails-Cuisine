import React, { useState } from "react";
import { AiOutlineInstagram } from "react-icons/ai";
import { RiFacebookLine, RiLinkedinLine, RiTwitterXLine } from "react-icons/ri";

import { TbArrowBigRightFilled } from "react-icons/tb";

const BlogPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 3;

  return (
    <>
      {/* Header */}
      <div className="w-full bg-red-600 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-sm lg:px-0">
          <span className="font-medium">Blog Details</span>
          <span className="text-xs opacity-90">
            Home <span className="mx-1">–</span> Blog Details
          </span>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Hero Image */}
        <div className="w-full overflow-hidden rounded-2xl">
          <img
            src="./assets/blog/blog2.png"
            alt="Food"
            className="w-full h-[420px] object-cover"
          />
        </div>

        {/* Meta */}
        <div className="mt-6 text-sm text-gray-500">
          <span className="text-red-500 font-medium">By Admin</span> / 07
          Comment / Date - 11, 02, 2026
        </div>

        {/* Title */}
        <h1 className="mt-3 text-3xl font-bold text-gray-900">
          Health Benefits of a Raw food
        </h1>

        {/* Content */}
        <div className="mt-4 space-y-4 text-gray-600 leading-relaxed">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
            mollitia nihil sunt reprehenderit natus, soluta officia iure enim
            itaque, iste qui exercitationem et odit beatae debitis ratione
            molestiae quis atque.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
            doloribus dolor odio nobis cum voluptatem laudantium magni veritatis
            sint! Aspernatur et quisquam modi laudantium.
          </p>
        </div>

        {/* Two Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <img
              src="./assets/blog/blog3.png"
              alt="Green Juice"
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <p className="flex items-start gap-2 text-gray-600">
                <span className="mt-1 flex items-center">
                  <TbArrowBigRightFilled className="text-[17px] bg-red-500 text-white rounded-full p-[2px]" />
                </span>
                Lorem ipsum dolor consectetur adipisicing elit. Molestias,
                dolorum!
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <img
              src="./assets/blog/blog1.png"
              alt="Healthy Food"
              className="w-full h-56 object-cover"
            />
            <div className="p-5">
              <p className="flex items-start gap-2 text-gray-600">
                <span className="mt-1 flex items-center">
                  <TbArrowBigRightFilled className="text-[17px] bg-red-500 text-white rounded-full p-[2px]" />
                </span>
                Lorem ipsum dolor consectetur adipisicing elit. Molestias,
                dolorum!
              </p>
            </div>
          </div>
        </div>

        {/* Author */}
        <div className="mt-10 flex flex-col border p-6   rounded-2xl">
          <div>
            <p className="text-sm text-gray-600 mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores officiis magni explicabo fuga molestiae.Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Asperiores officiis
              magni explicabo fuga molestiae.
            </p>
          </div>
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-red-500">John martin</h3>
            <button className="h-10 w-10 flex items-center justify-center rounded-full text-red-500  hover:text-white transition">
              <img src="./assets/blog/Vector.png" alt="" />
            </button>
          </div>
        </div>
        <div>
          <p className="text-sm text-[#7A7A7A] mt-7">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            officiis magni explicabo fuga molestiae.Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Asperiores officiis magni explicabo
            fuga molestiae.
          </p>
        </div>
        {/* Tags & Pagination */}
        <div className="mt-5 flex flex-col border py-3 pl-3 md:flex-row md:items-center md:justify-between  gap-6">
          <div className="flex gap-3">
            {["Cabbage", "Appetizer", "Meat Food"].map((tag) => (
              <span
                key={tag}
                className="px-4 py-1 text-sm rounded-sm border border-gray-200 text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-">
            <button className="p-2  bg-white ">
              <RiFacebookLine className="text-2xl border" />
            </button>
            <button className="p-2 bg-white ">
              <RiTwitterXLine className="text-2xl border" />
            </button>
            <button className="p-2 bg-white ">
              <RiLinkedinLine className="text-2xl border" />
            </button>
            <button className="p-2 bg-white ">
              <AiOutlineInstagram className="text-2xl border" />
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center  py-3">
          {/* Previous */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className={`px-3 py-1 border rounded
      ${
        currentPage === 1
          ? "text-gray-400 cursor-not-allowed"
          : "hover:bg-gray-100"
      }
    `}
          >
            Previous
          </button>

          {/* Page Numbers */}
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border rounded
        ${currentPage === page ? "bg-red-500 text-white" : "hover:bg-gray-100"}
      `}
            >
              {page}
            </button>
          ))}

          {/* Next */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className={`px-3 py-1 border rounded
      ${
        currentPage === totalPages
          ? "text-gray-400 cursor-not-allowed"
          : "hover:bg-gray-100"
      }
    `}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
