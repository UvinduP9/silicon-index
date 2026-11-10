import type { Metadata } from "next";
import { pageTitle } from "@/lib/site";
import { Showcase } from "./showcase";

export const metadata: Metadata = {
  title: pageTitle("Components"),
  description:
    "Every shared component in both themes, with placeholder values.",
  robots: { index: false, follow: false },
};

export default function DevUiPage() {
  return <Showcase />;
}
