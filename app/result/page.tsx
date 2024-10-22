import { ResultPage } from "@/components/result-page";
import { Suspense } from "react";

export default function Result() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultPage />
    </Suspense>
  );
}

