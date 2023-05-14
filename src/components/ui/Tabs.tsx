import { useState } from 'react'

type TabType = {
  label: string
  component: React.JSX.Element
}
type TabsPropsType = TabType[]
export default function Tabs({ tabs }: { tabs: TabsPropsType }) {
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  return (
    <div>
      <div className='flex border-b justify-center gap-20 bg-[#242424c3] w-[80%] mx-auto mb-8 rounded-sm'>
        {/* Loop through tab data and render button for each. */}
        {tabs.map((tab, idx) => {
          return (
            <button
              key={idx}
              className={`py-2 border-b-4 transition-colors duration-300 text-lg ${
                idx === activeTabIndex ? 'border-slate-200' : 'border-transparent hover:border-gray-200'
              }`}
              // Change the active tab on click.
              onClick={() => setActiveTabIndex(idx)}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      {/* Show active tab content. */}
      {tabs.map((tab, idx) => {
        if (idx === activeTabIndex) {
          return tab.component
        }
      })}
    </div>
  )
}
