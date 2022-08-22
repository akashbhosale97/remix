import { Link, useLoaderData } from '@remix-run/react';
import parse from 'html-react-parser';
import { onEntryChange } from '../sdk';
import { getFooterRes } from '../helpers';
import Skeleton from 'react-loading-skeleton';

export function loader() {
  return getFooterRes();
}

export default function Footer() {
  const footerData = useLoaderData();
  return (
    <footer>
      <div className='max-width footer-div'>
        <div className='col-quarter'>
          {footerData && footerData.logo ? (
            <Link to='/' className='logo-tag'>
              <img
                src={footerData.logo.url}
                alt={footerData.title}
                title={footerData.title}
                // {...footer.logo.$?.url as {}}
                className='logo footer-logo'
              />
            </Link>
          ) : (
            <Skeleton width={150} />
          )}
        </div>
        <div className='col-half'>
          <nav>
            <ul className='nav-ul'>
              {footerData ? (
                footerData.navigation_menu.map((menu: any) => (
                  <li
                    className='footer-nav-li'
                    key={menu.label}
                    {...menu.$?.label}>
                    <Link to={menu.label}>{menu.label}</Link>
                  </li>
                ))
              ) : (
                <Skeleton width={300} />
              )}
            </ul>
          </nav>
        </div>
        <div className='col-quarter social-link'>
          <div className='social-nav'>
            {footerData ? (
              footerData.social?.social_share.map((social: any) => (
                <Link
                  to={social.link.href}
                  title={social.link.title}
                  key={social.link.title}>
                  {social.icon && (
                    <img
                      src={social.icon.url}
                      alt={social.link.title}
                      {...(social.icon.$?.url as {})}
                    />
                  )}
                </Link>
              ))
            ) : (
              <Skeleton width={200} />
            )}
          </div>
        </div>
      </div>
      {footerData && typeof footerData.copyright === 'string' ? (
        <div
          className='copyright'
          // {...footer.$?.copyright as {}}
        >
          {parse(footerData.copyright)}
        </div>
      ) : (
        <div className='copyright'>
          <Skeleton width={500} />
        </div>
      )}
    </footer>
    // <></>
  );
}
