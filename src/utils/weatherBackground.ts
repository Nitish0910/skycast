type WeatherCondition =
  | "Clear"
  | "Clouds"
  | "Rain"
  | "Drizzle"
  | "Thunderstorm"
  | "Snow"
  | "Mist"
  | "Fog"
  | "Haze"
  | "Dust"
  | "Sand"
  | "Ash"
  | "Wind"
  | "Tornado"
  | "OverCastClouds"
  | string;

export const getWeatherBackground = (weatherType: string): string => {
  const backgrounds: { [key: string]: string } = {
    Clear: "/ClearSunny.mp4",
    Clouds: "/MostlyCloudy.mp4",
    Rain: "/Rain.mp4",
    Snow: "/Snow.mp4",
    Thunderstorm: "/ThunderStrom.mp4",
    Drizzle: "/images/drizzle.jpg",
    Mist: "/Mist.mp4",
    Haze: "/Haze.jpg",
    Fog: "/Fog.mp4",
    Dust: "/Dust.mp4",
    StrongWind: "/StrongWind.mp4",
    Wind: "/wind.mp4"
  };

  return backgrounds[weatherType] || "/clear.jpg";
};

export const getWeatherCardHeader = (condition: WeatherCondition): string => {
  switch (condition) {
    case "Clear":
      return "bg-gradient-to-r from-sky-500 to-blue-500";
    case "Clouds":
      return "bg-gradient-to-r from-slate-500 to-slate-400";
    case "Rain":
    case "Drizzle":
      return "bg-gradient-to-r from-slate-600 to-blue-600";
    case "Thunderstorm":
      return "bg-gradient-to-r from-slate-700 to-purple-700";
    case "Snow":
      return "bg-gradient-to-r from-blue-300 to-slate-300";
    case "Mist":
    case "Fog":
    case "Haze":
      return "bg-gradient-to-r from-slate-500 to-slate-400";
    default:
      return "bg-gradient-to-r from-sky-500 to-sky-700";
  }
};

export const getTextColor = (condition: WeatherCondition): string => {
  switch (condition) {
    case "Snow":
      return "text-slate-800";
    default:
      return "text-white";
  }
};
