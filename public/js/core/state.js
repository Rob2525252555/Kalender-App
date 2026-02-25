const today = new Date();

const state ={
    tasks: [],
    today,
    selectedYear: today.getFullYear(),
    selectedMonth: today.getMonth(),
    selectedDay: today.getDay()
};

export default state;