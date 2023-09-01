let intervalId;
for (let i = 1; i <= 1; i++) {
  initializeMachine(i);
}

function initializeMachine(machineNumber) {
  const container = document.getElementById('machine-container');

  const machine = document.createElement('div');
  machine.className = 'machine';

  const patientName = document.createElement('input');
  patientName.type = 'text';
  patientName.placeholder = 'Patient Name';
  patientName.id = `patient-${machineNumber}`;
  patientName.className = 'patient-name';

  const machineLabel = document.createElement('div');
  machineLabel.className = 'machine-label';
  machineLabel.innerHTML = `Device ${machineNumber}`;

  const timer = document.createElement('div');
  timer.className = 'timer';
  timer.id = `timer-${machineNumber}`;
  timer.innerHTML = 'Remaining time: 00:00';

  const endTimeDisplay = document.createElement('div');
  endTimeDisplay.className = 'end-time';
  endTimeDisplay.id = `end-time-${machineNumber}`;
  endTimeDisplay.innerHTML = 'End Time: 00:00';

  const inputMinutes = document.createElement('input');
  inputMinutes.type = 'number';
  inputMinutes.placeholder = 'Minutes';
  inputMinutes.id = `input-${machineNumber}`;

  const startButton = document.createElement('button');
  startButton.innerHTML = 'Start';
  startButton.addEventListener('click', () => {
    clearInterval(intervalId);
    const input = document.getElementById(`input-${machineNumber}`).value;
    let timeLeft = input * 60;

    intervalId = setInterval(() => {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      document.getElementById(`timer-${machineNumber}`).innerHTML = `Remaining time: ${minutes}:${seconds.toString().padStart(2, '0')}`;

      const currentTime = new Date();
      const estimatedCompletion = new Date(currentTime.getTime() + timeLeft * 1000);
      const hours = estimatedCompletion.getHours() % 12 || 12;
      const minutesET = estimatedCompletion.getMinutes();
      endTimeDisplay.innerHTML = `End Time: ${hours}:${minutesET.toString().padStart(2, '0')} ${estimatedCompletion.getHours() >= 12 ? 'PM' : 'AM'}`;

      if (timeLeft === 0) {
        clearInterval(intervalId);
      }
      timeLeft -= 1;
    }, 1000);
  });

  const resetButton = document.createElement('button');
  resetButton.innerHTML = 'Reset';
  resetButton.addEventListener('click', () => {
    clearInterval(intervalId);
    document.getElementById(`timer-${machineNumber}`).innerHTML = 'Remaining time: 00:00';
    document.getElementById(`input-${machineNumber}`).value = '';
    document.getElementById(`end-time-${machineNumber}`).innerHTML = 'End Time: 00:00';
    patientName.value = '';
  });

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'button-container';
  buttonContainer.appendChild(inputMinutes);
  buttonContainer.appendChild(startButton);
  buttonContainer.appendChild(resetButton);

  machine.appendChild(patientName);
  machine.appendChild(machineLabel);
  machine.appendChild(timer);
  machine.appendChild(endTimeDisplay);
  machine.appendChild(buttonContainer);

  container.appendChild(machine);
}
