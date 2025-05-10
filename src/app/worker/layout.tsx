import { withRoleGuard } from "@/lib/roleGuard";

function WorkerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1>Worker Dashboard</h1>
      <div>{children}</div>
    </div>
  );
}

export default withRoleGuard(WorkerLayout, "worker");
