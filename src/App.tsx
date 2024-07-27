import './App.css';
import { Route, Routes } from 'react-router-dom';
import routes from '@/routes';
import { ReactNode } from 'react';
import Navbar from './presenter/layout/Navbar';
import { TwoFAContextProvider } from './presenter/pages/context/2FAContextProvider';

function App() {
  return (
    <section className='gradient-form h-full bg-neutral-200 dark:bg-neutral-700'>
      <div className='container h-full p-10'>
        <div className='flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200'>
          <div className='w-full'>
            <div className='block rounded-lg bg-white shadow-lg dark:bg-neutral-800'>
              <div className=''>
                <TwoFAContextProvider>
                  {/* min-h-full */}
                  <Navbar></Navbar>
                  <main>
                    <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
                      <Routes>
                        {routes.map((route, idx) => (
                          <Route
                            key={idx}
                            path={route.path}
                            element={<AppContainer content={route.component} />}
                          />
                        ))}
                      </Routes>
                    </div>
                  </main>
                </TwoFAContextProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
interface ComponentProps {
  content: ReactNode;
}

export const AppContainer = (props: ComponentProps) => {
  return <div>{props.content}</div>;
};
