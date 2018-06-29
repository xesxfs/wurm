module com {
	export module greensock {
		export module plugins {
			export class HexColorsPlugin extends com.greensock.plugins.TweenPlugin {
				public static API_static_com_greensock_plugins_HexColorsPlugin:number;
				protected _colors:Array<any>;

				public constructor()
				{
					super();
					this.propName = "hexColors";
					this.overwriteProps = [];
					this._colors = [];
				}

				public killProps(param1:any)
				{
					var _loc2_:number = flash.checkInt(this._colors.length - 1);
					while(_loc2_ > -1)
					{
						if(param1[this._colors[_loc2_][1]] != undefined)
						{
							this._colors.splice(_loc2_,1);
						}
						_loc2_--;
					}
					super.killProps(param1);
				}

				public initColor(param1:any,param2:string,param3:number,param4:number)
				{
					param3 = flash.checkUint(param3);
					param4 = flash.checkUint(param4);
					var _loc5_:number = <any>NaN;
					var _loc6_:number = <any>NaN;
					var _loc7_:number = <any>NaN;
					if(param3 != param4)
					{
						_loc5_ = param3 >> 16;
						_loc6_ = param3 >> 8 & 255;
						_loc7_ = param3 & 255;
						this._colors[this._colors.length] = [param1,param2,_loc5_,(param4 >> 16) - _loc5_,_loc6_,(param4 >> 8 & 255) - _loc6_,_loc7_,(param4 & 255) - _loc7_];
						this.overwriteProps[this.overwriteProps.length] = param2;
					}
				}

				public set changeFactor(param1:number)
				{
					var _loc3_:Array<any> = <any>null;
					var _loc2_:number = flash.checkInt(this._colors.length);
					while(--_loc2_ > -1)
					{
						_loc3_ = this._colors[_loc2_];
						_loc3_[0][_loc3_[1]] = _loc3_[2] + param1 * _loc3_[3] << 16 | _loc3_[4] + param1 * _loc3_[5] << 8 | _loc3_[6] + param1 * _loc3_[7];
					}
				}

				public get changeFactor():number{
			return egret.superGetter(com.greensock.plugins.HexColorsPlugin,this, "changeFactor");
		}
	
 				public onInitTween(param1:any,param2:any,param3:com.greensock.TweenLite):boolean
				{
					var _loc4_:any = null;
					for(_loc4_ in param2)
					{
						this.initColor(param1,_loc4_,flash.tranint(param1[_loc4_]),flash.tranint(param2[_loc4_]));
					}
					return true;
				}

			}
		}
	}
}

com.greensock.plugins.HexColorsPlugin.API_static_com_greensock_plugins_HexColorsPlugin = 1;
flash.extendsClass("com.greensock.plugins.HexColorsPlugin","com.greensock.plugins.TweenPlugin")
