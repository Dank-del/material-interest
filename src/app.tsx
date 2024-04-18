import Icon from '@mdi/react';
import { mdiCalculatorVariant, mdiCog, mdiHistory } from '@mdi/js';

function App() {

  return (
    <>
      <nav className="m l left">
        <header>
          <img alt='' src="https://www.beercss.com/favicon.png" className="circle" />
        </header>
        <a className='active'>
          <i><Icon path={mdiCalculatorVariant} /></i>
          <div>Calculate</div>
        </a>
        <a>
          <i><Icon path={mdiHistory} /></i>
          <div>History</div>
        </a>
        <a>
          <i><Icon path={mdiCog} /></i>
          <div>Settings</div>
        </a>
      </nav>
      <nav className="left m">
        <header>
          <img alt='' src="https://www.beercss.com/favicon.png" className="circle" />
        </header>
        <a>
          <i><Icon path={mdiCalculatorVariant} />
          </i>
          <div>Calculate</div>
        </a>
        <a>
          <i><Icon path={mdiHistory} /></i>
          <div>History</div>
        </a>
        <a>
          <i><Icon path={mdiCog} /></i>
          <div>Settings</div>
        </a>
      </nav>
      <nav className="bottom s">
        <a>
          <i>
            <Icon path={mdiCalculatorVariant} />
          </i>
          <div>Calculate</div>
        </a>
        <a>
          <i>
            <Icon path={mdiHistory} />
          </i>
          <div>History</div>
        </a>
        <a>
          <i><Icon path={mdiCog} /></i>
          <div>Settings</div>
        </a>
      </nav>
      <main className="responsive">
        <h3>Welcome</h3>
        <h5>The beer is ready!</h5>
      </main>
    </>
  )
}

export default App
