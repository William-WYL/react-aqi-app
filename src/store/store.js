import { create } from "zustand"; // Using zustand for store management

const useStore = create((set, get) => ({
  aqi: null,
  loading: false,
  error: null,
  city: null,
  time: null,
  alertMessage: '',
  token: 'b493c22c8c80ddcadd15082c7b083a37ca96c578', // the token registered for fetching data

  fetchAQI: async (city) => {
    set({ loading: true, alertMessage: '', error: null, city: city }); // Start the request
    const { token } = get();

    try {
      // From https://aqicn.org/api/
      const response = await fetch(`https://api.waqi.info/feed/${city}/?token=${token}`);
      const data = await response.json();
      console.log(data);

      if (data.status === "ok") {
        set({ aqi: data.data.aqi });
        set({ time: data.data.time.s });
      } else {
        throw new Error("Invalid response from API");
      }
    } catch (error) {
      set({ error: error.message, alertMessage: '⚠️ City data not available' });
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  setAlertMessage: (message) => {
    set({ alertMessage: message });
  }
}));

export default useStore;