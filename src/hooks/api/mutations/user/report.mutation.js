import { useMutation } from '@tanstack/react-query';
import { sendReport } from '~/api/user/report.api';

// handleAPI
export const useSendReportCampaignMutation = () => {
  return useMutation({
    mutationKey: ['useSendReportCampaignMutation'],
    mutationFn: sendReport,
  });
};
