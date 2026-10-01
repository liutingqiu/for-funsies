(() => {
  const tasks = [
    {
      name: 'Sorting the edges of a thought',
      steps: ['Locating the loose edges', 'Arranging the almost-relevant pieces', 'Checking the corners', 'Marking this thought as sorted']
    },
    {
      name: 'Polishing a small maybe',
      steps: ['Finding a suitable maybe', 'Removing unnecessary certainty', 'Applying a soft finish', 'Returning the maybe to the queue']
    },
    {
      name: 'Counting the quiet parts',
      steps: ['Listening for the quiet parts', 'Separating hush from pause', 'Counting what can be counted', 'Filing the result under quiet']
    },
    {
      name: 'Folding a spare minute',
      steps: ['Measuring the available minute', 'Making a careful first fold', 'Flattening the crease', 'Storing the minute for later']
    }
  ];

  const taskElement = document.getElementById('current-task');
  const statusElement = document.getElementById('status');
  const progressElement = document.getElementById('progress');
  const progressTrack = document.querySelector('.progress-track');
  const captionElement = document.getElementById('progress-caption');
  const completedElement = document.getElementById('completed');
  const queuedElement = document.getElementById('queued');
  const logElement = document.getElementById('log');

  let taskIndex = 0;
  let completed = 0;
  let stepIndex = -1;
  let task;

  function timeStamp() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

  function addLog(message) {
    const entry = document.createElement('li');
    const time = document.createElement('time');
    const text = document.createElement('span');
    time.textContent = timeStamp();
    text.textContent = message;
    entry.append(time, text);
    logElement.append(entry);
    while (logElement.children.length > 6) {
      logElement.firstElementChild.remove();
    }
  }

  function beginTask() {
    task = tasks[taskIndex % tasks.length];
    taskIndex += 1;
    stepIndex = -1;
    taskElement.textContent = task.name;
    statusElement.textContent = 'WORKING';
    statusElement.dataset.state = 'working';
    progressElement.style.width = '0%';
    progressTrack.setAttribute('aria-valuenow', '0');
    captionElement.textContent = 'A simulated task is moving through its stages.';
    queuedElement.textContent = String(tasks.length - 1);
    addLog('Opened a new invented task: ' + task.name);
    window.setTimeout(nextStep, 650);
  }

  function nextStep() {
    stepIndex += 1;
    const percentage = Math.round((stepIndex / task.steps.length) * 100);
    progressElement.style.width = percentage + '%';
    progressTrack.setAttribute('aria-valuenow', String(percentage));

    if (stepIndex < task.steps.length) {
      captionElement.textContent = task.steps[stepIndex] + '…';
      addLog(task.steps[stepIndex] + '…');
      window.setTimeout(nextStep, 950 + Math.random() * 650);
      return;
    }

    progressElement.style.width = '100%';
    progressTrack.setAttribute('aria-valuenow', '100');
    statusElement.textContent = 'DONE';
    statusElement.dataset.state = 'done';
    captionElement.textContent = 'The invented task is complete. Another is ready to begin.';
    addLog('Completed: ' + task.name);
    completed += 1;
    completedElement.textContent = String(completed);
    window.setTimeout(beginTask, 1500);
  }

  beginTask();
})();
