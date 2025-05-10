import { withRoleGuard } from "@/lib/roleGuard";

const SupervisorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h1>Supervisor Dashboard</h1>
      <div>{children}</div>
    </div>
  );
};

export default withRoleGuard(SupervisorLayout, "supervisor");
