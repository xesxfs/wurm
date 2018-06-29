module mx {
	export module core {
		export interface IFlexDisplayObject extends egret.IEventDispatcher {
			root:egret.DisplayObject;
			stage:egret.Stage;
			name:string;
			parent:egret.DisplayObjectContainer;
			mask:egret.DisplayObject;
			visible:boolean;
			x:number;
			y:number;
			scaleX:number;
			scaleY:number;
			mouseX:number;
			mouseY:number;
			rotation:number;
			alpha:number;
			width:number;
			height:number;
			cacheAsBitmap:boolean;
			opaqueBackground:any;
			scrollRect:egret.Rectangle;
			filters:Array<any>;
			blendMode:string;
			transform:flash.Transform;
			scale9Grid:egret.Rectangle;
			globalToLocal(param1:egret.Point):egret.Point;
			localToGlobal(param1:egret.Point):egret.Point;
			getBounds(param1:egret.DisplayObject):egret.Rectangle;
			getRect(param1:egret.DisplayObject):egret.Rectangle;
			loaderInfo:flash.LoaderInfo;
			hitTestObject(param1:egret.DisplayObject):boolean;
			hitTestPoint(param1:number,param2:number,param3?:boolean):boolean;
			accessibilityProperties:egret.AccessibilityProperties;
			measuredHeight:number;
			measuredWidth:number;
			move(param1:number,param2:number);
			setActualSize(param1:number,param2:number);
		}
	}
}

flash.extendsClass("mx.core.IFlexDisplayObject","egret.IEventDispatcher")
