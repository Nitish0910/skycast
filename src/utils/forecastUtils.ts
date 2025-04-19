import type { ForecastData, ForecastItem, DailyForecast } from "./types";

// Group forecast items by day and extract the min/max temperatures
export const processForecastData = (data: ForecastData): DailyForecast[] => {
  const dailyData: Record<
    string,
    { items: ForecastItem[]; date: string; day: string }
  > = {};

  // Group forecast items by day
  data.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dateStr = date.toISOString().split("T")[0];

    if (!dailyData[dateStr]) {
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      dailyData[dateStr] = {
        items: [],
        date: formattedDate,
        day: dayName,
      };
    }

    dailyData[dateStr].items.push(item);
  });

  // Process each day's data
  return Object.values(dailyData)
    .map((day) => {
      // Find max and min temperatures for the day
      const temps = day.items.map((item) => item.main.temp);
      const temp_max = Math.max(...temps);
      const temp_min = Math.min(...temps);

      // Use the middle of the day (noon) for the icon if available, otherwise use the first item
      const noonItem =
        day.items.find((item) => item.dt_txt.includes("12:00:00")) ||
        day.items[0];

      return {
        date: day.date,
        day: day.day,
        temp_max,
        temp_min,
        icon: noonItem.weather[0].icon,
        main: noonItem.weather[0].main,
        description: noonItem.weather[0].description,
      };
    })
    .slice(0, 5); // Limit to 5 days
};
