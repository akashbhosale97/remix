import type { MetaFunction } from '@remix-run/node';
import appcss from '~/styles/app.css';
import jsonpreview from '~/styles/json-preview.css';
import thirdparty from '~/styles/third-party.css';
import tooltip from '~/styles/tool-tip.css';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import Header from './components/header';
import Footer from './components/footer';
import { getFooterRes, getHeaderRes } from './helpers';

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
  ];
}

export default function App() {
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
        <LiveReload />
      </body>
    </html>
  );
}

function Layout({ children }: any) {
  const loaders = useLoaderData();
  return (
    <>
      <Header headerData={loaders.headerRes} />
      {children}
      <Footer footerData={loaders.footerRes} />
    </>
  );
}
