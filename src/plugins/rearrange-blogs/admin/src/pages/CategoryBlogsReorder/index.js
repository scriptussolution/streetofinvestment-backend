import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { UPDATE_BLOGS_ORDER_FOR_CATEGORY } from "../../components/mutations";
import { ARTICLES, FETCH_CATEGORIES } from "../../components/queries";

const CategoryBlogReorder = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(1);

  const [fetchCategoriesData, { refetch: refetchCategories }] =
    useLazyQuery(FETCH_CATEGORIES);

  const [fetchArticlesData] = useLazyQuery(ARTICLES);

  const [updateBlogsOrder] = useMutation(UPDATE_BLOGS_ORDER_FOR_CATEGORY);

  const fetchInitialData = async () => {
    const { data } = await refetchCategories();
    setCategories(data?.categories?.data || []);
  };

  const fetchBlogDataBasedOnCategory = async () => {
    const { data } = await fetchArticlesData({
      variables: {
        filters: { categories: { id: { eq: selectedCategory } } },
        pagination: { pageSize: 100000 },
      },
    });
    const newBlogs = data.articles.data;
    const selectedCategoryData = categories.find(
      (elem) => Number(elem.id) === Number(selectedCategory)
    );
    const splittedOrderValue = selectedCategoryData?.attributes?.blogOrders
      ? selectedCategoryData?.attributes?.blogOrders
          .split(",")
          ?.map((elem) => Number(elem))
      : [];
    let orderedBlogs = [];
    splittedOrderValue.forEach((bId) => {
      const obj = newBlogs.find((elem) => Number(elem.id) === bId);
      if (obj?.id) {
        orderedBlogs.push(obj);
      }
    });
    orderedBlogs = [
      ...orderedBlogs,
      ...newBlogs.filter(
        (elem) => !splittedOrderValue.includes(Number(elem.id))
      ),
    ];
    setBlogs(orderedBlogs);
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchBlogDataBasedOnCategory();
  }, [selectedCategory, categories]);

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
      const blogOrders = blogs.map((item) => item.id).join(",");
      await updateBlogsOrder({
        variables: {
          input: { categoryId: Number(selectedCategory), blogOrders },
        },
      });
      await fetchInitialData();
      setIsLoading(false);
    } catch (error) {
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
          key={`item-${value?.attributes.title}`}
          index={index}
          blogIndex={index}
          value={value?.attributes.title}
        />
      ))}
    </ul>
  ));
  return (
    <div style={{ marginTop: "5%", width: "650px" }}>
      <div
        style={{
          listStyle: "none",
          maxWidth: "max-content",
          maxWidth: "650px",
          minWidth: "600px",
          borderRadius: "6px",
          boxShadow: "0 2px 5px 0 rgba(0, 0, 0, 0.26)",
          margin: "5% 0px 0px 8%",
          height: "680px",
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
          Category Blogs
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <select
            name="categories"
            value={selectedCategory}
            id="categories"
            style={{
              width: "35%",
              height: "30px",
              borderRadius: "6px",
              boxShadow: "rgb(0 0 0 / 24%) 0px 3px 8px",
              cursor: "pointer",
            }}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
          >
            {categories.map((category, index) => (
              <option
                style={{ padding: "8px 0px" }}
                key={index}
                value={category.id}
              >
                {category.attributes.name}
              </option>
            ))}
          </select>
        </div>
        <div
          style={{
            overflowY: "auto",
            height: "500px",
            border: "0.5px solid #e9e2e2",
            padding: "3px",
            borderRadius: "3px",
          }}
        >
          {blogs.length ? (
            <SortableList items={blogs} onSortEnd={onSortEnd} />
          ) : (
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              No Blogs!!!
            </div>
          )}
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
    </div>
  );
};

export default CategoryBlogReorder;
