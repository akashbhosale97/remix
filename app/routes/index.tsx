import { MetaFunction } from '@remix-run/node';
import { Meta, useLoaderData } from '@remix-run/react';
import RenderComponents from '~/components/render-components';
import { getPageRes } from '~/helpers';

export function loader() {
  return getPageRes('/');
}

export const meta: MetaFunction = () => {
  const pageData = useLoaderData();
  console.log(pageData);

  return {
    title: pageData.title,
  };
};

export default function Index() {
  const pageData = useLoaderData();
  return (
    <>
      <Meta />
      <RenderComponents
        pageComponents={pageData.page_components}
        blogPost={null}
      />
    </>
  );
}
