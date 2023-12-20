"use client";

import React from "react";

import Feed from "./Feed";
import CreatePost from "./CreatePost";
import Container from "@/src/common/components/Container";
import { Separator } from "@/components/ui/separator";

const FeedPage = () => {
  return (
    <Container as="main" className="pb-8">
      <CreatePost />
      <Separator className="mb-4" />
      <Feed />
    </Container>
  );
};

export default FeedPage;
