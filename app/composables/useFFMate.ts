import type FFMate from "~/sdk/ffmate/lib/ffmate";

let ffmate = ref<FFMate | null>(null);
export const useFFMate = () => {
  if (ffmate.value === null) {
    const { $ffmate } = useNuxtApp();
    ffmate.value = $ffmate;
  }
  return ffmate.value!;
};
