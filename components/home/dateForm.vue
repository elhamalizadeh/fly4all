<template>
  <div class="home-container024">
    <div class="calendar">
      <input
        class="home-textinput3 input"
        type="text"
        v-model="selectedDate"
        @click="toggleCalendar"
        readonly
        :placeholder="selectedDate"
      />
      <div v-if="isCalendarVisible">
        <!-- <div v-for="day in daysOfMonth" :key="day" @click="selectDate(day)">{{ day }}</div> -->
        <div class="calendar-box">
          <div class="nav-container">
            <button @click="previousMonth">Previous</button>
            <button @click="nextMonth" :disabled="!canGoNext">Next</button>
            <div class="current-month">
              <span>{{ currentMonthYear }}</span>
            </div>
          </div>
          <hr />
          <table>
            <thead>
              <tr>
                <th v-for="dayOfWeek in daysOfWeek" :key="dayOfWeek">
                  {{ dayOfWeek }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(week, index) in calendar" :key="index">
                <td v-for="day in week" :key="day.id">
                  <span
                    @click="selectDate(day, currentMonthYear)"
                    @mouseover="hoverBackground"
                    @mouseleave="resetBackground"
                    class="hoverable"
                  >
                    {{ day }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed } from "vue";

export default {
  setup(props, { emit }) {
    const currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();
    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const selectedDate = ref(""); // Holds the selected date
    const selectedDateToSend = ref("");
    const isCalendarVisible = ref(false); // Flag to toggle calendar visibility
    const placeholder = "Select a date"; // Placeholder for the input field
    const calendarMonth = ref(new Date().getMonth()); // Current month of the calendar
    const calendarYear = ref(new Date().getFullYear()); // Current year of the calendar

    const getNextMonth = (year, month) => {
      if (month === 11) {
        year++;
        month = 0;
      } else {
        month++;
      }
      return { year, month };
    };

    const getPreviousMonth = (year, month) => {
      if (month === 0) {
        year--;
        month = 11;
      } else {
        month--;
      }
      return { year, month };
    };

    const getDaysInMonth = (year, month) => {
      return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year, month) => {
      return new Date(year, month, 1).getDay();
    };

    const updateCalendar = (year, month) => {
      const numDaysInMonth = getDaysInMonth(year, month);
      const firstDayOfMonth = getFirstDayOfMonth(year, month);

      let days = [];
      let currentWeek = [];

      // Fill in the empty cells before the first day of the month
      for (let i = 0; i < firstDayOfMonth; i++) {
        currentWeek.push("");
      }

      // Populate the array with days
      for (let i = 1; i <= numDaysInMonth; i++) {
        currentWeek.push(i);
        if (currentWeek.length === 7 || i === numDaysInMonth) {
          days.push([...currentWeek]);
          currentWeek = [];
        }
      }

      return days;
    };

    const calendar = ref([]);

    const canGoPrevious = computed(() => {
      const currentYearMonth =
        currentDate.getFullYear() * 12 + currentDate.getMonth(); // Convert current year and month to months
      const targetYearMonth = currentYear * 12 + currentMonth; // Convert target year and month to months
      return (
        targetYearMonth > currentYearMonth - 12 &&
        targetYearMonth !== currentYearMonth
      );
    });

    const canGoNext = computed(() => {
      const currentYearMonth =
        currentDate.getFullYear() * 12 + currentDate.getMonth(); // Convert current year and month to months
      const targetYearMonth = currentYear * 12 + currentMonth; // Convert target year and month to months
      return targetYearMonth < currentYearMonth + 12; // Enable next button if target month is within 12 months ahead of current month
    });

    const currentMonthYear = ref(`${monthNames[currentMonth]} ${currentYear}`);
    const currentMonthYearEmit = `${monthNames[currentMonth]} ${currentYear}`;

    console.log("currentMonthYearEmit in dateForm", currentMonthYearEmit);
    emit("sendEmitCurrentMonthYear", selectedDateToSend);

    const nextMonth = () => {
      const { year, month } = getNextMonth(currentYear, currentMonth);
      if (year - currentDate.getFullYear() < 1) {
        currentYear = year;
        currentMonth = month;
        calendar.value = updateCalendar(year, month);
        currentMonthYear.value = `${monthNames[month]} ${year}`; // Update currentMonthYear
      }
    };

    const previousMonth = () => {
      const { year, month } = getPreviousMonth(currentYear, currentMonth);
      const previousYear = currentDate.getFullYear();
      const previousMonthIndex = currentDate.getMonth();
      if (year === previousYear && month >= previousMonthIndex) {
        currentYear = year;
        currentMonth = month;
        calendar.value = updateCalendar(year, month);
        currentMonthYear.value = `${monthNames[month]} ${year}`; // Update currentMonthYear
      }
    };

    const toggleCalendar = () => {
      isCalendarVisible.value = !isCalendarVisible.value;
    };

    // Function to handle date selection from the calendar
    function selectDate(day, currentMonthYear) {
      selectedDate.value = `${day} ${currentMonthYear}`;
      isCalendarVisible.value = false; // Hide the calendar after date selection
      console.log("selectedDate is:", selectedDate.value);
      const [month, year] = currentMonthYear.split(" ");

      // Create a new Date object with the selected day, month, and year
      const selectedDateObject = new Date(`${year}-${month}-${day}`);

      // Get the formatted date in YYYY-MM-DD format
      const formattedDate = selectedDateObject.toISOString().slice(0, 10);

      // Update selectedDate with the formatted date
      selectedDateToSend.value = formattedDate;

      // Hide the calendar after date selection
      isCalendarVisible.value = false;
      // selectedDate.value = formattedDate;

      console.log("selectedDateToSend is:", selectedDateToSend.value);
    }

    const generateDaysOfMonth = () => {
      const daysInMonth = 30;
      const daysArray = [];
      for (let i = 1; i <= daysInMonth; i++) {
        daysArray.push(i);
      }
      return daysArray;
    };

    // Initialize calendar for the current month
    calendar.value = updateCalendar(currentYear, currentMonth);

    function hoverBackground(event) {
      event.target.style.backgroundColor = "lightgray";
    }

    function resetBackground(event) {
      event.target.style.backgroundColor = "";
    }

    return {
      daysOfWeek,
      calendar,
      currentMonthYear,
      nextMonth,
      previousMonth,
      canGoPrevious,
      canGoNext,
      selectedDate,
      isCalendarVisible,
      toggleCalendar,
      selectDate,
      daysOfMonth: generateDaysOfMonth(),
      placeholder,
      calendarMonth,
      calendarYear,
      hoverBackground,
      resetBackground,
      currentMonthYearEmit, // for emit
      selectedDateToSend, //for emit
    };
  },
};
</script>
<style>
.home-container024 {
  color: rgb(18, 18, 20);
  gap: 1rem;
  position: relative;
}
.calendar {
  position: absolute;
  padding: 0;
  margin: 0;
}
.home-textinput3 input {
  position: absolute;
}
.calendar-box {
  position: absolute;
  background-color: white;
  top: 2rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  height: 50vh;
  z-index: 100;
}
ul {
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  /*----Remove default bullet points---*/
  list-style-type: none;
  padding: 0;
  margin: 0;
}
th,
td {
  padding: 5px;
  /* border: 1px solid black; */
}
.hoverable {
  padding: 5px;
}
.hoverable:hover {
  cursor: pointer;
}
.nav-container {
  display: flex;
  justify-content: space-between; /* Buttons at flex-start and flex-end */
  align-items: center; /* Centering items vertically */
  flex-wrap: wrap; /* Allow items to wrap */
}

.navigation {
  order: 1; /* Order the navigation section before the current month */
}

.current-month {
  text-align: center; /* Center-align the current month */
  width: 100%; /* Ensure full width */
  order: 2; /* Order the current month section after the navigation */
}
</style>
