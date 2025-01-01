'use client'

import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
      <p>© {currentYear ? currentYear : 'Loading...'} Jemsonnn. All rights reserved.</p>
    </div>
  );
};

export default Footer;
