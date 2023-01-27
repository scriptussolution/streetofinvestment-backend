import React from "react";
import TrendingBlogReorder from "../TrendingBlogReorder";
import TopVisitedBlogReorder from "../TopVisitedBlogsReorder";
import CategoryBlogReorder from "../CategoryBlogsReorder";

const HomePage = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <TrendingBlogReorder />
      <TopVisitedBlogReorder />
      <CategoryBlogReorder />
    </div>
  );
};

export default HomePage;
