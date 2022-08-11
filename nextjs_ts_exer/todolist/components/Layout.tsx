import React from 'react';
import Link from 'next/link';

const Layout: React.FC = ({ children }: any) => {
    return ( 
      <div className="page">
        <Link href="/">
          <a className="logo">
            <picture>
              <source srcSet="/logo.png" type="png" />
              <img src="/logo.png" alt="Landscape picture" />
            </picture>
          </a>
        </Link>
        {children}
      </div>
    );
}

export default Layout;