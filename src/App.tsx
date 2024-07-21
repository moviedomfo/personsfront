import './App.css';
import Loging from './presenter/pages/Login';

function App() {
  return (
    <section className='gradient-form h-full bg-neutral-200 dark:bg-neutral-700'>
      <div className='container h-full p-10'>
        <div className='flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200'>
          <div className='w-full'>
            <div className='block rounded-lg bg-white shadow-lg dark:bg-neutral-800'>
              {/* <div className='g-0 lg:flex lg:flex-wrap'> */}
              <div className='mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem]'>
                {/*   Left column container */}
                <div className='px-4 md:px-0 lg:w-6/12'>
                  <Loging></Loging>
                </div>

        
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
