import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react';
import DepositForm from '../forms/deposit';
import CreditCardForm from '../forms/creditcard';
import Icon from '@mdi/react';
import { mdiCashFast, mdiCreditCardMultipleOutline } from '@mdi/js';

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
    <div className="">
      <h4 className='p-4'>Interest Calculator</h4>
      <div>
        <div className="tabs">
          <a className={activeTab === 1 ? 'active' : ''} onClick={() => handleTabClick(1)}>
            <Icon path={mdiCashFast} size={1} />
            On Deposits
          </a>
          {/* <a className={activeTab === 2 ? 'active' : ''} onClick={() => handleTabClick(2)}>On Loan</a> */}
          <a className={activeTab === 3 ? 'active' : ''} onClick={() => handleTabClick(3)}>
            <Icon path={mdiCreditCardMultipleOutline} size={1} />
            On Credit Cards
          </a>
        </div>
        <div className={`page padding left ${activeTab === 1 ? 'active' : ''}`}>
          <DepositForm />
        </div>
        {/* <div className={`page padding right ${activeTab === 2 ? 'active' : ''}`}>
          <h5>Tab 2</h5>
        </div> */}
        <div className={`page padding right ${activeTab === 3 ? 'active' : ''}`}>
          <CreditCardForm />
        </div>
      </div>
    </div>
  );
}
