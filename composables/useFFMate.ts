import type SevWtf from "~/sdk/ffmate/lib/ffmate";

let ffmate = ref<SevWtf | null>(null);
export const useFFMate = () => {
  if (ffmate.value === null) {
    const { $ffmate } = useNuxtApp();
    ffmate.value = $ffmate;
  }
  return ffmate.value!;
};
