import styles from "./tablePagination.module.css";
import Toggle from "../inputs/toggle/toggle";

export default function TablePagination({
  currentPage,
  totalPages,
  handlePrevious,
  handleNext,
  handleFirst,
  handleLast,
  data,
  checkboxStates,
  handleCheckboxChange,
  startingIndex,
  paginatedData,
}) {
  return (
    <>
      <section className={styles.questionsContainer}>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Claims description</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={index}>
                <td>{startingIndex + index + 1}</td>
                <td>{item.description}</td>
                <td>
                  <Toggle
                    index={index}
                    startingIndex={startingIndex}
                    checkboxStates={checkboxStates}
                    handleCheckboxChange={handleCheckboxChange}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <div className={styles.buttonsContainer}>
        <button onClick={currentPage === 0 ? handleFirst : handlePrevious}>
          {currentPage === 0 ? "Cancel" : "Back"}
        </button>
        <button
          onClick={currentPage === totalPages - 1 ? handleLast : handleNext}
        >
          {currentPage === totalPages - 1 ? "Finish this room" : "Next"}
        </button>
      </div>
    </>
  );
}
