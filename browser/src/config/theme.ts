import { ThemeConfig } from "antd/es/config-provider/context";
import { MODE } from "enums/index";

const dark: ThemeConfig = {
  components: {},
  token: {},
};
const light: ThemeConfig = {
  components: {},
  token: {},
};

const theme = {
  [MODE.DARK]: dark,
  [MODE.LIGHT]: light,
};

export const getTheme = (mode: MODE) => theme[mode];
