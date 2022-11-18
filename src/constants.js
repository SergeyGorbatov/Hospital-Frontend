const URL = "http://localhost:5000";

const doctors = [
  {
    uniqueKey: 10001,
    doctor: "",
  },
  {
    uniqueKey: 10002,
    doctor: "Горбатов Сергей Александрович",
  },
  {
    uniqueKey: 10003,
    doctor: "Николаев Альберт Вальерьевич",
  },
  {
    uniqueKey: 10004,
    doctor: "Супченко Александр Александрович",
  },
];

const tableTitles = [
  {
    uniqueKey: 20001,
    title: "Имя",
  },
  {
    uniqueKey: 20002,
    title: "Врач",
  },
  {
    uniqueKey: 20003,
    title: "Дата",
  },
  {
    uniqueKey: 20004,
    title: "Жалобы",
  },
  {
    uniqueKey: 20005,
    title: "",
  },
];

const sortList = [
  {
    uniqueKey: 30001,
    item: "none",
  },
  {
    uniqueKey: 30002,
    item: "Имя",
  },
  {
    uniqueKey: 30003,
    item: "Врач",
  },
  {
    uniqueKey: 30004,
    item: "Дата",
  },
];

const sortingDirection = [
  {
    uniqueKey: 40001,
    item: "По возрастанию",
  },
  {
    uniqueKey: 40002,
    item: "По убыванию",
  },
];

export {
  URL,
  doctors,
  tableTitles,
  sortList,
  sortingDirection
};
