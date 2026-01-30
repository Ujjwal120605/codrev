import React from 'react';
import Pillnav from './Pillnav';
const logo = '/abc.jpg';

const Nav = (props) => {
  return (
    // MODIFIED: Removed "flex justify-center" to allow the child to be full-width
    <div className="fixed top-0 left-0 right-0 z-[1000]">
      <Pillnav
        logo={logo}
        logoAlt="Coderev Logo"
        items={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
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
        {...props}
      />
    </div>
  );
};

export default Nav;