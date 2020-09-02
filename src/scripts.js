let randomIndex = Math.floor(Math.random() * (userData.length - 1) + 1);

const usersRepository = new UsersRepository(userData);
const currentUser = new User(userData[randomIndex]);
const hydration = new Hydration(hydrationData);
const sleep = new Sleep(sleepData);
const activity = new Activity(activityData, userData);
const randomID = randomIndex + 1;

const waterChart = document.getElementById('water-chart').getContext('2d');
const weeklySleepChart = document.getElementById('weekly-hrs-slept-chart').getContext('2d');
const weeklySleepQualityChart = document.getElementById('weekly-sleep-quality-chart').getContext('2d');
// const weeklySleepQualityChart = document.getElementById('weekly-sleep-quality-chart').getContext('2d');
// const compareActivityChart = document.getElementById('activity-compare-chart').getContext('2d');

const userCard = document.querySelector('.user-card');
const userGreeting = document.querySelector('.user-greeting');
const userName = document.querySelector('.user-name');
const userAddress = document.querySelector('.user-address');
const userEmail = document.querySelector('.user-email');
const userStrideLength = document.querySelector('.user-strideLength');
const userDailyStepGoal = document.querySelector('.user-dailyStepGoal');
const allDailyStepGoal = document.querySelector('.all-dailyStepGoal');
const userFriends = document.querySelector('.user-friends');
const fluidOzToday = document.querySelector('.fluid-oz-today');
const dailyHrsSlept = document.querySelector('.hours-slept-day');
const dailySleepQuality = document.querySelector('.sleep-quality-day');
const weeklyHrsSlept = document.querySelector('.hours-slept-week');
const weeklySleepQuality = document.querySelector('.sleep-quality-week')
const allTimeAvgSleepHrs = document.querySelector('.avg-hours-sleep');
const allTimeAvgSleepQuality = document.querySelector('.avg-sleep-quality');

const numStepsDay = document.querySelector('.steps-today');
const activeMinDay = document.querySelector('.active-minutes');
const distanceWalked = document.querySelector('.distance-walked');
const compareActivity = document.querySelector('.activity-compare');
const compareSteps = document.querySelector('.compare-steps');
const compareStairs = document.querySelector('.compare-stairs');
const compareMinutes = document.querySelector('.compare-minutes-active');
const weeklySteps = document.querySelector('.weekly-steps');
const weeklyStairs = document.querySelector('.weekly-stairs');
const weeklyMinutes = document.querySelector('.weekly-minutes-active');


const userProfile = usersRepository.returnUserData(randomID);


window.addEventListener('load', function() {
  displayUserInfo();
  displayUserGreeting();
  displayWaterToday(currentUser.user.id, mostRecentDay(hydrationData));
  displayDailyHrsSlept(currentUser.user.id, mostRecentDay(sleepData));
  displayDailySleepQuality(currentUser.user.id, mostRecentDay(sleepData));
  displayAvgSleepQuality(currentUser.user.id);
  displayAvgHrsSlept(currentUser.user.id);
  displayDailySteps(currentUser.user.id, mostRecentDay(activityData));
  displayDailyActiveMinues(currentUser.user.id, mostRecentDay(activityData));
  displayDailyDistanceWalked(currentUser.user.id, mostRecentDay(activityData));
  displayWeeklySteps(currentUser.user.id, mostRecentDay(activityData));
  displayWeeklyStairs(currentUser.user.id, mostRecentDay(activityData));
  displayWeeklyMinutes(currentUser.user.id, mostRecentDay(activityData));
  displayStepsComparison(currentUser.user.id, mostRecentDay(activityData));
  displayStairsComparison(currentUser.user.id, mostRecentDay(activityData));
  displayMinutesComparison(currentUser.user.id, mostRecentDay(activityData));
});

//refactor
function displayUserInfo() { //need to call this onload
  userStrideLength.innerText = `Your Stride Length: ${userProfile.strideLength}`;
  userDailyStepGoal.innerText = `Your Daily Step Goal: ${userProfile.dailyStepGoal}`;
  allDailyStepGoal.innerText = `All Users Avg Step Goal: ${usersRepository.getAverageStepGoal()}`;
};

function mostRecentDay(dataSet) {
  let obj = dataSet[dataSet.length - 1];
  return obj.date;
};

// function mostRecentWeek(dataSet) {
//
// }

function displayUserGreeting() {
  userGreeting.innerText = `Hi   ${currentUser.getFirstName()}!`;
};

function displayWaterToday(id, date) {
  fluidOzToday.innerText = hydration.fluidOuncesOnDay(id, date)
};

function displayDailyHrsSlept(id, date) {
  dailyHrsSlept.innerText =  sleep.dailyHoursSlept(id, date);
}

function displayDailySleepQuality(id, date) {
  dailySleepQuality.innerText = sleep.dailySleepQuality(id, date);
}

function displayAvgSleepQuality(id) {
  allTimeAvgSleepQuality.innerText = sleep.userAvgSleepQuality(id);
}

function displayAvgHrsSlept(id) {
  allTimeAvgSleepHrs.innerText = sleep.averageSleepDay(id);
}

