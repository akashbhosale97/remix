import { MetaFunction } from '@remix-run/node';
import { Meta, useLoaderData } from '@remix-run/react';
import RenderComponents from '~/components/render-components';
import { getPageRes } from '~/helpers';

export function loader({ params }: any) {
  return getPageRes('/' + params.page);
}

export const meta: MetaFunction = () => {
  const pageData = useLoaderData();
  return {
    title: pageData.title,
  };
};

const Page = () => {
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
};

export default Page;
