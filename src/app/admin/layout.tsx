import { withRoleGuard } from "@/lib/roleGuard";

const AdminPage = () => {
  return <div>Admin Content</div>;
};

// Wrap the AdminPage with the role guard, requiring 'admin' role
export default withRoleGuard(AdminPage, "admin");
