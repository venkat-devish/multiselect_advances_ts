import { useState } from "react";
import styles from "../../styles/select.module.css";

type SelectProps = {
  label: string;
  value: number;
};

type SingleSelectOptions = {
  options: SelectProps[];
  value?: SelectProps;
  onChange: (option: SelectProps | undefined) => void;
};

const SingleSelect = ({ options, value, onChange }: SingleSelectOptions) => {
  const [isOpen, setIsOpen] = useState(false);

  function clearOptions() {
    onChange(undefined);
  }

  function selectOption(option: SelectProps) {
    onChange(option);
  }
  return (
    <div
      onBlur={() => {
        setIsOpen(false);
      }}
      onClick={() => {
        setIsOpen((prev) => !prev);
      }}
      tabIndex={0}
      className={styles.container}
    >
      <span className={styles.value}>{value?.label}</span>
      <button
        className={styles["clear-button"]}
        onClick={(e) => {
          clearOptions();
          e.stopPropagation();
        }}
      >
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map((option) => (
          <li
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
            className={styles.option}
            key={option.value}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SingleSelect;
