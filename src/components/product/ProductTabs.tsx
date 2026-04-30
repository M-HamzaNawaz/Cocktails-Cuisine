import React, { useState } from 'react';

const tabs = ['description', 'information', 'review'] as const;
type Tab = (typeof tabs)[number];

const ProductTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('description');

  const renderContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="space-y-5 text-sm leading-7 text-slate-600">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error in
              vero sapiente odio, temporibus consequatur nobis veniam odit
              dignissimos consectetur quae in perferendis dicta repellat amet
              illum adipisci vel perferendis dolor.
            </p>

            <div className="rounded-2xl bg-slate-50 p-5">
              <h4 className="font-semibold text-slate-800">Packaging and delivery</h4>
              <p className="mt-3">
                Quis vel consequuntur repellat distinctio rem. Corrupti ratione
                alias odio, error dolore temporibus consequatur, nobis veniam
                odit laborum dignissimos consectetur quae vero in perferendis
                provident quis.
              </p>
            </div>
          </div>
        );

      case 'information':
        return (
          <div className="grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Origin
              </p>
              <p className="mt-2 font-medium text-slate-800">Fresh market selection</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Storage
              </p>
              <p className="mt-2 font-medium text-slate-800">Keep refrigerated after opening</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Packaging
              </p>
              <p className="mt-2 font-medium text-slate-800">Eco-friendly sealed pack</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Shelf life
              </p>
              <p className="mt-2 font-medium text-slate-800">Best within 5 to 7 days</p>
            </div>
          </div>
        );

      case 'review':
        return (
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h4 className="font-semibold text-slate-800">Ayesha Khan</h4>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Verified buyer
                  </p>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  4.8 / 5
                </span>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Fresh packaging, quick delivery, and the quality felt exactly
                like the product preview. Would order again.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-wrap gap-2 border-b border-slate-200 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition ${
              activeTab === tab
                ? 'bg-red-500 text-white shadow-[0_10px_24px_rgba(255,76,59,0.2)]'
                : 'bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div>{renderContent()}</div>
    </div>
  );
};

export default ProductTabs;
