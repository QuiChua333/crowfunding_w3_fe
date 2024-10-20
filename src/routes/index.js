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
import { PrefixCampaign, SuccessVerifyInvitation } from '~/pages/common';
import TemplateEmailVerify from '~/pages/auth/EmailVerify';
import ResetPassword from '~/pages/auth/ResetPassword';
import ThankPayment from '~/pages/common/ThankPayment';
import AboutUs from '~/pages/user/AboutUs';

const loginRoutes = [
  { path: '/sign-up', component: SignUp, layout: null },
  { path: '/login', component: Login, layout: null },
];
// Public routes
const publicRoutes = [
  { path: '/', component: Home, layout: null },
  { path: '/explore', component: Explore, layout: NormalLayout },
  { path: '/forgot', component: ForgetPassword, layout: null },
  { path: '/users/verify/:tokenLinkVerifyEmail', component: TemplateEmailVerify, layout: null },
  { path: '/user/:id/update-new-password/:tokenResetPassword', component: ResetPassword, layout: null },
  { path: '/project/:id/detail', component: DetailProject, layout: NormalLayout },
  { path: '/project/:id/perk/detail', component: DetailPerk, layout: null },
  { path: '/project/:id/payments/new/checkout', component: Payment, layout: null },
  { path: '/individuals/:id/campaigns', component: ViewCampaigns, layout: NormalLayout },
  { path: '/individuals/:id/profile', component: ProfilePersonal, layout: NormalLayout },
  { path: '/start-a-campaign', component: PrefixCampaign, layout: NormalLayout },
  { path: '/givefun/verify-user/:tokenLinkVerifyUser', component: VerifyUser, layout: null },
  { path: '/campaigns/team/invitation/:tokenLinkInvitation', component: SuccessVerifyInvitation, layout: null },
  { path: '/payment/thank', component: ThankPayment, layout: null },
  { path: '/about-us', component: AboutUs, layout: NormalLayout },
];
const adminRoutes = [
  { path: '/admin/campaigns', component: CampaignManagement, layout: AdminLayout },
  { path: '/admin/users', component: UserManagement, layout: AdminLayout },
  { path: '/admin/complaint', component: ComplaintManagement, layout: AdminLayout },
  { path: '/admin', component: CampaignManagement, layout: AdminLayout },
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
    { path: '/campaigns/:id/edit/funding', component: FundingCampaign, layout: null },
    { path: '/campaigns/:id/edit/settings', component: SettingCampaign, layout: null },
    { path: '/campaigns/:id/edit/contribution', component: ContributionCampaign, layout: null },
  ],
  individuals: [
    { path: '/individuals/:id/edit/profile', component: EditProfile, layout: NormalLayout },
    { path: '/individuals/:id/edit/settings', component: EditSetting, layout: NormalLayout },
    { path: '/individuals/:id/contributions', component: ViewContributes, layout: NormalLayout },
  ],
};

export { publicRoutes, privateUserRoutes, loginRoutes, adminRoutes };
