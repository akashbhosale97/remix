import { MetaFunction } from '@remix-run/node';
import { useLoaderData, useParams } from '@remix-run/react';
import RenderComponents from '~/components/render-components';
import { getPageRes } from '~/helpers';

export function loader({ params }: any) {
  return getPageRes(`/${params.page}`);
}

export const meta: MetaFunction = ({ params }) => ({
  title: params.page,
});

const Page = () => {
  const pageData = useLoaderData();
  return (
    <>
      <RenderComponents
        pageComponents={pageData.page_components}
        blogPost={null}
      />
    </>
  );
};

export default Page;
