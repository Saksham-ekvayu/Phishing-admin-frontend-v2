import LightThemeIcon from "@/assets/svg/light-theme.svg";
import DarkThemeIcon from "@/assets/svg/dark-theme.svg";
import CannaThemeIcon from "@/assets/svg/canna-theme.svg";

import {
  cannaChatThemeOptions,
  darkThemeOptions,
  lightThemeOptions,
} from "@/components";

export const DEFAULT_THEME_LIST = [
  {
    id: "canna",
    label: "Default",
    value: "default",
    icon: CannaThemeIcon,
    themeOption: cannaChatThemeOptions,
  },
  {
    id: "lightheme",
    label: "Light",
    value: "light",
    icon: LightThemeIcon,
    themeOption: lightThemeOptions,
  },
  {
    id: "darktheme",
    label: "Dark",
    value: "dark",
    icon: DarkThemeIcon,
    themeOption: darkThemeOptions,
  },
];
