import React, { useState } from "react";

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
      {/* Header Section */}
      <div className="w-full bg-[#ff4c3b] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-sm lg:px-0">
          <span>Faq</span>
          <span className="text-xs opacity-90">
            Home <span className="mx-1">–</span>Faq
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-10 lg:px-0 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Image Section */}
        <div className="w-full p-4 flex-shrink-0">
          <img
            src="./assets/Faq/text.png"
            alt="Hotel facilities"
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
        </div>

        {/* FAQ Section */}
        <div className="w-full p-4">
          <div className="space-y-6">
            {questions.map((item, index) => (
              <div key={index} className="border-b-2 pb-4">
                <div
                  className="text-lg font-semibold cursor-pointer flex justify-between items-center"
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
                  <div className="mt-2 text-gray-700 text-sm">
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
