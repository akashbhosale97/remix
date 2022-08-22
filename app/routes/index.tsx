import { useLoaderData } from '@remix-run/react';
import RenderComponents from '~/components/render-components';
import { getPageRes } from '~/helpers';

export function loader() {
  return getPageRes('/');
}

export default function Index() {
  let pageData = useLoaderData();
  return (
    <>
      <RenderComponents
        pageComponents={pageData.page_components}
        blogPost={null}
      />
    </>
  );
}
