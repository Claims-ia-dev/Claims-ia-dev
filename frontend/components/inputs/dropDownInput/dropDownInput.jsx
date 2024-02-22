import styles from './dropDownInput.module.css';
import { FaChevronDown } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function DropdownInput ({ type, value, placeholder, options, handleSelect, isOpen, setIsOpen, handleSelectId }) {

  const handleSelectBoth = async(option) => {
    await handleSelect(option.name);
    await handleSelectId(option.id);
  }

  return (
    <div onClick={() => setIsOpen(!isOpen)} className={styles.dropdownInput}>
      <div className={styles.selectedValue}>
        <p style={value ? {color:"#000000"} : {color:"#B2B2B2"}}>{value ? value : placeholder}</p>
        {isOpen
          ? <IoClose onClick={() => setIsOpen(!isOpen)} fontSize={"2em"} className={styles.iconPosition}/>
          : <FaChevronDown fontSize={"2em"} className={styles.iconPosition}/>
        }
      </div>
      {isOpen && (
        <div className={`${styles.dropdownOptions} ${styles.dropdownOptionsOpen}`}>
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => {console.log(option); type === "second" ? handleSelectBoth(option) : handleSelect(option.name)}}
              className={styles.dropdownOption}>
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
