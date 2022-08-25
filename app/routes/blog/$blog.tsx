import { Meta, useLoaderData } from '@remix-run/react';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton';
import ArchiveRelative from '~/components/archive-relative';
import RenderComponents from '~/components/render-components';
import { getBlogPostRes, getPageRes } from '~/helpers';
import parse from 'html-react-parser';
import { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = ({ params }) => {
  return {
    title: `${params.blog?.charAt(0).toUpperCase()}${params.blog?.slice(1)}`,
  };
};

export async function loader({ params }: any) {
  let blogPostRes = await getBlogPostRes(`/blog/${params.blog}`);
  let bannerData = await getPageRes('/blog');
  let blogPostData = {
    Blog: blogPostRes,
    Banner: bannerData,
  };
  return blogPostData;
}
const BlogPage = () => {
  const blogPost = useLoaderData();
  return (
    <>
      <Meta />
      {blogPost.Banner ? (
        <RenderComponents
          pageComponents={blogPost.Banner.page_components}
          blogPost
          contentTypeUid='blog_post'
          entryUid={blogPost.Banner?.uid}
          locale={blogPost.Banner?.locale}
        />
      ) : (
        <Skeleton height={400} />
      )}
      <div className='blog-container'>
        <article className='blog-detail'>
          {blogPost.Blog && blogPost.Blog.title ? (
            <h2 {...(blogPost.Blog.$?.title as {})}>{blogPost.Blog.title}</h2>
          ) : (
            <h2>
              <Skeleton />
            </h2>
          )}
          {blogPost.Blog && blogPost.Blog.date ? (
            <p {...(blogPost.Blog.$?.date as {})}>
              {moment(blogPost.Blog.date).format('ddd, MMM D YYYY')},{' '}
              <strong {...(blogPost.Blog.author[0].$?.title as {})}>
                {blogPost.Blog.author[0].title}
              </strong>
            </p>
          ) : (
            <p>
              <Skeleton width={300} />
            </p>
          )}
          {blogPost.Blog && blogPost.Blog.body ? (
            <div {...(blogPost.Blog.$?.body as {})}>
              {parse(blogPost.Blog.body)}
            </div>
          ) : (
            <Skeleton height={800} width={600} />
          )}
        </article>
        <div className='blog-column-right'>
          <div className='related-post'>
            {blogPost.Banner && blogPost.Banner?.page_components[2].widget ? (
              <h2
                {...(blogPost.Banner?.page_components[2].widget.$
                  ?.title_h2 as {})}>
                {blogPost.Banner?.page_components[2].widget.title_h2}
              </h2>
            ) : (
              <h2>
                <Skeleton />
              </h2>
            )}
            {blogPost.Blog && blogPost.Blog.related_post ? (
              <ArchiveRelative
                {...blogPost.Blog.$?.related_post}
                blogs={blogPost.Blog.related_post}
              />
            ) : (
              <Skeleton width={300} height={500} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
