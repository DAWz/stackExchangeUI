import React, { useEffect, useRef, useState } from "react";
import { Box } from "../../components/Box/Box";
import { HorizontalBarChart } from "../../components/HorizontalBarChart/HorizontalBarChart";
import Select from "react-select";
import styles from "./Home.module.css";
import {
  useGetQuestionsByTagsForVisualQuery,
  useGetQuestionsQuery,
} from "../../services/questions";
import { useGetTagsQuery } from "../../services/tags";
import Spinner from "../../components/Spinner/Spinner";

export const Home = () => {
  const ref = useRef();
  const [selected, setSelected] = useState([]);

  const { data: tags, isLoading: tagsIsLoading } = useGetTagsQuery();
  const { data: questionsByTags = [] } = useGetQuestionsByTagsForVisualQuery({
    tag: selected.map(({ name }) => name),
  });
  const { data: questions, isLoading: questionsLoading } =
    useGetQuestionsQuery();
  useEffect(
    () => {
      if (!tagsIsLoading && tags?.length > 3) setSelected([tags[2], tags[3]]);
    },
    // eslint-disable-next-line
    [tags]
  );
  return (
    <div className={styles.wrapper}>
      <strong>Welcome to the Stack Overflow Dashboard</strong>
      <div className={styles.separator} />
      <div>
        This dashboard provides insight into a sample of questions from Stack
        Overflow; more information can be found in the about section.
      </div>
      <div className={styles.boxes}>
        <Box
          color={"#E2C2B9"}
          width={"20%"}
          header={"Total Questions"}
          content={`${questions?.length} Questions`}
          loading={questionsLoading}
        />
        <Box
          color={"#E2C2B9"}
          width={"20%"}
          header={"Questions Answered"}
          content={`${
            questions?.filter((x) => {
              return x.is_answered;
            })?.length
          } Questions`}
          loading={questionsLoading}
        />
        <Box
          color={"#E2C2B9"}
          width={"20%"}
          header={"Number of Technologies (Tags)"}
          content={`${tags?.length} Unique Tags`}
          loading={tagsIsLoading}
        />
        <Box
          color={"#E2C2B9"}
          width={"20%"}
          header={"Average Tags per Question"}
          content={`${(
            questions?.map((x) => x.tags).flat().length / questions?.length
          ).toFixed(2)} per Question`}
          loading={questionsLoading}
        />
      </div>
      <div className={styles.visualWrapper} ref={ref}>
        <div className={styles.visualHeader}>
          <strong>Questions by Tags/ Technologies</strong>
          <div className={styles.tagSelect}>
            {tagsIsLoading ? (
              <Spinner small />
            ) : (
              <Select
                isMulti
                name="tags"
                options={tags}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionValue={(option) => option.name}
                getOptionLabel={(option) => option.name}
                value={selected}
                onChange={(value) => setSelected(value)}
              />
            )}
          </div>
        </div>
        <HorizontalBarChart
          svgWrapperRef={ref}
          height={500}
          data={questionsByTags}
        />
      </div>
    </div>
  );
};
