import { MetaFunction } from '@remix-run/node';
import { Meta, useLoaderData } from '@remix-run/react';
import Skeleton from 'react-loading-skeleton';
import ArchiveRelative from '~/components/archive-relative';
import BlogList from '~/components/blog-list';
import RenderComponents from '~/components/render-components';
import { getBlogListRes, getPageRes } from '~/helpers';

export async function loader() {
  let archived: any = [];
  let blogs: any;
  let banner = await getPageRes('/blog');
  await getBlogListRes()
    .then((list) => (blogs = list))
    .then((blogArray) =>
      blogArray.filter((singleBlog) => {
        if (singleBlog.is_archived) archived.push(singleBlog);
      })
    );
  let blogPageData = {
    banner,
    blogs,
    archived,
  };
  return blogPageData;
}

export const meta: MetaFunction = () => ({
  title: 'Blog',
});

const Blog = () => {
  const getBlogPageData = useLoaderData();
  return (
    <>
      <Meta />
      {getBlogPageData.banner.page_components ? (
        <RenderComponents
          pageComponents={getBlogPageData.banner.page_components}
          blogPost
          contentTypeUid='page'
          entryUid={getBlogPageData.banner.uid}
          locale={getBlogPageData.banner.locale}
        />
      ) : (
        <Skeleton height={400} />
      )}
      <div className='blog-container'>
        <div className='blog-column-left'>
          {getBlogPageData.blogs ? (
            getBlogPageData.blogs
              .splice(0, 3)
              .map((blogList: any, index: any) => (
                <BlogList bloglist={blogList} key={index} />
              ))
          ) : (
            <Skeleton height={400} width={400} count={3} />
          )}
        </div>
        <div className='blog-column-right'>
          {getBlogPageData.banner &&
            getBlogPageData.banner.page_components[1].widget && (
              <h2>
                {getBlogPageData.banner.page_components[1].widget.title_h2}
              </h2>
            )}
          {getBlogPageData.archived ? (
            <ArchiveRelative blogs={getBlogPageData.archived} />
          ) : (
            <Skeleton height={600} width={300} />
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;
