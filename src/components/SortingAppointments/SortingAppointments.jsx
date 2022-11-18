import { useState } from "react";
import { sortList, sortingDirection } from "src/constants";
import "./style.scss";

const SortingAppointments = ({
  patientSorting,
  reverseSorting,
  doctorSorting,
  dateSorting,
  resetSorting,
}) => {
  const [valueSortList, setValueSortList] = useState("none");
  const [valueSortingDirection, setValueSortingDirection] = useState("");

  const handlerSorting = (value) => {
    setValueSortList(value);
    if (valueSortingDirection === "По убыванию") {
      setValueSortingDirection("По возрастанию");
      reverseSorting();
    }
    if (value === "Имя") {
      return patientSorting();
    }
    if (value === "Врач") {
      return doctorSorting();
    }
    if (value === "Дата") {
      return dateSorting();
    }

    return resetSorting();
  };

  const handlerSortingReverse = (value) => {
    setValueSortingDirection(value);
    reverseSorting();
  };

  return (
    <div className="sorting">
      <label className="sorting__text" htmlFor="sorting-appointment">
        Сортировать по:
      </label>
      <select
        id="sorting-appointment"
        className="sorting__input"
        value={valueSortList}
        onChange={(e) => handlerSorting(e.target.value)}
      >
        {sortList.map((element) => {
          return (
            <option className="option" key={element.uniqueKey}>
              {element.item}
            </option>
          );
        })}
      </select>
      {valueSortList !== "none" && (
        <>
          <label className="sorting__text" htmlFor="sorting-appointment">
            Направление:
          </label>
          <select
            id="sorting-appointment"
            className="sorting__input"
            value={valueSortingDirection}
            onChange={(e) => handlerSortingReverse(e.target.value)}
          >
            {sortingDirection.map((element) => {
              return (
                <option className="option" key={element.uniqueKey}>
                  {element.item}
                </option>
              );
            })}
          </select>
        </>
      )}
    </div>
  );
};

export default SortingAppointments;
