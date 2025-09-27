import { describe, expect, it } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import Pagination from "../../../app/components/Pagination.vue";

describe("Pagination", () => {
  it("patgination to have 5 pages for 25 total items", async () => {
    const component = await mountSuspended(Pagination, {
      props: { page: 0, perPage: 5, total: 25 },
    });
    expect(component.html()).to.contain('<span class="font-medium">1</span>');
    expect(component.html()).to.contain('<span class="font-medium">5</span>');
    expect(component.html()).to.contain('<span class="font-medium">25</span>');
  });
});
