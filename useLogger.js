const useLogger = () => {
  return (message, data) => {
    const log = {
      message,
      data,
      timestamp: new Date().toISOString(),
    };
    // Save or send log to backend/log service if needed
    localStorage.setItem(`log-${log.timestamp}`, JSON.stringify(log));
  };
};

export default useLogger;
