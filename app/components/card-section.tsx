import React from 'react';
import { Link } from '@remix-run/react';
// import { Action } from "../typescript/action";

// type AdditionalParam = {
//     title_h3: string;
//     description: string;
//   }

// type Card = {
//     title_h3: string;
//     description: string;
//     call_to_action: Action;
//     $: AdditionalParam;
//   }

// type CardProps = {
//     cards: [Card]
//   }

export default function CardSection({ cards }: any) {
  return (
    <div className='demo-section'>
      {cards?.map((card: any, index: any) => (
        <div className='cards' key={index}>
          {card.title_h3 && (
            <h3 {...(card.$?.title_h3 as {})}>{card.title_h3}</h3>
          )}
          {card.description && (
            <p {...(card.$?.description as {})}>{card.description}</p>
          )}
          <div className='card-cta'>
            {card.call_to_action.title && card.call_to_action.href && (
              <Link to={card.call_to_action.href} className='btn primary-btn'>
                {card.call_to_action.title}
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
