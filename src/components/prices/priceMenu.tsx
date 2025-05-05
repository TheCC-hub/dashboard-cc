import React from 'react'

export default function PriceMenu({ tabs, setActiveTab, activeTab }: any) {
  return (
    <>
      {tabs.map((tab: any, idx: number) => (
        <button
          onClick={() => setActiveTab(tab.label)}
          className={`pb-2 font-semibold text-lg hover:text-red-300 border-b-2  hover:border-red-400 whitespace-nowrap transform duration-300 ease-in-out 
                            ${activeTab === tab.label ? "border-b-2 text-red-400 border-[var(--color-brand-red)]" : "border-transparent"}`
          }
          key={idx}
        >
          {tab.label}
        </button>
      ))}
    </>
  )
}
