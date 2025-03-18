import { useQuery } from "@apollo/client";
import { GET_USER } from "./queries";

export const useUser = () => {
  const userId = localStorage.getItem("userId");

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { userId },
    skip: !userId,
  });

  const firstName = data?.user?.profile?.first_name || "";
  const lastName = data?.user?.profile?.last_name || "";
  const email = data?.user?.email || "user@example.com";
  const userName = firstName && lastName ? `${firstName} ${lastName}` : email;

  return { userName, loading, error, userId };
};
