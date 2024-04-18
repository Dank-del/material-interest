import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react';
import DepositForm from '../forms/deposit';


export const Route = createLazyFileRoute('/')({
  component: Index,
})



function Index() {
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    // Code to run when activeTab changes
  }, [activeTab]);

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="p-2">
      <h4 className='p-4'>Interest Calculator</h4>
      <div>
        <div className="tabs">
          <a className={activeTab === 1 ? 'active' : ''} onClick={() => handleTabClick(1)}>On Deposits</a>
          <a className={activeTab === 2 ? 'active' : ''} onClick={() => handleTabClick(2)}>On Loan</a>
          <a className={activeTab === 3 ? 'active' : ''} onClick={() => handleTabClick(3)}>On Credit Cards</a>
        </div>
        <div className={`page padding ${activeTab === 1 ? 'active' : ''}`}>
         <DepositForm/>
        </div>
        <div className={`page padding ${activeTab === 2 ? 'active' : ''}`}>
          <h5>Tab 2</h5>
        </div>
        <div className={`page padding ${activeTab === 3 ? 'active' : ''}`}>
          <h5>Tab 3</h5>
        </div>
      </div>
    </div>
  );
}
