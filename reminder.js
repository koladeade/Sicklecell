const reminderList = document.getElementById('reminder-list');
const reminderSound = document.getElementById('reminder-sound');
const soundStatus = document.getElementById('sound-status');
const reminders = [];

if ('Notification' in window && Notification.permission !== 'granted') {
  Notification.requestPermission();
}

function setReminder() {
  const timeInput = document.getElementById('reminder-time').value;
  const message = document.getElementById('reminder-msg').value;
  const repeat = document.getElementById('repeat-daily').checked;

  if (!timeInput || !message) {
    alert("Please fill out all reminder fields.");
    return;
  }

  const reminderTime = new Date(timeInput);
  const now = new Date();

  if (reminderTime <= now) {
    alert("Please set a future time.");
    return;
  }

  const reminder = { time: reminderTime, message, repeat };
  reminders.push(reminder);
  displayReminder(reminder, reminders.length - 1);
}

function displayReminder(reminder, index) {
  const div = document.createElement('div');
  div.className = 'reminder-item';
  div.dataset.index = index;

  const text = document.createElement('span');
  text.innerText = `${reminder.time.toLocaleString()} - ${reminder.message}${reminder.repeat ? ' (Daily)' : ''}`;

  const delBtn = document.createElement('button');
  delBtn.innerText = 'Delete';
  delBtn.className = 'delete-btn';
  delBtn.onclick = () => {
    reminders.splice(index, 1);
    div.remove();
  };

  div.appendChild(text);
  div.appendChild(delBtn);
  reminderList.appendChild(div);
}

function clearReminders() {
  reminders.length = 0;
  reminderList.innerHTML = '';
}

function stopReminderSound() {
  reminderSound.pause();
  reminderSound.currentTime = 0;
  reminderSound.loop = false;
  updateSoundStatus(false);
}

function updateSoundStatus(isPlaying) {
  soundStatus.style.display = 'block';
  soundStatus.innerText = isPlaying
    ? '🔊 Reminder Sound Playing...'
    : '✅ Reminder Sound Stopped';
  if (!isPlaying) {
    setTimeout(() => (soundStatus.style.display = 'none'), 2000);
  }
}

setInterval(() => {
  const now = new Date();

  reminders.forEach((reminder, index) => {
    const timeDiff = reminder.time - now;

    if (timeDiff <= 60000 && timeDiff >= 0) {
      setTimeout(() => {
        triggerNotification(reminder.message);
        reminderSound.loop = true;
        reminderSound.play();
        updateSoundStatus(true);

        alert(`🔔 Reminder: ${reminder.message}`);

        setTimeout(stopReminderSound, 30000);

        if (reminder.repeat) {
          reminder.time.setDate(reminder.time.getDate() + 1);
          displayReminder(reminder, index);
        } else {
          reminders.splice(index, 1);
          reminderList.children[index]?.remove();
        }
      }, timeDiff);
    }
  });
}, 15000);

function triggerNotification(message) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification("🔔 Reminder", {
      body: message,
      icon: 'https://cdn-icons-png.flaticon.com/512/1828/1828884.png',
    });
  }

  reminderSound.play();
  updateSoundStatus(true);
  setTimeout(stopReminderSound, 30000);
}
