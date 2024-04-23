<template>
  <div class="home-container024">
    <div
      class="calendar" 
     :class="{ 'flex-display': flightFields.tripType == 'roundTrip'}"

    >
     <!-- :class="{ 'flex-display': tripTypeValue === 'roundTrip'}" -->

      <!------------ deprature --------->
      <input
        class="home-textinput3 input"
        type="text"
        v-model="selectedDate"
        @click="toggleCalendar"
        readonly
        :placeholder="placeholderText"
        :name="`legs[${index}][departure]`"
        required
      />
      <input
        class="home-textinput3 input"
        type="hidden"
        v-model="selectedDateToSend"
        readonly
        :placeholder="placeholderText"
        :name="`legs[${index}][departure]`" 
      />
      <div v-if="isCalendarVisible" class="calendar-box">
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
              <tr v-for="(week, index) in calendarWithDayOfYear" :key="index">
                <td
                v-for="dayObj in week" 
                :key="dayObj.day"
                :id="`tdDayOfMonth${day}`" 
                 >
                  <span
                    @click="selectDate(dayObj.day, currentMonthYear)"
                    @mouseover="hoverBackground"
                    @mouseleave="resetBackground"
                    :class="{
                    'gray-text': dayObj.dayOfYear < dayOfYear,
                    'hoverable': dayObj.dayOfYear >= dayOfYear
                }" 
                :id="'tdDayOfMonth' + dayObj.day"
            >
                {{ dayObj.day }}
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
        v-if="flightFields.tripType == 'roundTrip'"
      />
      <!-- v-if="flightFields.tripType == 'roundTrip'"  flightFields.tripType-->
     <!-- v-if="tripTypeValue == 'roundTrip'" -->
      <div v-if="isCalendarVisibleReturn" class="calendar-boxReturn">
        <div class="calendar-boxReturn">
          <div class="nav-container">
            <button @click="previousMonth">Previous</button>
            <button @click="nextMonth" :disabled="!canGoNext">Next</button>
            <div class="current-month">
              <span>{{ currentMonthYearReturn }}</span>
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
              <tr v-for="(week, index) in calendarWithDayOfYear" :key="index"> <!----- calendar in line 467 ----->
                  <td
                  v-for="dayObj in week" 
                  :key="dayObj.day"
                  :id="`tdDayOfMonthReturn${day}`" 
                  >
                  <span
                    @click="selectDateReturn(dayObj.day, currentMonthYearReturn)"
                    @mouseover="hoverBackground"
                    @mouseleave="resetBackground"
                    :class="{
              'gray-text': dayObj.dayOfYear < dayOfYear,
              'hoverable': dayObj.dayOfYear >= dayOfYear
                    }"
                    :id="'tdDayOfMonthReturn' + dayObj.day"
                  >
                  {{ dayObj.day }}
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
import { ref, computed , onMounted , watch } from "vue";

