import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const CreatePost = () => {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-lg font-bold">
        Create Post
      </h1>
      <div className="flex flex-col gap-4">
        <Input placeholder="Enter title..." />
        <Textarea placeholder="Explain in detail..." />
        <Button className="self-end">Post</Button>
      </div>
    </div>
  );
};

export default CreatePost;
