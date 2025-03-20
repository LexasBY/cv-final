import { useQuery } from "@apollo/client";
import { GET_USER } from "./queries";
import { User } from "../../../shared/api/graphql/generated";

interface GetUserData {
  user: User;
}

export const useUser = () => {
  const userId = localStorage.getItem("userId");

  const { data, loading, error } = useQuery<GetUserData>(GET_USER, {
    variables: { userId },
    skip: !userId,
  });

  const user = data?.user;
  const firstName = user?.profile?.first_name || "";
  const lastName = user?.profile?.last_name || "";
  const email = user?.email || "user@example.com";
  const userName = firstName && lastName ? `${firstName} ${lastName}` : email;

  return { userName, loading, error, userId };
};
