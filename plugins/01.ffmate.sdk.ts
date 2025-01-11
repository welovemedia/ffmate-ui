import type { AxiosError } from "axios";
import ffmate from "~/sdk/ffmate/lib/ffmate";

declare module "#app" {
  interface NuxtApp {
    $ffmate: ffmate;
  }
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      ffmate: new ffmate({}),
    },
  };
});
