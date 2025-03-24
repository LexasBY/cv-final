import { useQuery } from "@apollo/client";
import { User } from "../../../shared/api/graphql/generated";
import { GET_USERDATA } from "../../../shared/api/user/user.api";

interface GetUserData {
  user: User;
}

export const useUser = () => {
  const userId = localStorage.getItem("userId");

  const { data, loading, error, refetch } = useQuery<GetUserData>(
    GET_USERDATA,
    {
      variables: { userId },
      skip: !userId,
    }
  );

  const user = data?.user;
  const firstName = user?.profile?.first_name || "";
  const lastName = user?.profile?.last_name || "";
  const email = user?.email || "user@example.com";
  const userName = firstName && lastName ? `${firstName} ${lastName}` : email;
  const avatar = user?.profile?.avatar || "";

  return { userName, avatar, loading, error, userId, refetch };
};
