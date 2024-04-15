import { useQuery } from "@tanstack/react-query";

import ChatApi from "@/api/chat-api";
import ProfileApi from "@/api/profile-api";

type TempType = {
  userId: number;
  nickName: string;
  blocked: boolean;
  profileImg: string;
};

export const useGetChatMembers = (roomId: string) => {
  // const { data: members } = useQuery({
  //   queryKey: ["chat-members", roomId],
  //   queryFn: () => ChatApi.getChatMembers(roomId),
  // });

  // const finalMembers: tempType[] = [];

  // if (members) {
  //   for (let i = 0; i < members.length; i++) {
  //     const { data: userProfile } = useQuery({
  //       queryKey: ["chat-user-profile"],
  //       queryFn: () => ProfileApi.getProfile(Number(members[i])),
  //     });
  //     if (userProfile) {
  //       finalMembers.push({
  //         userId: Number(members[i]),
  //         nickName: userProfile.nickName,
  //         blocked: userProfile.blocked,
  //         profileImg: userProfile.profileImage,
  //       });
  //     }
  //   }
  // }

  // return { finalMembers, members };

  return useQuery({
    queryKey: ["chat-members", roomId],
    queryFn: () => ChatApi.getChatMembers(roomId),
  });

  // const getProfileQueries = members?.map((memberId) =>
  //   useQuery({
  //     queryKey: ["chat-user-profile", memberId],
  //     queryFn: () => ProfileApi.getProfile(Number(memberId)),
  //   }),
  // );

  // let finalMembers: TempType[] = [];

  // if (getProfileQueries) {
  //   finalMembers = getProfileQueries.reduce((acc, profileQuery, index) => {
  //     const userProfile = profileQuery.data;
  //     if (userProfile) {
  //       acc.push({
  //         userId: Number(members![index]),
  //         nickName: userProfile.nickName,
  //         blocked: userProfile.blocked,
  //         profileImg: userProfile.profileImage,
  //       });
  //     }
  //     return acc;
  //   }, [] as TempType[]);
  // }

  // return { finalMembers, members };
};
