<template>
  <div class="home-container024">
    <div
      class="calendar"
      :class="{ 'flex-display': tripTypeValue === 'roundTrip' }"
    >
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
                    'red-text': dayObj.dayOfYear < dayOfYear,
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
        v-if="tripTypeValue == 'roundTrip'"
      />
      <div v-if="isCalendarVisibleReturn" class="calendar-boxReturn">
        <!-- <div v-for="day in daysOfMonth" :key="day" @click="selectDate(day)">{{ day }}</div> -->
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
              'red-text': dayObj.dayOfYear < dayOfYear,
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
      <!-- <h2>{{ tripTypeValue }}</h2> -->
    </div>
  </div>
</template>
<script>
import { ref, computed , onMounted  } from "vue";

export default {
  // props: ["tripType"],
  props: ['currentMonthYear','currentMonthYearReturn', 'currentYear', 'currentMonth',"tripType"],
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
    // const currentDate = new Date(); // Get the current date
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
    // console.log("flags:",flags);
    return flags;
});


// console.log("dayToCheck.getMonth()+1:",dayToCheck.getMonth()+1);
// console.log("currentMonth:",currentMonth);
// console.log("currentDay:",currentDay);








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



    // console.log("currentMonthYear 329:",currentMonthYear.value);
    // console.log("currentMonthYearReturn 329:",currentMonthYearReturn.value);

    emit("sendEmitCurrentMonthYear", selectedDateToSend);
    emit("sendEmitCurrentMonthYearReturn", selectedDateReturnToSend);

    //-----


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
    // Function to handle date selection from the calendar
    function selectDate(day, currentMonthYear) {
      console.log("selected day:395" , day);
      const [month, year] = currentMonthYear.split(" ");
      // document.querySelector('#tdDayOfMonth' + day).style.backgroundColor = "lightgray";
      // Create a new Date object with the selected day, month, and year
      const selectedDateObject = new Date(`${year},${month},${day}`);

      // Check if the selected date is before the current date
      if (
        selectedDateObject < currentDate ||
        selectedDateObject > new Date(selectedDateReturn.value)
      ) {
        // alert(day);
        return;
      }

      selectedDate.value = `${day} ${currentMonthYear}`;
      console.log("selectedDate:" , selectedDate.value);
      isCalendarVisible.value = false; // Hide the calendar after date selection
      // isCalendarVisibleReturn.value = false;


      // Add a class to change the background color
    const selectedDayElement = document.getElementById(`tdDayOfMonth${day}`);
    console.log("selectedDayElement 419:" , selectedDayElement);
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
      console.log("selected day:459" , day);
      const [month, year] = currentMonthYearReturn.split(" ");
      // document.querySelector('#tdDayOfMonth' + day).style.backgroundColor = "lightgray";
      // Create a new Date object with the selected day, month, and year
      const selectedReturnDateObject = new Date(`${year},${month},${day}`);

      // Check if the selected date is before the current date
      if (
        selectedReturnDateObject < currentDate ||
        selectedReturnDateObject < new Date(selectedDate.value)
      ) {
        // alert(day);
        return;
      }

      selectedDateReturn.value = `${day} ${currentMonthYearReturn}`;
      // isCalendarVisible.value = false; // Hide the calendar after date selection
      isCalendarVisibleReturn.value = false;


      // Add a class to change the background color
    const selectedDayElementReturn = document.getElementById(`tdDayOfMonthReturn${day}`);
    console.log("selectedDayElementReturn 480:" , selectedDayElementReturn);
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


    // function selectDateReturn(day, currentMonthYear) {
    //   const [month, year] = currentMonthYear.split(" ");

    //   // Create a new Date object with the selected day, month, and year
    //   const selectedDateObject = new Date(`${year},${month},${day}`);

    //   // Check if the selected date is before the current date
    //   if (
    //     selectedDateObject < currentDate ||
    //     selectedDateObject < new Date(selectedDate.value)
    //   ) {
    //     // Do not allow selection of dates before the current date
    //     return;
    //   }

    //   selectedDateReturn.value = `${day} ${currentMonthYear}`;
    //   isCalendarVisibleReturn.value = false;

    //   // Function to format the date to YYYY-MM-DD
    //   function formatDate(date) {
    //     const year = date.getFullYear();
    //     const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 to month as it's zero-based
    //     const day = String(date.getDate()).padStart(2, "0");
    //     return `${year}-${month}-${day}`;
    //   }

    //   // Get the formatted date in YYYY-MM-DD format
    //   const formattedDate = formatDate(selectedDateObject);

    //   // Update selectedDate with the formatted date
    //   selectedDateReturnToSend.value = formattedDate;

    //   // Hide the calendar after date selection
    //   isCalendarVisible.value = false;
    //   isCalendarVisibleReturn.value = false;
    // }







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
// console.log("calendar.value: " , calendar.value);
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
      // You can return any value here, but for a computed property, it's common to return a derived value based on props or other reactive variables
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
      // daysOfMonth: generateDaysOfMonth(),
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
      day, dayOfYear,
       isCalendarVisible,
      isCalendarVisibleReturn,
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
  display: flex;
  width: auto;
  height: 100px;
  align-items: center;
}
.home-textinput3 input {
  position: absolute;
  width: 100%;
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
  right: -4rem;
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
  gap: 0.5rem;
}
.flex-display .home-textinput3.input {
  width: 50%;
}
#dayOfMonth {
  /* color:blue */
}
.red-text {
  color: #ABB2B9;
}
.red-background {
    background-color: red;
}
</style>
