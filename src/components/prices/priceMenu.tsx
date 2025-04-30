import React from 'react'

export default function PriceMenu({ tabs, setActiveTab, activeTab }: any) {
  return (
    <>
      {tabs.map((tab: any, idx: number) => (
        <button
          onClick={() => setActiveTab(tab.label)}
          className={`pb-2 font-semibold text-lg hover:text-[var(--color-brand-red)]  hover:border-[var(--color-brand-red)] whitespace-nowrap transform duration-300 ease-in-out 
                            ${activeTab === tab.label ? "border-b-2 text-[var(--color-brand-red)] border-[var(--color-brand-red)]" : "border-gray-300"}`
          }
          key={idx}
        >
          {tab.label}
        </button>
      ))}
    </>
  )
}
