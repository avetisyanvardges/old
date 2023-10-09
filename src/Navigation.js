import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import ForgotPassword from './screens/ForgotPassword';
import ResetPassword from './screens/ResetPassword';
import Menu from './screens/Menu';
import EditProfile from './screens/EditProfile';
import Filters from './screens/Filters';
import History from './screens/History';
import ChangeLanguage from './screens/ChangeLanguage';
import Settings from './screens/Settings';
import GooglePlacesInput from './screens/MapAutoComplete';
import Notifications from './screens/Notifications';
import AccountVerification from './screens/AccountVerification';
import AddEvent from './screens/AddEvent';
import ChangePassword from './screens/ChangePassword';
import RateComponent from './screens/Modal';
import Members from './screens/Members';
import NotificationSettings from './screens/NotificationSettings';
import GeneralInfo from './screens/GeneralInfo';
import UserProfile from './screens/UserProfile';
import ChatScreen from './screens/ChatScreen';
import ChatScreenList from './screens/ChatScreenList';
import EventsList from './screens/EventsList';
import EventDetails from './screens/EventDetails';
import FailingConnection from './screens/FailingConnection';
import VerificationStep from './screens/VerificationStep';
import Account from './screens/Account';
import TelephoneNumber from './screens/TelephoneNumber';
import Email from './screens/Email';
import DeleteAccount from './screens/DeleteAccount';
import PrivacyPolicy from './screens/PrivacyPolicy';
import PrivacyDetail from './screens/PrivacyDetail';
import Security from './screens/Security';
import SwitchAccount from './screens/SwitchAccount';
import PushNotifications from './screens/PushNotifications';
import ReportProblem from './screens/ReportProblem';
import Information from './screens/Information';
import SecurityDetail from './screens/SecurityDetail';
import EventComment from './screens/EventComment';
import CommentLikeMembers from './screens/CommentLikeMembers';
import {AppVersion} from './screens/AppVersion';

const AppNavigator = createStackNavigator(
  {
    SignUp: {
      screen: SignUp,
    },
    Login: {
      screen: Login,
    },
    Menu: {
      screen: Menu,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    ForgotPassword: {
      screen: ForgotPassword,
    },
    ResetPassword: {
      screen: ResetPassword,
    },
    EditProfile: {
      screen: EditProfile,
    },
    ModifyEvent: {
      screen: Filters,
    },
    History: {
      screen: History,
    },
    ChangeLanguage: {
      screen: ChangeLanguage,
    },
    Settings: {
      screen: Settings,
    },
    AccountVerification: {
      screen: AccountVerification,
    },
    Place: {
      screen: GooglePlacesInput,
    },
    Notifications: {
      screen: Notifications,
    },
    AddEvent: {
      screen: AddEvent,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    EditEvent: {
      screen: AddEvent,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    ChangePassword: {
      screen: ChangePassword,
    },
    EventView: {
      screen: EventDetails,
    },

    Rate: {
      screen: RateComponent,
    },
    Members: {
      screen: Members,
    },
    NotificationSettings: {
      screen: NotificationSettings,
    },
    GeneralInfo: {
      screen: GeneralInfo,
    },
    UserProfile: {
      screen: UserProfile,
    },
    ChatScreen: {
      screen: ChatScreen,
    },
    ChatListScreen: {
      screen: ChatScreenList,
    },
    FailingConnection: {
      screen: FailingConnection,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    VerificationStep: {
      screen: VerificationStep,
    },
    VerificationDone: {
      screen: VerificationStep,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    EventsList: {
      screen: EventsList,
      path: 'eventList',
    },
    Account: {
      screen: Account,
    },
    TelephoneNumber: {
      screen: TelephoneNumber,
    },
    Email: {
      screen: Email,
    },
    DeleteAccount: {
      screen: DeleteAccount,
    },
    PrivacyPolicy: {
      screen: PrivacyPolicy,
    },
    PrivacyDetail: {
      screen: PrivacyDetail,
    },
    Security: {
      screen: Security,
    },
    SecurityDetail: {
      screen: SecurityDetail,
    },
    SwitchAccount: {
      screen: SwitchAccount,
    },
    PushNotifications: {
      screen: PushNotifications,
    },
    ReportProblem: {
      screen: ReportProblem,
    },
    Information: {
      screen: Information,
    },
    EventComment: {
      screen: EventComment,
    },
    AppVersion: {
      screen: AppVersion,
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
    CommentLikeMembers: {
      screen: CommentLikeMembers,
    },
  },
  {
    gesturesEnabled: false,
    headerMode: 'none',
    initialRouteName: 'Login',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
