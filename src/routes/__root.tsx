import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Icon from '@mdi/react';
import { mdiCalculatorVariant, mdiCog, mdiHistory } from '@mdi/js';
import { useEffect } from 'react';


const Root = () => {
    useEffect(() => {
    if (document.body.classList.contains('dark')) {
  
      document.getElementsByName('theme-color')[0].setAttribute('content', '#141316')
    } else {
      document.getElementsByName('theme-color')[0].setAttribute('content', '#ffffff')
    }
  }, [document.body.classList.keys()])
    return (
        <>
            <nav className="m l left">
                <header>
                    <img alt='' src="https://www.beercss.com/favicon.png" className="circle" />
                </header>
                <Link to='/' className="[&.active]:active">
                    <i><Icon path={mdiCalculatorVariant} /></i>
                    <div>Calculate</div>
                </Link>
                <Link to='/history' className="[&.active]:active">
                    <i><Icon path={mdiHistory} /></i>
                    <div>History</div>
                </Link>
                <Link to='/settings' className="[&.active]:active">
                    <i><Icon path={mdiCog} /></i>
                    <div>Settings</div>
                </Link>
            </nav>
            <nav className="left m">
                <header>
                    <img alt='' src="https://www.beercss.com/favicon.png" className="circle" />
                </header>
                <Link to='/' className="[&.active]:active">
                    <i><Icon path={mdiCalculatorVariant} />
                    </i>
                    <div>Calculate</div>
                </Link>
                <Link to='/history' className="[&.active]:active">
                    <i><Icon path={mdiHistory} /></i>
                    <div>History</div>
                </Link>
                <Link to='/settings' className="[&.active]:active">
                    <i><Icon path={mdiCog} /></i>
                    <div>Settings</div>
                </Link>
            </nav>
            <nav className="bottom s">
                <Link to='/' className="[&.active]:active">
                    <i>
                        <Icon path={mdiCalculatorVariant} />
                    </i>
                    <div>Calculate</div>
                </Link>
                <Link to='/history' className="[&.active]:active">
                    <i>
                        <Icon path={mdiHistory} />
                    </i>
                    <div>History</div>
                </Link>
                <Link to='/settings' className="[&.active]:active">
                    <i><Icon path={mdiCog} /></i>
                    <div>Settings</div>
                </Link>
            </nav>
            <main className="responsive">
                <Outlet />
                {/* <TanStackRouterDevtools /> */}
            </main>
        </>
    )
}

export const Route = createRootRoute({
    component: Root,
})


