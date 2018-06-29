module mochi {
	export module as3 {
		export class MochiCoins extends egret.HashObject {
			public static STORE_SHOW:string;
			public static STORE_HIDE:string;
			public static ITEM_OWNED:string;
			public static ITEM_NEW:string;
			public static STORE_ITEMS:string;
			public static ERROR:string;
			public static IO_ERROR:string;
			public static NO_USER:string;
			public static _inventory:mochi.as3.MochiInventory;
			public static _dispatcher:mochi.as3.MochiEventDispatcher;

			public constructor()
			{
				super();
				super();
			}

			public static get inventory():mochi.as3.MochiInventory
			{
				return mochi.as3.MochiCoins._inventory;
			}

			public static getVersion():string
			{
				return mochi.as3.MochiServices.getVersion();
			}

			public static showStore(param1:any = null)
			{
				mochi.as3.MochiServices.setContainer();
				mochi.as3.MochiServices.bringToTop();
				mochi.as3.MochiServices.send("coins_showStore",{"options":param1},null,null);
			}

			public static showItem(param1:any = null)
			{
				if(<any>!param1 || typeof param1["item"] != "string")
				{
					return ;
				}
				mochi.as3.MochiServices.setContainer();
				mochi.as3.MochiServices.bringToTop();
				mochi.as3.MochiServices.send("coins_showItem",{"options":param1},null,null);
			}

			public static showVideo(param1:any = null)
			{
				if(<any>!param1 || typeof param1["item"] != "string")
				{
					return ;
				}
				mochi.as3.MochiServices.setContainer();
				mochi.as3.MochiServices.bringToTop();
				mochi.as3.MochiServices.send("coins_showVideo",{"options":param1},null,null);
			}

			public static getStoreItems()
			{
				mochi.as3.MochiServices.send("coins_getStoreItems");
			}

			public static requestFunding(param1:any = null)
			{
				mochi.as3.MochiServices.setContainer();
				mochi.as3.MochiServices.bringToTop();
				mochi.as3.MochiServices.send("social_requestFunding",param1);
			}

			public static addEventListener(param1:string,param2:Function,thisObject:any)
			{
				mochi.as3.MochiCoins._dispatcher.addEventListener(param1,param2,null);
			}

			public static triggerEvent(param1:string,param2:any)
			{
				mochi.as3.MochiCoins._dispatcher.triggerEvent(param1,param2);
			}

			public static removeEventListener(param1:string,param2:Function,thisObject:any)
			{
				mochi.as3.MochiCoins._dispatcher.removeEventListener(param1,param2,null);
			}

		}
	}
}

mochi.as3.MochiCoins.STORE_SHOW = "StoreShow";
mochi.as3.MochiCoins.STORE_HIDE = "StoreHide";
mochi.as3.MochiCoins.ITEM_OWNED = "ItemOwned";
mochi.as3.MochiCoins.ITEM_NEW = "ItemNew";
mochi.as3.MochiCoins.STORE_ITEMS = "StoreItems";
mochi.as3.MochiCoins.ERROR = "Error";
mochi.as3.MochiCoins.IO_ERROR = "IOError";
mochi.as3.MochiCoins.NO_USER = "NoUser";
mochi.as3.MochiCoins._dispatcher = new mochi.as3.MochiEventDispatcher();
