/* Header Notify Dropdown */
const addDropFunc = function(dropdown) {
  const dropButton = dropdown.querySelector('.dropdown-btn');
  const dropList = dropdown.querySelector('.dropdown-list');

  dropdown.addEventListener('click', function(e) {
    e.stopPropagation();
    this.classList.toggle('is-active');
  });

  // Add event listener to document to hide select dropdown
  // when clicked outside of select menu
  document.addEventListener('click', function() {
    if (dropdown.classList.contains('is-active')) {
      dropdown.classList.remove('is-active');
    }
  });
}

const dropdowns = document.querySelectorAll('.dropdown');
if (dropdowns.length) {
  for (let i = 0; i < dropdowns.length; i++) {
    addDropFunc(dropdowns[i]);
  }
}


/* Create content charts */
const changeData = function(chart, labels, data) {
  chart.data.labels = labels;
  chart.data.datasets.forEach((dataset) => {
      dataset.data = data;
  });

  chart.update();
}

const trafficLine = document.getElementById('trafficLine');
const trafficChart = new Chart(trafficLine, {
    type: 'line',
    data: {
        labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
        datasets: [{
            data: [0, 750, 1250, 1000, 1500, 2000, 1500, 1750, 1250, 1750, 2250],
            backgroundColor: [
                'rgba(149, 148, 227, 0.2)',
            ],
            borderColor: [
                'rgba(149, 148, 227, 1)',
            ],
            borderWidth: 1,
            lineTension: 0,
            pointBackgroundColor: 'rgba(255, 255, 255, 1)',
            pointBorderColor: 'rgba(149, 148, 227, 1)',
            pointBorderWidth: 3,
            pointRadius: [0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
        }]
    },
    options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

const dataNav = document.querySelector('.traffic-heading-data');

dataNav.addEventListener('click', function(e) {
  if (e.target.tagName === 'BUTTON' && !e.target.classList.contains('is-active')) {
    const btn = e.target;
    const trafficData = {
      labels: [],
      data: []
    };
    this.querySelector('button.is-active').classList.remove('is-active');
    btn.classList.add('is-active');

    // Check which button is clicked
    if (btn.id === 'hourlyData') {
      // If hourly is clicked, supply hourly data
      trafficData.labels = ['6:00AM', '7:00AM', '8:00AM', '9:00AM', '10:00AM', '11:00AM', '12:00PM', '1:00PM', '2:00PM', '3:00PM', '4:00PM'];
      trafficData.data = [0, 500, 750, 850, 1000, 650, 675, 800, 700, 650, 500];
    } else if (btn.id === 'dailyData') {
      // If daily is clicked, supply daily data
      trafficData.labels = ['9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'];
      trafficData.data = [0, 1000, 1100, 1050, 1100, 1150, 1200, 1250, 1300, 1350, 1400];
    } else if (btn.id === 'weeklyData') {
      // If weekly is clicked, supply weekly data
      trafficData.labels = ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'];
      trafficData.data = [0, 750, 1250, 1000, 1500, 2000, 1500, 1750, 1250, 1750, 2250];
    } else if (btn.id === 'monthlyData') {
      // If monthly is clicked, supply monthly data
      trafficData.labels = ['June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];
      trafficData.data = [0, 1250, 1500, 2000, 1750, 1750, 2250, 2500, 3000, 2750, 3250];
    }

    changeData(trafficChart, trafficData.labels, trafficData.data);
  }
});

const dailyTraffic = document.getElementById('dailyTraffic');
const dailyChart = new Chart(dailyTraffic, {
    type: 'bar',
    data: {
        labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        datasets: [{
            data: [75, 100, 175, 125, 225, 200, 100],
            backgroundColor: [
                'rgba(149, 148, 227, 1)',
                'rgba(149, 148, 227, 1)',
                'rgba(149, 148, 227, 1)',
                'rgba(149, 148, 227, 1)',
                'rgba(149, 148, 227, 1)',
                'rgba(149, 148, 227, 1)',
                'rgba(149, 148, 227, 1)',
            ],
        }]
    },
    options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

const mobileUsers = document.getElementById('mobileUsers');
const mobileChart = new Chart(mobileUsers, {
    type: 'doughnut',
    data: {
        labels: ['Phones', 'Tablets', 'Desktop'],
        datasets: [{
            data: [15, 17, 68],
            backgroundColor: [
                'rgba(100, 175, 189, 1)',
                'rgba(82, 255, 122, 1)',
                'rgba(149, 148, 227, 1)',
            ],
        }]
    },
    options: {
        maintainAspectRatio: false,
        legend: {
          position: 'right'
        },
    }
});

/* Create Custom Select, pass select element into function */
/* Based on jQuery custom select snippet #1 found here:
   https://speckyboy.com/open-source-css-javascript-select-box-snippets/
*/
const createCustomSelect = function(selectEle) {
  const customOptions = selectEle.children;
  const selectWrapper = document.createElement('DIV');
  const selectedItem = document.createElement('DIV');
  const selectList = document.createElement('UL');

  // Add custom select classes to elements
  selectEle.classList.add('custom_select-hidden');
  selectWrapper.className = 'custom_select-wrap';
  selectedItem.className = 'custom_select-selected';
  selectList.className = 'custom_select-list';

  // Create DOM structure
  selectEle.parentNode.insertBefore(selectWrapper, selectEle);
  selectWrapper.appendChild(selectEle);
  selectWrapper.appendChild(selectedItem);
  selectWrapper.appendChild(selectList);

  // Add initial item as base text for shown selection
  selectedItem.textContent = customOptions[0].textContent;

  // Create custom list based off options in select
  for (let i = 0; i < customOptions.length; i++) {
    const selectItem = document.createElement('LI');
    selectItem.textContent = customOptions[i].textContent;
    selectItem.dataset.rel = customOptions[i].value;
    selectList.appendChild(selectItem);
  }

  const listItems = selectList.children;

  // Add event listener for toggling visibility of dropdown and active state
  selectedItem.addEventListener('click', function(e) {
    e.stopPropagation();
    const activeSelects = document.querySelectorAll('.custom_select-selected.active');
    for (let i = 0; i < activeSelects.length; i++) {
      if (this !== activeSelects[i]) {
        activeSelects[i].classList.remove('active');
        activeSelects[i].nextElementSibling.style.display = 'none';
        activeSelects[i].parentElement.classList.remove('open-up');
      }
    }

    this.classList.toggle('active');
    if (this.nextElementSibling.style.display === 'none' || this.nextElementSibling.offsetParent === null) {
      const heightFromBottom = document.body.clientHeight - (selectWrapper.offsetTop + selectWrapper.offsetHeight);
      this.nextElementSibling.style.display = 'block';

      // Check if dropdown height is larger then distance to bottom of document
      // If so open upwards
      if (this.nextElementSibling.offsetHeight > heightFromBottom) {
        selectWrapper.classList.add('open-up');
      }
    } else {
      this.nextElementSibling.style.display = 'none';
      selectWrapper.classList.remove('open-up');
    }
  });

  // Check to see if select has changed and adjust visible text
  selectEle.addEventListener('change', function() {
    selectedItem.textContent = listItems[this.selectedIndex].textContent;
  });

  // Add event listener to items in list to change
  // select's value based on selection. Hide dropdown
  for (let i = 0; i < listItems.length; i++) {
    listItems[i].addEventListener('click', function(e) {
      e.stopPropagation();
      const selectedValue = this.dataset.rel;
      selectedItem.textContent = this.textContent;
      selectedItem.classList.remove('active');
      selectEle.value = selectedValue;
      selectList.style.display = 'none';
    });
  }

  // Add event listener to document to hide select dropdown
  // when clicked outside of select menu
  document.addEventListener('click', function() {
    if (selectedItem.classList.contains('active')) {
      selectedItem.classList.remove('active');
      selectList.style.display = 'none';
    }
  });
}

const customSelect = document.querySelectorAll('.custom_select');
if (customSelect.length) {
  for (let i = 0; i < customSelect.length; i++) {
    createCustomSelect(customSelect[i]);
  }
}

/* Alerts */
const closeAlertBox = function(closeButton) {
  closeButton.addEventListener('click', function() {
    this.parentElement.style.display = 'none';
  });
}
const alertClose = document.querySelectorAll('.alert-close');
if (alertClose.length) {
  for (let i = 0; i < alertClose.length; i++) {
    closeAlertBox(alertClose[i]);
  }
}

/* Message User */
const messageForm = document.getElementById('messageForm');

messageForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const alertWrap = this.querySelector('.message_user-alert');
  const userInput = this.querySelector('.message_user-user');
  const messageInput = this.querySelector('.message_user-message');
  // Create alert elements
  const alertBox = document.createElement('p');
  const alertClose = document.createElement('button');
  alertBox.className = 'alert';
  alertClose.className = 'icon icon-x alert-close';
  alertClose.type = 'button';

  const userTest = userInput.value.replace(/^\s+/, '').replace(/\s+$/, '');
  const messageTest = messageInput.value.replace(/^\s+/, '').replace(/\s+$/, '');

  if (userTest === '') {
    // Display alert with error about empty user field
    alertBox.textContent = 'Please enter user to send message to.'
    alertBox.classList.add('alert-error');
  } else if (messageTest === '') {
    // Display alert with error about empty messagefield
    alertBox.textContent = 'Please enter message to send to the user.'
    alertBox.classList.add('alert-error');
  } else {
    // Display alert with notification that message has sent
    alertBox.textContent = 'Message sent successfully'
    alertBox.classList.add('alert-primary');
  }

  alertWrap.innerHTML = '';
  alertBox.appendChild(alertClose);
  alertWrap.appendChild(alertBox);

  closeAlertBox(alertClose);
});

/* User Autocomplete */
const userName = document.getElementById('userName');
let userData = null;

/* Pass array of user info */
const buildUserList = (arr) => {
  const userList = document.createElement('ul');
  userList.className = 'search_list'
  for (let i = 0; i < arr.length; i++) {
    const userItem = document.createElement('li');
    userItem.textContent = arr[i].name;

    userItem.addEventListener('click', function() {
      userName.value = this.textContent;
      userName.classList.remove('has-list');
      userList.remove();
    });

    userList.appendChild(userItem);
  }

  return userList;
}

const filterUser = function() {
  if (userData === null) {
    userData = {
      "users": [
        { "name": "Victoria Chambers" },
        { "name": "Dale Byrd" },
        { "name": "Dawn Wood" },
        { "name": "Dan Oliver" }
      ]
    };
  }

  const foundUsers = [];
  const searchVal = this.value.toLowerCase();
  const searchList = messageForm.querySelector('.search_list');

  if (searchVal !== '') {
    for (let i = 0; i < userData.users.length; i++) {
      if (userData.users[i].name.toLowerCase().startsWith(searchVal)) {
        foundUsers.push(userData.users[i]);
      }
    }

    if (foundUsers.length) {
      const builtList = buildUserList(foundUsers);
      if (searchList === null) {
        this.parentElement.insertBefore(builtList, this);
        this.classList.add('has-list');
      } else {
        this.parentElement.replaceChild(builtList, searchList);
      }
    }
  } else {
    if (searchList !== null) {
      userName.classList.remove('has-list');
      searchList.remove();
    }
  }
}

userName.addEventListener('keyup', filterUser);
userName.addEventListener('focus', filterUser);

// Add event listener to document to hide filtered users
// when clicked outside of input or list
document.addEventListener('click', function(e) {
  // Only run if target isn't user input and user list isn't shown
  if (e.target.id !== 'userName' && userName.classList.contains('has-list')) {
    userName.classList.remove('has-list');
    userName.previousElementSibling.remove();
  }
});

/* Load, save, reset profile settings */
const profileSettings = function() {
  const emailNotify = document.getElementById('email_notify');
  const publicProf = document.getElementById('public_prof');
  const timezone = document.getElementById('timezone');
  const settingsForm = document.getElementById('settingsForm');
  const resetButton = document.getElementById('resetSettings');

  // Check for saved settings
  const checkSettings = () => {
    const settings = localStorage.getItem('YourAppSettings');

    if (settings !== null) {
      const parsedSettings = JSON.parse(settings);
      const timezoneOptions = timezone.options;

      emailNotify.checked = parsedSettings.emailNotify;
      publicProf.checked = parsedSettings.publicProf;

      for (let i = 0; i < timezoneOptions.length; i++) {
        if (timezoneOptions[i].value === parsedSettings.timezone) {
          timezone.selectedIndex = i;
          break;
        }
      }
      // Get change event to fire for select
      // Assistance found here: https://stackoverflow.com/questions/2856513/how-can-i-trigger-an-onchange-event-manually
      if ('createEvent' in document) {
        var evt = document.createEvent('HTMLEvents');
        evt.initEvent('change', false, true);
        timezone.dispatchEvent(evt);
      } else
        timezone.fireEvent('onchange');
    }
  }

  const saveSettings = (e) => {
    e.preventDefault();
    const settings = {};
    settings.emailNotify = emailNotify.checked;
    settings.publicProf = publicProf.checked;
    settings.timezone = timezone.value;

    localStorage.setItem('YourAppSettings', JSON.stringify(settings));
  }

  const resetSettings = () => {
    emailNotify.checked = false;
    publicProf.checked = false;
    timezone.value = 'hide';

    localStorage.removeItem('YourAppSettings');
  }


  checkSettings();

  settingsForm.addEventListener('submit', saveSettings);
  resetButton.addEventListener('click', resetSettings);
}

profileSettings();
