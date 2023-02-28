import { useEffect, useState } from "react";
import styles from "../../styles/select.module.css";

type SelectOption = {
  label: string;
  value: number;
};

type SingleSelectProps = {
  options: SelectOption[];
  value?: SelectOption;
  onChange: (option: SelectOption | undefined) => void;
};

const SingleSelect = ({ options, value, onChange }: SingleSelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [highlightedOptions, setHighlightedOptions] = useState(0);

  function selectedOption(option: SelectOption) {
    return option === value;
  }

  function selectOption(option: SelectOption) {
    onChange(option);
  }

  function highlightedOption(idx: number) {
    setHighlightedOptions(idx);
  }

  function clearOptions() {
    onChange(undefined);
  }

  useEffect(() => {
    if (isOpen) setHighlightedOptions(0);
  }, [isOpen]);

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
      <div className={styles.value}>{value?.label}</div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          clearOptions();
        }}
        className={styles.button}
      >
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={`${!isOpen ? styles.caret : styles["caret-rev"]}`}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map((option, index) => (
          <li
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
            onMouseEnter={(e) => {
              highlightedOption(index);
            }}
            className={`${styles.option} ${
              selectedOption(option) ? styles.selected : ""
            }
            ${index === highlightedOptions ? styles.hovered : ""}
            `}
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
