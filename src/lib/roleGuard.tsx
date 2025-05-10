import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";

type WithChildren<T = unknown> = T & { children?: ReactNode };

export function withRoleGuard<T extends object>(
  Component: React.ComponentType<WithChildren<T>>,
  requiredRole: string
) {
  const WrappedComponent = (props: WithChildren<T>) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
      return <div>Loading...</div>;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!session || session.user?.role !== requiredRole) {
      router.push("/login");
      return null;
    }

    return <Component {...props} />;
  };

  WrappedComponent.displayName = `withRoleGuard(${
    Component.displayName || Component.name || "Component"
  })`;

  return WrappedComponent;
}
