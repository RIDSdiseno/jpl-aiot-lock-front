import { useQuery } from "@tanstack/react-query";
import { userCenterService } from "../services/userCenter.service";

export function useUserCenterOptions() {
  return useQuery({ queryKey: ["user-center-options"], queryFn: userCenterService.options });
}
