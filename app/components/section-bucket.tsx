import React from 'react';
import { Link } from '@remix-run/react';
import parse from 'html-react-parser';
// import { Image, Action } from '../typescript/action';

// type AdditionalParam = {
//   title: string;
//   title_h2: string;
//   title_h3: string;
//   description: string;
//   html_code: string;
//   designation: string;
//   name: string;
// };

// type Buckets = {
//   title_h3: string;
//   description: string;
//   call_to_action: Action;
//   icon: Image;
//   $: AdditionalParam;
// };

export type BucketProps = {
  title_h2: string;
  description: string;
  buckets: any;
  $: any;
};

export default function SectionBucket({ section }: any) {
  return (
    <div className='member-main-section'>
      <div className='member-head'>
        {section.title_h2 && (
          <h2 {...(section.$?.title_h2 as {})}>{section.title_h2}</h2>
        )}
        {section.description && (
          <p {...(section.$?.description as {})}>{section.description}</p>
        )}
      </div>
      <div className='member-section'>
        {section.buckets?.map((bucket: any, index: any) => (
          <div className='content-section' key={index}>
            {bucket.icon && (
              <img
                {...(bucket.icon.$?.url as {})}
                src={bucket.icon.url}
                alt='bucket icon'
              />
            )}

            {bucket.title_h3 ? (
              <h3 {...(bucket.$?.title_h3 as {})}>{bucket.title_h3}</h3>
            ) : (
              ''
            )}
            {typeof bucket.description === 'string' && (
              <div {...(bucket.$?.description as {})}>
                {parse(bucket.description)}
              </div>
            )}
            {bucket.call_to_action.title ? (
              <Link
                to={
                  bucket.call_to_action.href ? bucket.call_to_action.href : '#'
                }>
                {`${bucket.call_to_action.title} -->`}
              </Link>
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
