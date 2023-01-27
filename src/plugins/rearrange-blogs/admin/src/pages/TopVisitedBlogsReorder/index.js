import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { UPDATE_BLOGS_ORDER_MUTATION } from "../../components/mutations";
import { ARTICLES } from "../../components/queries";

const TopVisitedBlogReorder = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [fetchArticlesData] = useLazyQuery(ARTICLES, {
    variables: {
      filters: { isTopVisited: { eq: true } },
      pagination: { pageSize: 100000 },
      sort: ["isTopVisitedOrder:asc"],
    },
  });

  const [updateBlogsOrder] = useMutation(UPDATE_BLOGS_ORDER_MUTATION);

  const fetchInitialData = async () => {
    const { data } = await fetchArticlesData();
    setBlogs(data.articles.data);
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const reorderedBlogs = reorderBlogsArray(blogs, oldIndex, newIndex);
    setBlogs(reorderedBlogs);
  };

  const reorderBlogsArray = (list, startIndex, endIndex) => {
    const logosResult = reorderArray(list, startIndex, endIndex);
    return logosResult;
  };

  const reorderArray = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      let data = [];
      blogs.map((item, index) => {
        data.push({ blogId: Number(item.id), isTopVisitedOrder: index + 1 });
      });
      await updateBlogsOrder({ variables: { input: { blogs: data } } });
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const SortableItem = SortableElement(({ value, blogIndex }) => (
    <li
      tabIndex={0}
      style={{
        boxShadow: " 0 2px 5px 0 rgba(0, 0, 0, 0.26)",
        padding: "10px",
        listStyle: "none",
        margin: "8px",
        cursor: "grab",
      }}
    >
      <div
        style={{
          display: "flex",
          whiteSpace: "break-spaces",
          lineHeight: "normal",
        }}
      >
        <span style={{ fontWeight: "bold" }}>
          {blogIndex + 1}
          {"."}&nbsp;
        </span>
        <span>{value}</span>
      </div>
    </li>
  ));

  const SortableList = SortableContainer(({ items }) => (
    <ul style={{ listStyle: "none" }}>
      {items.map((value, index) => (
        <SortableItem
          key={`item-${value.attributes.title}`}
          index={index}
          blogIndex={index}
          value={value.attributes.title}
        />
      ))}
    </ul>
  ));

  return (
    <div style={{ marginTop: "5%", width: "650px" }}>
      {blogs.length && (
        <div
          style={{
            listStyle: "none",
            maxWidth: "max-content",
            borderRadius: "6px",
            boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.26)",
            margin: "5% 0px 0px 8%",
            height: "650px",
            minWidth: "600px",
            maxWidth: "650px",
            backgroundColor: "white",
            padding: "20px",
            border: "2px solid grey",
          }}
        >
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "25px",
              paddingBottom: "20px",
            }}
          >
            Top Visited Blogs
          </p>
          <div
            style={{
              overflowY: "auto",
              height: "520px",
              border: "0.5px solid #e9e2e2",
              padding: "3px",
              borderRadius: "3px",
            }}
          >
            <SortableList items={blogs} onSortEnd={onSortEnd} />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <button
              style={{
                marginTop: "15px",
                marginBottom: "15px",
                background: "#4945ff",
                color: "#fff",
                padding: "8px 16px",
                border: "1px solid #4945ff",
                borderRadius: "8px",
              }}
              disabled={isLoading}
              onClick={handleSave}
            >
              {isLoading ? "Saving.." : "Save"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopVisitedBlogReorder;
