(function() {
  let defaults = {
    enable: true,
    software: 'jira',
    countdownSeconds: 60,
    timeout: {
      text: 'Time is up!',
      imageUrl: '',
    },
    safe: {
      color: '#87D37C',
      text: '😌',
    },
    warn: {
      color: '#ffbe76',
      text: '🤔',
    },
    danger: {
      color: '#F22613',
      text: '🤨',
    },
  };

  window.SETTINGS = {
    defaults,
  };
})();
