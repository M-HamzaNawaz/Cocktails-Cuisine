import React, { useState } from "react";
import PageBanner from "../components/ui/PageBanner";

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const questions = [
    {
      question: "What Facilities Does Your Hotel Have?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
    {
      question: "How Do I Book A Room For My Vacation?",
      answer: "Booking a room can be done online or by calling...",
    },
    {
      question: "How Are We best among others?",
      answer: "We offer unmatched customer service...",
    },
    {
      question: "Is There Any Fitness Center In Your Hotel?",
      answer: "Yes, we have a fully equipped gym available for guests...",
    },
    {
      question: "What Type Of Room Service Do You Offer?",
      answer: "Room service includes breakfast, dinner, and snacks...",
    },
    {
      question: "What Type Of Room Service Do You Offer?",
      answer: "Room service includes breakfast, dinner, and snacks...",
    },
    {
      question: "What Type Of Room Service Do You Offer?",
      answer: "Room service includes breakfast, dinner, and snacks...",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <PageBanner title="Faq" />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-10 sm:grid-cols-2 lg:px-0">
        <div className="w-full flex-shrink-0 p-4">
          <img
            src="./assets/Faq/text.png"
            alt="Hotel facilities"
            className="h-auto w-full rounded-lg shadow-lg object-cover"
          />
        </div>

        <div className="w-full p-4">
          <div className="space-y-6">
            {questions.map((item, index) => (
              <div key={index} className="border-b-2 pb-4">
                <div
                  className="flex cursor-pointer items-center justify-between text-lg font-semibold"
                  onClick={() => toggleOpen(index)}
                >
                  <span>{item.question}</span>
                  <span
                    className={`transform transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                  >
                    &#x25BC;
                  </span>
                </div>
                {openIndex === index && (
                  <div className="mt-2 text-sm text-gray-700">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
