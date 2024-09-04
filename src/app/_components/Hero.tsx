import React from 'react';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className='flex justify-center items-center flex-col pb-28 px-4'>
      <div className="mx-auto max-w-screen-xl px-4 pt-32 lg:flex lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-xl font-extrabold sm:text-5xl dark:text-white">
            Track Your Expenses Efficiently.
            <strong className="font-extrabold text-primary sm:block">
              {" "}
              Manage Your Budget Better.{" "}
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed text-black/80 dark:text-white/80">
            Keep track of your spending, set budgets, and analyze your financial habits with ease.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-1/2rounded bg-primary px-10 py-3 text-sm font-medium text-white shadow hover:bg-primary/80 focus:outline-none active:bg-primary/80 sm:w-auto"
              href="/Dashboard"  // Update to the appropriate route
            >
              Get Started
            </a>
          </div>
        
        </div>
      </div>
      <Image src="/images/dashboard.jpg" alt="Dashboard" width={1000} height={700} className='mt-10 rounded-xl border-2' />
    </section>
  );
};

export default Hero;
