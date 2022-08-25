import type { MetaFunction } from '@remix-run/node';
import appcss from '~/styles/app.css';
import jsonpreview from '~/styles/json-preview.css';
import thirdparty from '~/styles/third-party.css';
import tooltip from '~/styles/tool-tip.css';
import nprogressStyles from 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import reactSkeleton from 'react-loading-skeleton/dist/skeleton.css';
import livePreview from '@contentstack/live-preview-utils/dist/main.css';

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useTransition,
} from '@remix-run/react';
import Header from './components/header';
import Footer from './components/footer';
import { getFooterRes, getHeaderRes } from './helpers';
import { useEffect } from 'react';
import DevTools from './components/devtools';

export const meta: MetaFunction = () => {
  return {
    charset: 'utf-8',
    title: 'Contentstack-Remix-Stater-App',
    viewport: 'width=device-width,initial-scale=1',
    description: 'Welcome to Tekt',
  };
};

export async function loader() {
  let headerRes = await getHeaderRes();
  let footerRes = await getFooterRes();
  return {
    headerRes,
    footerRes,
  };
}

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
      integrity:
        'sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'stylesheet',
      href: appcss,
    },
    {
      rel: 'stylesheet',
      href: jsonpreview,
    },
    {
      rel: 'stylesheet',
      href: thirdparty,
    },
    {
      rel: 'stylesheet',
      href: tooltip,
    },
    { rel: 'stylesheet', href: nprogressStyles },
    { rel: 'stylesheet', href: reactSkeleton },
    { rel: 'stylesheet', href: livePreview },
  ];
}

export default function App() {
  const transition = useTransition();
  useEffect(() => {
    if (transition.state === 'loading' || transition.state === 'submitting') {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [transition.state]);

  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
        <script
          src='https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js'
          integrity='sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM'
          crossOrigin='anonymous'></script>
      </body>
    </html>
  );
}

function Layout({ children }: any) {
  const loaders = useLoaderData();
  return (
    <>
      <Header headerData={loaders.headerRes} />
      <DevTools response={loaders} />
      {children}
      <Footer footerData={loaders.footerRes} />
    </>
  );
}
