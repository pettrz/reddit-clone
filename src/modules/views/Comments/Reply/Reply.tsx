import React from 'react';
import './Reply.scss';

interface IReply {
  data: any;
}

export const Reply = ({ data }: IReply) => {
  return (
    <div className='reply'>
      <div className='reply__header'>
        <h3>
          {data.author}
        </h3>
      </div>
      <div className='reply__body'>
        {data.body}
      </div>
    </div>
  );
};

export default Reply;
