import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Mock Inertia
vi.mock("@inertiajs/react", () => ({
  Link: ({ children, href }: any) => `<a href="${href}">${children}</a>`,
  Head: ({ title }: any) => `<title>${title}</title>`,
  useForm: () => ({
    data: {},
    setData: vi.fn(),
    post: vi.fn(),
    processing: false,
    errors: {},
  }),
  router: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

afterEach(() => {
  cleanup();
});