function displayDailySteps(id, date) {
  numStepsDay.innerText = activity.getStepsOnDay(id, date);
}

function displayDailyActiveMinues(id, date) {
  activeMinDay.innerText = activity.getUserMinutes(id, date);
}

function displayDailyDistanceWalked(id, date) {
  distanceWalked.innerText = activity.getUserMilesWalked(id, date);
}

function displayWeeklySteps(id, date) {
  weeklySteps.innerText = activity.getUserWeeklySteps(id, date);
}

function displayWeeklyStairs(id, date) {
  weeklyStairs.innerText = activity.getUserWeeklyStairs(id, date);
}

function displayWeeklyMinutes(id, date) {
  weeklyMinutes.innerText = activity.getUserWeeklyMinutes(id, date);
}

function displayStepsComparison(id, date) {
  compareSteps.innerText = `The average user's steps today: ${activity.avgStepsByDate(date)}, Your steps today: ${activity.getStepsOnDay(id, date)}.`;
}

function displayStairsComparison(id, date) {
  compareStairs.innerText = `The average user's flights of stairs climbed today: ${activity.avgStairsByDate(date)}, Your stairs climbed today: ${activity.getStairsOnDay(id, date)}.`;
}

function displayMinutesComparison(id, date) {
  compareMinutes.innerText = `The average user's minutes active today: ${activity.avgMinutesByDate(date)}, Your minutes active today: ${activity.getUserMinutes(id, date)}.`;
}


let waterGraph = new Chart(waterChart, {
  type: 'bar',
  data: {
    labels: hydration.getMostRecentWeek(),
    datasets: [ {
      data: hydration.fluidOuncesWeek(currentUser.user.id),
      backgroundColor: [
        'rgb(168, 255, 229)',
        'rgb(255, 216, 171)',
        'rgb(150, 243, 255)',
        'rgb(255, 172, 171)',
        'rgb(250, 186, 255)',
        'rgb(211, 255, 176)',
        'rgb(255, 252, 172)'
      ]
    }],
  },
  options: {
    legend: {
      display: false
    }
  }
})

let weeklyHrsSleptGraph = new Chart(weeklySleepChart, {
  type: 'bar',
  data: {
    labels: sleep.getMostRecentWeek(),
    datasets: [ {
      data: sleep.dailySleepPerWeek(currentUser.user.id, mostRecentDay(sleepData)),
      backgroundColor: [
        'rgb(168, 255, 229)',
        'rgb(255, 216, 171)',
        'rgb(150, 243, 255)',
        'rgb(255, 172, 171)',
        'rgb(250, 186, 255)',
        'rgb(211, 255, 176)',
        'rgb(255, 252, 172)'
      ]
    }],
  },
  options: {
    legend: {
      display: false
    }
  }
})

let weeklySleepQualityGraph = new Chart(weeklySleepQualityChart, {
  type: 'bar',
  data: {
    labels: sleep.getMostRecentWeek(),
    datasets: [ {
      data: sleep.sleepQualityPerWeek(currentUser.user.id, mostRecentDay(sleepData)),
      backgroundColor: [
        'rgb(168, 255, 229)',
        'rgb(255, 216, 171)',
        'rgb(150, 243, 255)',
        'rgb(255, 172, 171)',
        'rgb(250, 186, 255)',
        'rgb(211, 255, 176)',
        'rgb(255, 252, 172)'
      ]
    }],
  },
  options: {
    legend: {
      display: false
    }
  }
})
// data1 = [
//   24,
//   activity.getUserMinutes(currentUser.user.id, mostRecentDay(activityData)),
//   activity.getStairsOnDay(currentUser.user.id, mostRecentDay(activityData))
// ]
// data2 = [
//   33,
//   activity.avgMinutesByDate(mostRecentDay(activityData)),
//   activity.avgStairsByDate(mostRecentDay(activityData))
// ]
// let compareActivityGraph = new Chart(compareActivityChart, {
//   type: 'radar',
//   data: {
//     labels: ['Steps', 'Minutes Active', 'Flights of Stairs'],
//     datasets: [ {
//       label: 'Your Activity',
//       fill: true,
//       backgroundColor:'rgb(15, 72, 181)',
//       borderColor:'rgb(200, 109, 1)',
//       pointBorderColor:'rgb(200, 109, 1)',
//       pointBackgroundColor:'rgb(200, 109, 1)',
//       data: data1
//     },
//     {
//       label: 'All Users',
//       fill: true,
//       backgroundColor:'rgb(83, 209, 155)',
//       borderColor: 'rgb(255, 102, 102)',
//       pointBorderColor: 'rgb(255, 102, 102)',
//       pointBackgroundColor: 'rgb(255, 102, 102)',
//       data: data2
//     }],
//   },
//   options: {
//     title: {
//       text: 'How does your activity compare?',
//       display: true //prob want to be true?
//     }
//   }
// })



//graph for steps compared to all users for the latest day
//graph for minutes active compared to all users for the latest day
//graph for flights of stairs climbed compared to all users for the latest day
