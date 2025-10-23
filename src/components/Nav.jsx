import React from 'react';
import Pillnav from './Pillnav';
import logo from '/abc.jpg';

const Nav = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[1000] flex justify-center pt-6 px-4">
      <Pillnav
        logo={logo}
        logoAlt="Coderev Logo"
        items={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/app/about' },  // Changed from /about to /app/about
          { label: 'Contact', href: '/contact' }
        ]}
        
        activeHref="/"
        className="custom-nav"
        ease="power2.easeOut"
        baseColor="#000000"
        pillColor="#ffffff"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#000000"
        initialLoadAnimation={true}
      />
    </div>
  );
};

export default Nav;