<template>
  <div class="home-container024">
    <input
      class="home-textinput3 input"
      type="text"
      v-model="selectedDate"
      @click="toggleCalendar"
      readonly
      :placeholder="selectedDate"
    />
    <div v-if="isCalendarVisible" class="calendar">
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
                  @click="
                    selectDate(
                      day,
                      calendarMonth,
                      calendarYear,
                      currentMonthYear
                    )
                  "
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
</template>
<script>
import { ref, computed } from "vue";

export default {
  setup() {
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
      isCalendarVisible.value = !isCalendarVisible.value; // Toggle calendar visibility
    };

    // Function to handle date selection from the calendar
    function selectDate(day, month, year, currentMonthYear) {
      selectedDate.value = `${day} ${currentMonthYear}`; // Update selectedDate with day, month, and year
      isCalendarVisible.value = false; // Hide the calendar after date selection
      console.log("selectedDate is:", selectedDate.value);
    }

    // Function to format the date
    const formatDate = (date) => {
      const options = { year: "numeric", month: "short", day: "2-digit" };
      return date.toLocaleDateString(undefined, options);
    };
    //-----
    const generateDaysOfMonth = () => {
      const daysInMonth = 30; // Example: Consider 30 days for simplicity
      const daysArray = [];
      for (let i = 1; i <= daysInMonth; i++) {
        daysArray.push(i);
      }
      return daysArray;
    };

    // Initialize calendar for the current month
    calendar.value = updateCalendar(currentYear, currentMonth);

    // Function to apply hover background color
    function hoverBackground(event) {
      event.target.style.backgroundColor = "lightgray";
    }

    // Function to reset background color
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
    };
  },
};
</script>
<style>
.home-container024 {
  color: blue;
  gap: 1rem;
}
.calendar {
  position: absolute;
}
.calendar-box {
  position: absolute;
  background-color: white;
  top: 3rem;
  height: 300px;
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
