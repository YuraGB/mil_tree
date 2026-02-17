import { ReportsComponent } from "@/modules/Reports";
import { Suspense } from "react";

const ReportsPage = async () => {
  return (
    <Suspense fallback={null}>
      <ReportsComponent />
    </Suspense>
  );
};

export default ReportsPage;
