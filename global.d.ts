interface Window {
  umami: {
    track: (event: string, data?: object) => void;
  };
}
