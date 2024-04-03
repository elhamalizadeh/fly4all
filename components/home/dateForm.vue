<template>
  <div class="home-container024">
    <div class="calendar" :class="{ 'flex-display': tripTypeValue === 'roundTrip' }">
      <!------------ deprature --------->
      <input
        class="home-textinput3 input"
        type="text"
        v-model="selectedDate"
        @click="toggleCalendar"
        readonly
        :placeholder="placeholderText"
        required
      />
      <div v-if="isCalendarVisible" class="calendar-box">
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
  <!------------ return --------->
  <input
        class="home-textinput3 input"
        type="text"
        v-model="selectedDateReturn"
        @click="toggleCalendarReturn"
        readonly
        :placeholder="placeholderTextReturn"
        required
        v-if="tripTypeValue == 'roundTrip'"
      />
      <div v-if="isCalendarVisibleReturn" class="calendar-boxReturn">
        <!-- <div v-for="day in daysOfMonth" :key="day" @click="selectDate(day)">{{ day }}</div> -->
        <div class="calendar-boxReturn">
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
                    @click="selectDateReturn(day, currentMonthYear)"
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
      <!-- <h2>{{ tripTypeValue }}</h2> -->
    </div>
  </div>
</template>
<script>
import { ref, computed } from "vue";

export default {
  props: ["tripType"],
  setup(props, { emit }) {
    // const tripType = props.tripType;
    const currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();
    let currentDay = currentDate.getDay();
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

    const selectedDateReturn = ref(""); // Holds the selected date
    const selectedDateReturnToSend = ref("");
    const isCalendarVisible = ref(false); // Flag to toggle calendar visibility
    const isCalendarVisibleReturn = ref(false);
    const placeholder = "Select a date"; // Placeholder for the input field
    const calendarMonth = ref(new Date().getMonth()); // Current month of the calendar
    const calendarYear = ref(new Date().getFullYear()); // Current year of the calendar

    const placeholderText = computed(() => {
      return selectedDate.value ? selectedDate.value : "Deprature";
    });

    const placeholderTextReturn = computed(() => {
      return selectedDateReturn.value ? selectedDateReturn.value : "Return";
    });

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

    emit("sendEmitCurrentMonthYear", selectedDateToSend);
    emit("sendEmitCurrentMonthYearReturn", selectedDateReturnToSend);

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
      isCalendarVisibleReturn.value = false;
    };

    const toggleCalendarReturn = () => {
      isCalendarVisibleReturn.value = !isCalendarVisibleReturn.value;
      isCalendarVisible.value = false;
    };

//---start------
    // Function to handle date selection from the calendar
    function selectDate(day, currentMonthYear) {
      const [month, year] = currentMonthYear.split(" ");

      // Create a new Date object with the selected day, month, and year
      const selectedDateObject = new Date(`${year},${month},${day}`);

      // Check if the selected date is before the current date
      if (selectedDateObject < currentDate  || selectedDateObject > new Date(selectedDateReturn.value)) {
        // Do not allow selection of dates before the current date
        return;
      }

      selectedDate.value = `${day} ${currentMonthYear}`;
      isCalendarVisible.value = false; // Hide the calendar after date selection
      isCalendarVisibleReturn.value = false;

      // Function to format the date to YYYY-MM-DD
      function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 to month as it's zero-based
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      }

      // Get the formatted date in YYYY-MM-DD format
      const formattedDate = formatDate(selectedDateObject);

      // Update selectedDate with the formatted date
      selectedDateToSend.value = formattedDate;

      // Hide the calendar after date selection
      isCalendarVisible.value = false;
    }
//-----end----
//---start------
    // Function to handle date selection from the calendar
    function selectDateReturn(day, currentMonthYear) {
      const [month, year] = currentMonthYear.split(" ");

      // Create a new Date object with the selected day, month, and year
      const selectedDateObject = new Date(`${year},${month},${day}`);

      // Check if the selected date is before the current date
      if (selectedDateObject < currentDate || selectedDateObject < new Date(selectedDate.value)) {
        // Do not allow selection of dates before the current date
        return;
      } 

      selectedDateReturn.value = `${day} ${currentMonthYear}`;
      isCalendarVisibleReturn.value = false;

      // Function to format the date to YYYY-MM-DD
      function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 to month as it's zero-based
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      }

      // Get the formatted date in YYYY-MM-DD format
      const formattedDate = formatDate(selectedDateObject);

      // Update selectedDate with the formatted date
      selectedDateReturnToSend.value = formattedDate;

      // Hide the calendar after date selection
      isCalendarVisible.value = false;
      isCalendarVisibleReturn.value = false;
    }
//-----end----
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

    const tripTypeValue = computed(() => {
      // You can return any value here, but for a computed property, it's common to return a derived value based on props or other reactive variables
      return props.tripType;
    });

    return {
      daysOfWeek,
      calendar,
      currentMonthYear,
      nextMonth,
      previousMonth,
      canGoPrevious,
      canGoNext,
      selectedDate,
      selectedDateReturn,
      isCalendarVisible,
      isCalendarVisibleReturn,
      toggleCalendar,
      toggleCalendarReturn,
      selectDate,
      selectDateReturn,
      daysOfMonth: generateDaysOfMonth(),
      placeholder,
      calendarMonth,
      calendarYear,
      hoverBackground,
      resetBackground,
      placeholderText,
      placeholderTextReturn,
      currentMonthYearEmit, // for emit
      selectedDateToSend, //for emit
      selectedDateReturnToSend, //for emit
      // tripType: props.tripType,
      tripTypeValue,
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
  display:flex;
  width: auto;
  height: 100px;
}
.home-textinput3 input {
  position: absolute;
  width:100%;
}
.calendar-box {
  position: absolute;
  background-color: white;
  top: 2rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  height: 50vh;
  z-index: 100;
}
.calendar-boxReturn {
  position: absolute;
  background-color: white;
  top: 2rem;
  right:-4rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  height: 50vh;
  z-index: 100;
}
ul {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  list-style-type: none;
  padding: 0;
  margin: 0;
}
th,
td {
  padding: 5px;
}
.hoverable {
  padding: 5px;
}
.hoverable:hover {
  cursor: pointer;
}
.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.navigation {
  order: 1;
}

.current-month {
  text-align: center;
  width: 100%;
  order: 2;
}

.flex-display {
  display: flex;
  gap:0.5rem;
}
.flex-display .home-textinput3.input {
  width: 50%;
}
</style>
