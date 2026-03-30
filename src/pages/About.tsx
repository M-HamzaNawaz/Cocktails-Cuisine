import React from "react";


const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] text-slate-800">

      {/* Red banner / breadcrumb */}
      <div className="w-full bg-red-600 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-sm lg:px-0">
          <span>About Us</span>
          <span className="text-xs opacity-90">
            Home <span className="mx-1">–</span> About Us
          </span>
        </div>
      </div>

      {/* About content */}
      <main className="flex-1">
        <section className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 lg:flex-row lg:items-start lg:px-0 lg:py-14">
          {/* Text */}
          <div className="flex-1">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              About The Carrot
            </h1>

            <div className="mt-5 space-y-4 text-[13px] leading-relaxed text-slate-600">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Ratione, recusandae necessitatibus quasi molestiae alias
                adipisci pariatur enim iure labore assumenda rerum quod.
                Temporibus magni autem a voluptatibus neque.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
                vitae rerum cum accusamus magni consequuntur architecto, ipsum
                deleniti expedita doloribus suscipit voluptatum nisi perferendis
                amet.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Accusantium, maxime omnis architecto est exercitationem optio ea
                maiores corporis, beatae doloribus dolorum libero nesciunt velit
                illum? Voluptates deserunt adipisci voluptate magni sed
                blanditiis quasi optio!
              </p>
            </div>

            {/* Stats card */}
            <div className="mt-5 block bg-gray-100 px-2 py-7 shadow-md shadow-slate-100">
              <div className="grid grid-cols-3 gap-6 ">
                <div className="flex flex-col items-center">
                  <p className="text-6xl font-semibold text-[#ff4c3b]">
                    0.1<span className="text-3xl text-[#7A7A7A]">k</span>
                  </p>
                  <p className="mt-1 text-[15px] font-bold  text-black ">
                    Vendors
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-6xl font-semibold text-[#ff4c3b]">
                    23<span className="text-3xl text-[#7A7A7A]">k</span>
                  </p>
                  <p className="mt-1 text-[15px] font-bold text-black">
                    Customers
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-6xl font-semibold text-[#ff4c3b]">
                    2<span className="text-3xl text-[#7A7A7A]">k</span>
                  </p>
                  <p className="mt-1 text-[15px] font-bold text-black">
                    Products
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="w-full max-w-md">
            <img
              src="/assets/ui/about_pic.png"
              alt="Fresh vegetables on a wooden table"
              className="h-full w-full  object-cover"
            />
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-6xl px-4 pb-14 lg:px-0">
          <div className="grid gap-5 md:grid-cols-4">
            {[
              {
                title: "Product Packing",
                text: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
              },
              {
                title: "24X7 Support",
                text: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
              },
              {
                title: "Delivery in 5 Days",
                text: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
              },
              {
                title: "Payment Secure",
                text: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center gap-2  bg-gray-100 px-5 py-6 text-[13px] shadow-sm shadow-slate-100"
              >
                <p className="text-sm font-semibold text-slate-900">
                  {item.title}
                </p>
                <p className="text-[12px] leading-relaxed text-slate-500">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>


    </div>
  );
};

export default AboutUs;
