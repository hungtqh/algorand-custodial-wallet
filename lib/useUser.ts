import { useEffect } from "react";
import useSWR from "swr";
import Router from "next/router";
import type { User } from "types/user";

export default function useUser({
  redirectTo = "",
  redirectIfFound = false,
} = {}) {
  const { data: user, mutate: mutateUser } = useSWR<User>("/api/user");

  useEffect(() => {
    if (!redirectTo || !user) return;

    if (
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectTo, redirectIfFound]);

  return { user, mutateUser };
}
