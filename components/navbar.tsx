'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';
import { ModeToggle } from './mode-toggle';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  return (
    <nav
      className={`fixed w-full ${
        nav ? 'h-screen' : 'h-[80px]'
      } transition-all duration-500 shadow-lg bg-white dark:bg-[#1c1d1f] dark:text-white`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[80px]">
          <Link href="/">
            <h1 className="text-xl">Renaldy Hidayat</h1>
          </Link>
          <div className="md:hidden cursor-pointer" onClick={handleClick}>
            {nav ? <FaTimes /> : <FaBars />}
          </div>
          <ul
            className={`${
              nav
                ? 'absolute top-[80px] left-0 w-full bg-white dark:bg-[#1c1d1f] dark:text-white flex flex-col items-center justify-center'
                : 'md:flex hidden'
            } md:flex`}
          >
            <li className="md:px-4 py-2 px-2">
              <Link href="/">Home</Link>
            </li>

            <li className="md:px-4 py-2 px-2">
              <Link href="/blog">Blog</Link>
            </li>
            <li className="md:px-4 py-2 px-2">
              <Link href="/portofolio">Portfolio</Link>
            </li>
            <li className="md:px-4 py-2 px-2">
              <Link href="/about">About</Link>
            </li>
            <li className="md:px-4 py-2 px-2">
              <ModeToggle />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
