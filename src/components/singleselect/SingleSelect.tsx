import { useEffect, useState } from "react";
import styles from "../../styles/select.module.css";

export type SelectOption = {
  label: string;
  value: number;
};

type MultipleSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

type SingleSelectProps = {
  multiple?: false;
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

type SelectProps = {
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

const SingleSelect = ({ multiple, options, value, onChange }: SelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [highlightedOptions, setHighlightedOptions] = useState(0);

  function selectedOption(option: SelectOption) {
    return multiple ? value.includes(option) : option === value;
  }

  function selectOption(option: SelectOption) {
    if (multiple) {
      if (value?.includes(option)) {
        onChange(value.filter((opt) => opt !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) onChange(option);
    }
  }

  function highlightedOption(idx: number) {
    setHighlightedOptions(idx);
  }

  function clearOptions() {
    multiple ? onChange([]) : onChange(undefined);
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
      <div className={styles.value}>
        {multiple
          ? value.map((el) => (
              <button
                key={el.value}
                className={styles["option-badge"]}
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption(el);
                }}
              >
                {el.label}
                <span className={styles["remove-button"]}>&times;</span>
              </button>
            ))
          : value?.label}
      </div>
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
