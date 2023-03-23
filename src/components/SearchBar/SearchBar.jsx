import styles from "./SearchBar.module.css";
import Select from "react-select";

export const Search = ({ onChange, type, onOperationChange }) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onChange(event.target.value);
    }
  };
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.searchWrapper}
        type={type === "ID" ? "number" : "text"}
        onKeyDown={handleKeyDown}
        placeholder="Search by the title ..."
      />
      {type === "tags" && (
        <div className={styles.select}>
          <Select
            name="tagSearch"
            options={[
              { value: "any", label: "Any" },
              { value: "all", label: "All" },
            ]}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(value) => onOperationChange(value.value)}
            defaultValue={{ value: "any", label: "Any" }}
          />
        </div>
      )}
    </div>
  );
};
