module mochi {
	export module as3 {
		export class MochiEvents extends egret.HashObject {
			public static ACHIEVEMENTS_OWNED:string;
			public static ACHIEVEMENT_NEW:string;
			public static GAME_ACHIEVEMENTS:string;
			public static ERROR:string;
			public static IO_ERROR:string;
			public static IO_PENDING:string;
			public static ALIGN_TOP_LEFT:string;
			public static ALIGN_TOP:string;
			public static ALIGN_TOP_RIGHT:string;
			public static ALIGN_LEFT:string;
			public static ALIGN_CENTER:string;
			public static ALIGN_RIGHT:string;
			public static ALIGN_BOTTOM_LEFT:string;
			public static ALIGN_BOTTOM:string;
			public static ALIGN_BOTTOM_RIGHT:string;
			public static FORMAT_SHORT:string;
			public static FORMAT_LONG:string;
			public static FORMAT_NONE:string;
			public static gameStart:number = NaN;
			public static levelStart:number = NaN;
			public static _dispatcher:mochi.as3.MochiEventDispatcher;

			public constructor()
			{
				super();
				super();
			}

			public static getVersion():string
			{
				return mochi.as3.MochiServices.getVersion();
			}

			public static getAchievements(param1:any = null)
			{
				mochi.as3.MochiServices.send("events_getAchievements",param1);
			}

			public static unlockAchievement(param1:any)
			{
				mochi.as3.MochiServices.send("events_unlockAchievement",param1);
			}

			public static startSession(param1:string)
			{
				mochi.as3.MochiServices.send("events_beginSession",{"achievementID":param1},null,null);
			}

			public static showAwards(param1:any = null)
			{
				mochi.as3.MochiServices.setContainer();
				mochi.as3.MochiServices.stayOnTop();
				mochi.as3.MochiServices.send("events_showAwards",param1);
			}

			public static setNotifications(param1:any)
			{
				mochi.as3.MochiServices.setContainer();
				mochi.as3.MochiServices.bringToTop();
				mochi.as3.MochiServices.send("events_setNotifications",param1,null,null);
			}

			public static addEventListener(param1:string,param2:Function,thisObject:any)
			{
				mochi.as3.MochiEvents._dispatcher.addEventListener(param1,param2,null);
			}

			public static triggerEvent(param1:string,param2:any)
			{
				mochi.as3.MochiEvents._dispatcher.triggerEvent(param1,param2);
			}

			public static removeEventListener(param1:string,param2:Function,thisObject:any)
			{
				mochi.as3.MochiEvents._dispatcher.removeEventListener(param1,param2,null);
			}

			public static startPlay(param1:string = "gameplay")
			{
				mochi.as3.MochiServices.send("events_setRoundID",{"tag":String(param1)},null,null);
			}

			public static endPlay()
			{
				mochi.as3.MochiServices.send("events_clearRoundID",null,null,null);
			}

			public static trackEvent(param1:string,param2:any = null)
			{
				mochi.as3.MochiServices.send("events_trackEvent",{"tag":param1,"value":param2},null,null);
			}

		}
	}
}

mochi.as3.MochiEvents.ACHIEVEMENTS_OWNED = "AchievementOwned";
mochi.as3.MochiEvents.ACHIEVEMENT_NEW = "AchievementReceived";
mochi.as3.MochiEvents.GAME_ACHIEVEMENTS = "GameAchievements";
mochi.as3.MochiEvents.ERROR = "Error";
mochi.as3.MochiEvents.IO_ERROR = "IOError";
mochi.as3.MochiEvents.IO_PENDING = "IOPending";
mochi.as3.MochiEvents.ALIGN_TOP_LEFT = "ALIGN_TL";
mochi.as3.MochiEvents.ALIGN_TOP = "ALIGN_T";
mochi.as3.MochiEvents.ALIGN_TOP_RIGHT = "ALIGN_TR";
mochi.as3.MochiEvents.ALIGN_LEFT = "ALIGN_L";
mochi.as3.MochiEvents.ALIGN_CENTER = "ALIGN_C";
mochi.as3.MochiEvents.ALIGN_RIGHT = "ALIGN_R";
mochi.as3.MochiEvents.ALIGN_BOTTOM_LEFT = "ALIGN_BL";
mochi.as3.MochiEvents.ALIGN_BOTTOM = "ALIGN_B";
mochi.as3.MochiEvents.ALIGN_BOTTOM_RIGHT = "ALIGN_BR";
mochi.as3.MochiEvents.FORMAT_SHORT = "ShortForm";
mochi.as3.MochiEvents.FORMAT_LONG = "LongForm";
mochi.as3.MochiEvents.FORMAT_NONE = "NoForm";
mochi.as3.MochiEvents._dispatcher = new mochi.as3.MochiEventDispatcher();
