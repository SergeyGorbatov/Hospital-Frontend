import "./style.scss";
import deleteSvg from "src/img/filter.svg";
import cancelFilter from "src/img/cancelFilter.svg";
import { useState } from "react";

const FilterAppointments = ({
  openFiltering,
  activeFiltering,
  fromFilter,
  ToFilter,
  fromToFilter,
  resetFiltering,
}) => {
  const [date, setDate] = useState({
    dateFrom: "",
    dateTo: "",
  });

  const handleChange = (name, value) => {
    setDate({
      ...date,
      [name]: value,
    });
  };

  const filterDate = async () => {
    if (date.dateFrom && date.dateTo) {
      return fromToFilter(date);
    }
    if (date.dateFrom) {
      return fromFilter(date);
    }
    if (date.dateTo) {
      return ToFilter(date);
    }
  };

  const reset = async () => {
    await resetFiltering();
    openFiltering(false);
    setDate({
      dateFrom: "",
      dateTo: "",
    });
  };

  return activeFiltering ? (
    <div className="group-filter">
      <label className="filter__text" htmlFor="from">
        c :
      </label>
      <input
        id="from"
        type="date"
        className="filter__input"
        value={date.dateFrom}
        onChange={(event) => handleChange("dateFrom", event.target.value)}
      />
      <label className="filter__text" htmlFor="to">
        по :
      </label>
      <input
        id="to"
        type="date"
        className="filter__input"
        value={date.dateTo}
        onChange={(event) => handleChange("dateTo", event.target.value)}
      />
      <button
        type="button"
        className="filter-button"
        onClick={() => filterDate()}
      >
        Фильтровать
      </button>
      <input
        type="image"
        alt="Отменить"
        className="filter-cancel"
        src={cancelFilter}
        onClick={() => reset()}
        value=""
      />
    </div>
  ) : (
    <div className="filter">
      Добавить фильтр по дате:
      <input
        className="add-filter"
        type="image"
        alt="Добавить"
        src={deleteSvg}
        value=""
        onClick={() => openFiltering(true)}
      />
    </div>
  );
};

export default FilterAppointments;
