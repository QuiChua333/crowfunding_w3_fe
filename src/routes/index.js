import Home from '~/pages/user/Home';
import { AdminLayout, CampaignLayout, NormalLayout } from '~/layout';
import Explore from '~/pages/user/Explore';
import SignUp from '~/pages/auth/SignUp';
import Login from '~/pages/auth/Login';
import ForgetPassword from '~/pages/auth/ForgetPassword';

import Payment from '~/pages/user/Payment';
import { CampaignManagement, UserManagement, ComplaintManagement } from '~/pages/admin';
import {
  BasicCampaign,
  ContentCampaign,
  ContributionCampaign,
  EditProfile,
  EditSetting,
  FundingCampaign,
  ItemsCampaign,
  NewItemCampaign,
  NewPerkCampaign,
  PerksCampaign,
  ProfilePersonal,
  SettingCampaign,
  TeamCampaign,
  ViewCampaigns,
  ViewContributes,
} from '~/pages/user';
import DetailProject from '~/pages/user/DetailProject';
import DetailPerk from '~/pages/user/DetailPerk';
import VerifyUser from '~/pages/user/VerifyUser';
import { PageNotFound, PrefixCampaign, SuccessVerifyInvitation } from '~/pages/common';
import TemplateEmailVerify from '~/pages/common/EmailVerifySuccess';
import ResetPassword from '~/pages/auth/ResetPassword';
import ThankPayment from '~/pages/common/ThankPayment';
import AboutUs from '~/pages/user/AboutUs';
import SummaryCampaign from '~/pages/user/CreateCampaign/Summary';
import Statiscal from '~/pages/user/Profile/Statiscal';
import StatiscalAdmin from '~/pages/admin/StatiscalAdmin';
import SendRefund from '~/pages/admin/SendRefund';
import ViewComplaints from '~/pages/user/Profile/View/Complaints';

const loginRoutes = [
  { path: '/sign-up', component: SignUp, layout: null },
  { path: '/login', component: Login, layout: null },
];
// Public routes
const publicRoutes = [
  { path: '/', component: Home, layout: null },
  { path: '/explore', component: Explore, layout: NormalLayout },
  { path: '/forgot', component: ForgetPassword, layout: null },
  { path: '/auth/reset-password', component: ResetPassword, layout: null },
  { path: '/project/:id/detail', component: DetailProject, layout: NormalLayout },
  { path: '/project/:id/perk/detail', component: DetailPerk, layout: null },
  { path: '/project/:id/payments/new/checkout', component: Payment, layout: null },
  { path: '/individuals/:id/campaigns', component: ViewCampaigns, layout: NormalLayout },
  { path: '/individuals/:id/profile', component: ProfilePersonal, layout: NormalLayout },
  { path: '/start-a-campaign', component: PrefixCampaign, layout: NormalLayout },
  { path: '/campaigns/team/invitation/:tokenLinkInvitation', component: SuccessVerifyInvitation, layout: null },
  { path: '/payment/thanks', component: ThankPayment, layout: null },
  { path: '/about-us', component: AboutUs, layout: NormalLayout },
  { path: '/givefun/verify', component: VerifyUser, layout: null },

  // common
  { path: '/auth/verify-email-success', component: TemplateEmailVerify, layout: null },
  { path: '/not-found', component: PageNotFound, layout: null },
];
const adminRoutes = [
  { path: '/admin/campaigns', component: CampaignManagement, layout: AdminLayout },
  { path: '/admin/users', component: UserManagement, layout: AdminLayout },
  { path: '/admin/complaint', component: ComplaintManagement, layout: AdminLayout },
  { path: '/admin', component: CampaignManagement, layout: AdminLayout },
  { path: '/admin/statistic', component: StatiscalAdmin, layout: AdminLayout },
  { path: '/admin/send-refund', component: SendRefund, layout: AdminLayout },
];
const privateUserRoutes = {
  campaigns: [
    { path: '/campaigns/:id/edit/basic', component: BasicCampaign, layout: CampaignLayout },
    { path: '/campaigns/:id/edit/story', component: ContentCampaign, layout: CampaignLayout },
    { path: '/campaigns/:id/edit/perks/table', component: PerksCampaign, layout: CampaignLayout },
    { path: '/campaigns/:id/edit/perks/:idPerk', component: NewPerkCampaign, layout: CampaignLayout, item: true },
    { path: '/campaigns/:id/edit/items/table', component: ItemsCampaign, layout: CampaignLayout },
    { path: '/campaigns/:id/edit/items/:idItem', component: NewItemCampaign, layout: CampaignLayout, item: true },
    { path: '/campaigns/:id/edit/team', component: TeamCampaign, layout: CampaignLayout },
    { path: '/campaigns/:id/edit/funding', component: FundingCampaign, layout: CampaignLayout },
    { path: '/campaigns/:id/edit/settings', component: SettingCampaign, layout: CampaignLayout },
    { path: '/campaigns/:id/edit/contribution', component: ContributionCampaign, layout: CampaignLayout },
    { path: '/campaigns/:id/edit/summary', component: SummaryCampaign, layout: CampaignLayout },
  ],
  individuals: [
    { path: '/individuals/:id/edit/profile', component: EditProfile, layout: NormalLayout },
    { path: '/individuals/:id/edit/settings', component: EditSetting, layout: NormalLayout },
    { path: '/individuals/:id/contributions', component: ViewContributes, layout: NormalLayout },
    { path: '/individuals/:id/statistic', component: Statiscal, layout: NormalLayout },
    { path: '/individuals/:id/complaints', component: ViewComplaints, layout: NormalLayout },
  ],
};

export { publicRoutes, privateUserRoutes, loginRoutes, adminRoutes };