export default {
  props: ['currentMonthYear','currentMonthYearReturn', 'currentYear', 'currentMonth',"tripType" ,"index"],
  setup(props, { emit }) {
    const  flightFields  = useFlight();
    console.log("flightFields.tripType:==============",flightFields.tripType);
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
    const flightResults = useFlightResults();
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


/*=========
     ---getNextMonth Function1---
==========*/
    const getNextMonth = (year, month) => {
      if (month === 11) {
        year++;
        month = 0;
      } else {
        month++;
      }
      return { year, month };
    };



  
/*=========
     ---getPreviousMonth Function2---
==========*/
    const getPreviousMonth = (year, month) => {
      if (month === 0) {
        year--;
        month = 11;
      } else {
        month--;
      }
      return { year, month };
    };



/*=========
     ---getDaysInMonth Function3---
==========*/
    const getDaysInMonth = (year, month) => {
      return new Date(year, month + 1, 0).getDate();
    };




/*=========
     ---getFirstDayOfMonth Function4---
==========*/
    const getFirstDayOfMonth = (year, month) => {
      return new Date(year, month, 1).getDay();
    };




/*=========
     ---updateCalendar Function5---
==========*/
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






/*=========
     --------daysBeforeCurrentDate Function6---
==========*/

    const daysBeforeCurrentDate = [];
    const day = ref("");
const startOfYear = new Date(currentDate.getFullYear(), 0, 0); // Get the start of the current year
const diff = currentDate - startOfYear; // Calculate the difference between the current date and the start of the year
const oneDay = 1000 * 60 * 60 * 24; // Calculate the number of milliseconds in a day
const dayOfYear = Math.floor(diff / oneDay); // Divide the difference by the number of milliseconds in a day to get the day of the year

// const daysBeforeCurrentDate = [];
for (let i = 1; i <= dayOfYear; i++) {
    const dayToCheck = new Date(currentDate.getFullYear(), 0, i);
    if (i <= dayOfYear) {
        daysBeforeCurrentDate.push(i);
    }
}

// Inside your setup method or component
const calendarWithDayOfYear = computed(() => {
    return calendar.value.map(week => {
        return week.map(day => {
            const date = new Date(currentYear, currentMonth, day);
            const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
            return { day, dayOfYear };
        });
    });
});

const dayFlags = computed(() => {
    const flags = {};
    for (let i = 1; i <= daysBeforeCurrentDate.length; i++) {
        flags[i] = true; // Set flag to true for days before the current day of the year
    }
    return flags;
});





/*=========
     ---canGoPrevious Function7---
==========*/
    const canGoPrevious = computed(() => {
      const currentYearMonth =
        currentDate.getFullYear() * 12 + currentDate.getMonth(); // Convert current year and month to months
      const targetYearMonth = currentYear * 12 + currentMonth; // Convert target year and month to months
      return (
        targetYearMonth > currentYearMonth - 12 &&
        targetYearMonth !== currentYearMonth
      );
    });





/*=========
     ---canGoNext Function8---
==========*/
    const canGoNext = computed(() => {
      const currentYearMonth =
        currentDate.getFullYear() * 12 + currentDate.getMonth(); // Convert current year and month to months
      const targetYearMonth = currentYear * 12 + currentMonth; // Convert target year and month to months
      return targetYearMonth < currentYearMonth + 12; // Enable next button if target month is within 12 months ahead of current month
    });

    //------
    const currentMonthYear = ref(`${monthNames[currentMonth]} ${currentYear}`);
    const currentMonthYearEmit = `${monthNames[currentMonth]} ${currentYear}`;
    const currentMonthYearReturn = ref(`${monthNames[currentMonth]} ${currentYear}`);
    const currentMonthYearReturnEmit = `${monthNames[currentMonth]} ${currentYear}`;
    emit("sendEmitCurrentMonthYear", selectedDateToSend);
    emit("sendEmitCurrentMonthYearReturn", selectedDateReturnToSend);



/*=========
     ---nextMonth Function9---
==========*/
    const nextMonth = () => {
      const { year, month } = getNextMonth(currentYear, currentMonth);
      if (year - currentDate.getFullYear() < 1) {
        currentYear = year;
        currentMonth = month;
        calendar.value = updateCalendar(year, month);
        currentMonthYear.value = `${monthNames[month]} ${year}`; // Update currentMonthYear
        currentMonthYearReturn.value = `${monthNames[month]} ${year}`; // Update currentMonthYear

      }
    };





/*=========
     ---previousMonth Function10---
==========*/
    const previousMonth = () => {
      const { year, month } = getPreviousMonth(currentYear, currentMonth);
      const previousYear = currentDate.getFullYear();
      const previousMonthIndex = currentDate.getMonth();
      if (year === previousYear && month >= previousMonthIndex) {
        currentYear = year;
        currentMonth = month;
        calendar.value = updateCalendar(year, month);
        currentMonthYear.value = `${monthNames[month]} ${year}`; // Update currentMonthYear
        currentMonthYearReturn.value = `${monthNames[month]} ${year}`; // Update currentMonthYear

      }
    };




 /*=========
     ---toggleCalendar Function11---
==========*/   
    const toggleCalendar = () => {
      isCalendarVisible.value = !isCalendarVisible.value;
      isCalendarVisibleReturn.value = false;
    };




/*=========
     ---toggleCalendar Function12---
==========*/  
    const toggleCalendarReturn = () => {
      isCalendarVisibleReturn.value = !isCalendarVisibleReturn.value;
      isCalendarVisible.value = false;
    };





/*=========
     ---selectDate Function13---
==========*/  
    if (flightResults.page == "flySearch") {
        selectedDate.value = flightResults.departureDate;
        if(flightFields.tripType == 'roundTrip'){
        selectedDateReturn.value = flightResults.departureDateReturn;
        }
      }

    function selectDate(day, currentMonthYear) {
      const [month, year] = currentMonthYear.split(" ");
      // Create a new Date object with the selected day, month, and year
      const selectedDateObject = new Date(`${year},${month},${day}`);

      // Check if the selected date is before the current date
      if (
        selectedDateObject < currentDate ||
        selectedDateObject > new Date(selectedDateReturn.value)
      ) {
        return;
      }

      selectedDate.value = `${day} ${currentMonthYear}`;
      isCalendarVisible.value = false; // Hide the calendar after date selection


      // Add a class to change the background color
    const selectedDayElement = document.getElementById(`tdDayOfMonth${day}`);
    selectedDayElement.classList.add('red-background');


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







/*=========
     ---selectDateReturn Function14---
==========*/
    function selectDateReturn(day, currentMonthYearReturn) {
      const [month, year] = currentMonthYearReturn.split(" ");
      // document.querySelector('#tdDayOfMonth' + day).style.backgroundColor = "lightgray";
      // Create a new Date object with the selected day, month, and year
      const selectedReturnDateObject = new Date(`${year},${month},${day}`);
      // Check if the selected date is before the current date
      if (
        selectedReturnDateObject < currentDate ||
        selectedReturnDateObject < new Date(selectedDate.value)
      ) {
        return;
      }

      selectedDateReturn.value = `${day} ${currentMonthYearReturn}`;
      isCalendarVisibleReturn.value = false;
      // Add a class to change the background color
    const selectedDayElementReturn = document.getElementById(`tdDayOfMonthReturn${day}`);
    selectedDayElementReturn.classList.add('red-background');
      // Function to format the date to YYYY-MM-DD
      function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 to month as it's zero-based
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      }
      // Get the formatted date in YYYY-MM-DD format
      const formattedDate = formatDate(selectedReturnDateObject);

      // Update selectedDate with the formatted date
      selectedDateReturnToSend.value = formattedDate;

      // Hide the calendar after date selection
      isCalendarVisibleReturn.value = false;
    }



/*=========
---generateDaysOfMonth Function15---    unused
==========*/
    // const generateDaysOfMonth = () => {
    //   const daysInMonth = 30;
    //   const daysArray = [];
    //   for (let i = 1; i <= daysInMonth; i++) {
    //     daysArray.push(i);
    //   }
    //   return daysArray;
    // };

//==========//

    // Initialize calendar for the current month
    // an array consists of weeks and days of weeks

    calendar.value = updateCalendar(currentYear, currentMonth); // ---- to edit the default month by first load
    function hoverBackground(event) {
      // event.target.style.backgroundColor = "lightgray";
    }

    function resetBackground(event) {
      event.target.style.backgroundColor = "";
    }

/*=========
     ---tripTypeValue Function16---
==========*/  
    const tripTypeValue = computed(() => {
      return props.tripType;
    });




/*=========
     ---closeCalendarOnClickOutside Function176---
         // Function to close the calendar when clicking outside
==========*/  

    const closeCalendarOnClickOutside = (event) => {
      if (!event.target.closest(".calendar")) {
        isCalendarVisible.value = false;
        isCalendarVisibleReturn.value = false;
      }
    };

    // Listen for click events when component is mounted
    onMounted(() => {
      document.addEventListener("click", closeCalendarOnClickOutside);
    });


    // Remove event listener when component is unmounted to prevent memory leaks
    onUnmounted(() => {
      document.removeEventListener("click", closeCalendarOnClickOutside);
    });


    watch(() => flightResults.departureDate, (newValue) => {
      selectedDate.value = flightResults.departureDate;
      selectedDateToSend.value = flightResults.departureDateToSend;
      selectedDateReturn.value = flightResults.departureDateReturn;
      selectedDateReturnToSend.value = flightResults.departureDateReturnToSend;

});

//------------------
    return {
      daysOfWeek,
      calendar,
      currentMonthYear,
      currentMonthYearReturn,
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
      placeholder,
      calendarMonth,
      calendarYear,
      hoverBackground,
      resetBackground,
      placeholderText,
      placeholderTextReturn,
      currentMonthYearEmit, // for emit
      currentMonthYearReturnEmit, // for emit
      selectedDateToSend, //for emit
      selectedDateReturnToSend, //for emit
      tripTypeValue,
      dayFlags,
      calendarWithDayOfYear,
      day, 
      dayOfYear,
      flightFields,
      flightResults
    };
  },
};
</script>
<style>
.home-container024 {
  color: rgb(18, 18, 20);
  gap: 1rem;
}
.calendar {
  padding: 0;
  margin: 0;
  display: flex;
  width: auto;
  height: 100px;
  align-items: center;
}

.flex-display .home-textinput3.input {
  width: 100%;
}
.flex-display {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 0.5rem; 
}
.home-textinput3 input {
  width: 70%;
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
  right: 90px;
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

.gray-text {
  color: #ABB2B9;
}
.red-background {
    background-color: red;
}
</style>
