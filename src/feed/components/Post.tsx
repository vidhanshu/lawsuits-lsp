import React from 'react';
import dayjs from "dayjs";

import { NSFeed } from '../types';

const Post = ({ title, description, date }: NSFeed.TPost) => {
  return (
    <div className="px-4 py-2 border rounded-md space-y-4">
      <h2 className="text-lg font-bold">{title} . <span className='text-xs font-normal'>{dayjs(date).format("DD/MM/YY hh:mm A")}</span></h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Post;
