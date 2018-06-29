module mochi {
	export module as3 {
		export class MochiSocial extends egret.HashObject {
			public static LOGGED_IN:string;
			public static LOGGED_OUT:string;
			public static LOGIN_SHOW:string;
			public static LOGIN_HIDE:string;
			public static LOGIN_SHOWN:string;
			public static PROFILE_SHOW:string;
			public static PROFILE_HIDE:string;
			public static PROPERTIES_SAVED:string;
			public static WIDGET_LOADED:string;
			public static FRIEND_LIST:string;
			public static PROFILE_DATA:string;
			public static GAMEPLAY_DATA:string;
			public static ACTION_CANCELED:string;
			public static ACTION_COMPLETE:string;
			public static USER_INFO:string;
			public static ERROR:string;
			public static IO_ERROR:string;
			public static NO_USER:string;
			public static PROPERTIES_SIZE:string;
			public static _dispatcher:mochi.as3.MochiEventDispatcher;
			public static _user_info:any;

			public constructor()
			{
				super();
				super();
			}

			public static getVersion():string
			{
				return mochi.as3.MochiServices.getVersion();
			}

			public static getAPIURL():string
			{
				if(<any>!mochi.as3.MochiSocial._user_info)
				{
					return null;
				}
				return mochi.as3.MochiSocial._user_info["api_url"];
			}

			public static getAPIToken():string
			{
				if(<any>!mochi.as3.MochiSocial._user_info)
				{
					return null;
				}
				return mochi.as3.MochiSocial._user_info["api_token"];
			}

			public static showLoginWidget(param1:any = null)
			{
				mochi.as3.MochiServices.setContainer();
				mochi.as3.MochiServices.bringToTop();
				mochi.as3.MochiServices.send("social_showLoginWidget",{"options":param1});
			}

			public static hideLoginWidget()
			{
				mochi.as3.MochiServices.send("social_hideLoginWidget");
			}

			public static requestLogin(param1:any = null)
			{
				mochi.as3.MochiServices.setContainer();
				mochi.as3.MochiServices.bringToTop();
				mochi.as3.MochiServices.send("social_requestLogin",param1);
			}

			public static showProfile(param1:any = null)
			{
				mochi.as3.MochiServices.setContainer();
				mochi.as3.MochiServices.stayOnTop();
				mochi.as3.MochiServices.send("social_showProfile",param1);
			}

			public static saveUserProperties(param1:any)
			{
				mochi.as3.MochiServices.send("social_saveUserProperties",param1);
			}

			public static getFriendsList(param1:any = null)
			{
				mochi.as3.MochiServices.send("social_getFriendsList",param1);
			}

			public static postToStream(param1:any = null)
			{
				mochi.as3.MochiServices.setContainer();
				mochi.as3.MochiServices.bringToTop();
				mochi.as3.MochiServices.send("social_postToStream",param1);
			}

			public static inviteFriends(param1:any = null)
			{
				mochi.as3.MochiServices.setContainer();
				mochi.as3.MochiServices.bringToTop();
				mochi.as3.MochiServices.send("social_inviteFriends",param1);
			}

			public static requestFan(param1:any = null)
			{
				mochi.as3.MochiServices.setContainer();
				mochi.as3.MochiServices.bringToTop();
				mochi.as3.MochiServices.send("social_requestFan",param1);
			}

			public static addEventListener(param1:string,param2:Function,thisObject:any)
			{
				mochi.as3.MochiSocial._dispatcher.addEventListener(param1,param2,null);
			}

			public static get loggedIn():boolean
			{
				return mochi.as3.MochiSocial._user_info != null;
			}

			public static triggerEvent(param1:string,param2:any)
			{
				mochi.as3.MochiSocial._dispatcher.triggerEvent(param1,param2);
			}

			public static removeEventListener(param1:string,param2:Function,thisObject:any)
			{
				mochi.as3.MochiSocial._dispatcher.removeEventListener(param1,param2,null);
			}

		}
	}
}

mochi.as3.MochiSocial.LOGGED_IN = "LoggedIn";
mochi.as3.MochiSocial.LOGGED_OUT = "LoggedOut";
mochi.as3.MochiSocial.LOGIN_SHOW = "LoginShow";
mochi.as3.MochiSocial.LOGIN_HIDE = "LoginHide";
mochi.as3.MochiSocial.LOGIN_SHOWN = "LoginShown";
mochi.as3.MochiSocial.PROFILE_SHOW = "ProfileShow";
mochi.as3.MochiSocial.PROFILE_HIDE = "ProfileHide";
mochi.as3.MochiSocial.PROPERTIES_SAVED = "PropertySaved";
mochi.as3.MochiSocial.WIDGET_LOADED = "WidgetLoaded";
mochi.as3.MochiSocial.FRIEND_LIST = "FriendsList";
mochi.as3.MochiSocial.PROFILE_DATA = "ProfileData";
mochi.as3.MochiSocial.GAMEPLAY_DATA = "GameplayData";
mochi.as3.MochiSocial.ACTION_CANCELED = "onCancel";
mochi.as3.MochiSocial.ACTION_COMPLETE = "onComplete";
mochi.as3.MochiSocial.USER_INFO = "UserInfo";
mochi.as3.MochiSocial.ERROR = "Error";
mochi.as3.MochiSocial.IO_ERROR = "IOError";
mochi.as3.MochiSocial.NO_USER = "NoUser";
mochi.as3.MochiSocial.PROPERTIES_SIZE = "PropertiesSize";
mochi.as3.MochiSocial._dispatcher = new mochi.as3.MochiEventDispatcher();
mochi.as3.MochiSocial._user_info = null;
