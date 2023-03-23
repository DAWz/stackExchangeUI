import React, { useEffect, useMemo, useState } from "react";
import { NoResult } from "../../components/NoResult/NoResult";
import Pagination from "../../components/Pagination/Pagination";
import { Result } from "../../components/Result/Result";
import { Search } from "../../components/SearchBar/SearchBar";
import Spinner from "../../components/Spinner/Spinner";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Questions.module.css";
import {
  useDeleteQuestionByIDMutation,
  useGetQuestionByIDQuery,
  useGetQuestionsByTagsQuery,
  useGetQuestionsQuery,
} from "../../services/questions";

const PageSize = 5;
export const Questions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchByTag, setSearchByTag] = useState(false);
  const [operation, setOperation] = useState("any");
  const { data: questions = [], isLoading } = useGetQuestionsQuery();
  const [deleteQuestion, { deleteIsLoading, error, isSuccess, isError }] =
    useDeleteQuestionByIDMutation();
  const { data: questionsByID = null, isLoading: questionByIDLoading } =
    useGetQuestionByIDQuery(searchTerm, {
      skip: searchTerm === "" || searchByTag,
    });
  const { data: questionsByTags = [], isLoading: tagsQuestionsIsLoading } =
    useGetQuestionsByTagsQuery(
      { tags: searchTerm, operation: operation },
      { skip: searchTerm === "" || !searchByTag || operation === "" }
    );
  const onDeleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      deleteQuestion(id);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Post deleted successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    if (isError) {
      if (Array.isArray(error.data.error)) {
        error.data.error.forEach((el) =>
          toast.error(el.message, {
            position: toast.POSITION.TOP_RIGHT,
          })
        );
      } else {
        toast.error(error.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  }, [deleteIsLoading, isSuccess, error, isError]);
  const data = useMemo(() => {
    if (searchTerm === "") {
      return questions;
    } else if (!searchByTag) {
      return questionsByID ? [questionsByID] : [];
    } else if (searchByTag) {
      return questionsByTags;
    }
  }, [searchTerm, searchByTag, questions, questionsByID, questionsByTags]);
  const currentTableData = useMemo(() => {
    if (data?.length === 0) return [];

    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);
  return (
    <div className={styles.wrapper}>
      <strong>Questions Dashboard</strong>
      <div className={styles.separator} />
      <div className={styles.searchBar}>
        <div>
          Browse through all the questions below, or search by ID or by tags. If
          you search by tags, you can provide more than one tag to search for by
          separating the tags in your query by a comma. If you would like to
          search for questions with any of the tags you've listed, select the
          option ANY. Otherwise, if you would like the questions with all the
          provided tags, select the option ALL.
        </div>
        <Search
          onChange={setSearchTerm}
          type={searchByTag ? "tags" : "ID"}
          onOperationChange={setOperation}
        />
        <div className={styles.typeSwitch}>
          <div
            className={!searchByTag ? styles.selectedType : styles.disabledType}
            onClick={() => {
              setSearchByTag(false);
              setSearchTerm("");
            }}
          >
            Search By ID
          </div>
          <div
            className={searchByTag ? styles.selectedType : styles.disabledType}
            onClick={() => {
              setSearchByTag(true);
              setSearchTerm("");
            }}
          >
            Search By Tags
          </div>
        </div>
      </div>
      <div className={styles.questionsWrapper}>
        {(isLoading || questionByIDLoading || tagsQuestionsIsLoading) && (
          <div className={styles.empty}>
            <Spinner />
          </div>
        )}
        {currentTableData?.length > 0 ? (
          currentTableData.map((question, i) => (
            <Result
              data={question}
              key={"Questions" + question?.id}
              deleteFunction={onDeleteHandler}
            />
          ))
        ) : (
          <div className={styles.empty}>
            <NoResult type="Questions" />
          </div>
        )}
      </div>
      <div className={styles.paginationBar}>
        <Pagination
          currentPage={currentPage}
          totalCount={data?.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
      <ToastContainer />
    </div>
  );
};
