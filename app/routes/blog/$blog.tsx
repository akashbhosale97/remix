import { useLoaderData } from '@remix-run/react';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton';
import ArchiveRelative from '~/components/archive-relative';
import RenderComponents from '~/components/render-components';
import { getBlogPostRes, getPageRes } from '~/helpers';

export async function loader({ params }: any) {
  let blogPostRes = await getBlogPostRes(`/blog/${params.blog}`);
  let bannerData = await getPageRes('/blog');
  let blogPostData = {
    blogPostRes,
    bannerData,
  };
  return blogPostData;
}
const BlogPage = () => {
  const blogPost = useLoaderData();
  return (
    <>
      {blogPost.bannerData ? (
        <RenderComponents
          pageComponents={blogPost.bannerData.page_components}
          blogPost
          contentTypeUid='blog_post'
          entryUid={blogPost.bannerData?.uid}
          locale={blogPost.bannerData?.locale}
        />
      ) : (
        <Skeleton height={400} />
      )}
      <div className='blog-container'>
        <article className='blog-detail'>
          {blogPost.blogPostRes && blogPost.blogPostRes.title ? (
            <h2 {...(blogPost.blogPostRes.$?.title as {})}>
              {blogPost.blogPostRes.title}
            </h2>
          ) : (
            <h2>
              <Skeleton />
            </h2>
          )}
          {blogPost.blogPostRes && blogPost.blogPostRes.date ? (
            <p {...(blogPost.blogPostRes.$?.date as {})}>
              {moment(blogPost.blogPostRes.date).format('ddd, MMM D YYYY')},{' '}
              <strong {...(blogPost.blogPostRes.author[0].$?.title as {})}>
                {blogPost.blogPostRes.author[0].title}
              </strong>
            </p>
          ) : (
            <p>
              <Skeleton width={300} />
            </p>
          )}
          {blogPost.blogPostRes && blogPost.blogPostRes.body ? (
            <div {...(blogPost.blogPostRes.$?.body as {})}>
              {blogPost.blogPostRes.body}
            </div>
          ) : (
            <Skeleton height={800} width={600} />
          )}
        </article>
        <div className='blog-column-right'>
          <div className='related-post'>
            {blogPost.bannerData &&
            blogPost.bannerData?.page_components[2].widget ? (
              <h2
                {...(blogPost.bannerData?.page_components[2].widget.$
                  ?.title_h2 as {})}>
                {blogPost.bannerData?.page_components[2].widget.title_h2}
              </h2>
            ) : (
              <h2>
                <Skeleton />
              </h2>
            )}
            {blogPost.blogPostRes && blogPost.blogPostRes.related_post ? (
              <ArchiveRelative
                {...blogPost.blogPostRes.$?.related_post}
                blogs={blogPost.blogPostRes.related_post}
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
