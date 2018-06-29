module com {
	export module greensock {
		export module plugins {
			export class ColorMatrixFilterPlugin extends com.greensock.plugins.FilterPlugin {
				public static API_static_com_greensock_plugins_ColorMatrixFilterPlugin:number;
				public static _propNames:Array<any>;
				public static _lumG:number;
				public static _lumR:number;
				public static _idMatrix:Array<any>;
				public static _lumB:number;
				protected _matrix:Array<any>;
				protected _matrixTween:com.greensock.plugins.EndArrayPlugin;

				public constructor()
				{
					super();
					this.propName = "colorMatrixFilter";
					this.overwriteProps = ["colorMatrixFilter"];
				}

				public static setSaturation(param1:Array<any>,param2:number):Array<any>
				{
					if(isNaN(param2))
					{
						return param1;
					}
					var _loc3_:number = 1 - param2;
					var _loc4_:number = _loc3_ * com.greensock.plugins.ColorMatrixFilterPlugin._lumR;
					var _loc5_:number = _loc3_ * com.greensock.plugins.ColorMatrixFilterPlugin._lumG;
					var _loc6_:number = _loc3_ * com.greensock.plugins.ColorMatrixFilterPlugin._lumB;
					var _loc7_:Array<any> = [_loc4_ + param2,_loc5_,_loc6_,0,0,_loc4_,_loc5_ + param2,_loc6_,0,0,_loc4_,_loc5_,_loc6_ + param2,0,0,0,0,0,1,0];
					return com.greensock.plugins.ColorMatrixFilterPlugin.applyMatrix(_loc7_,param1);
				}

				public static setHue(param1:Array<any>,param2:number):Array<any>
				{
					if(isNaN(param2))
					{
						return param1;
					}
					param2 = param2 * (Math.PI / 180);
					var _loc3_:number = Math.cos(param2);
					var _loc4_:number = Math.sin(param2);
					var _loc5_:Array<any> = [com.greensock.plugins.ColorMatrixFilterPlugin._lumR + _loc3_ * (1 - com.greensock.plugins.ColorMatrixFilterPlugin._lumR) + _loc4_ * -com.greensock.plugins.ColorMatrixFilterPlugin._lumR,com.greensock.plugins.ColorMatrixFilterPlugin._lumG + _loc3_ * -com.greensock.plugins.ColorMatrixFilterPlugin._lumG + _loc4_ * -com.greensock.plugins.ColorMatrixFilterPlugin._lumG,com.greensock.plugins.ColorMatrixFilterPlugin._lumB + _loc3_ * -com.greensock.plugins.ColorMatrixFilterPlugin._lumB + _loc4_ * (1 - com.greensock.plugins.ColorMatrixFilterPlugin._lumB),0,0,com.greensock.plugins.ColorMatrixFilterPlugin._lumR + _loc3_ * -com.greensock.plugins.ColorMatrixFilterPlugin._lumR + _loc4_ * 0.143,com.greensock.plugins.ColorMatrixFilterPlugin._lumG + _loc3_ * (1 - com.greensock.plugins.ColorMatrixFilterPlugin._lumG) + _loc4_ * 0.14,com.greensock.plugins.ColorMatrixFilterPlugin._lumB + _loc3_ * -com.greensock.plugins.ColorMatrixFilterPlugin._lumB + _loc4_ * -0.283,0,0,com.greensock.plugins.ColorMatrixFilterPlugin._lumR + _loc3_ * -com.greensock.plugins.ColorMatrixFilterPlugin._lumR + _loc4_ * -(1 - com.greensock.plugins.ColorMatrixFilterPlugin._lumR),com.greensock.plugins.ColorMatrixFilterPlugin._lumG + _loc3_ * -com.greensock.plugins.ColorMatrixFilterPlugin._lumG + _loc4_ * com.greensock.plugins.ColorMatrixFilterPlugin._lumG,com.greensock.plugins.ColorMatrixFilterPlugin._lumB + _loc3_ * (1 - com.greensock.plugins.ColorMatrixFilterPlugin._lumB) + _loc4_ * com.greensock.plugins.ColorMatrixFilterPlugin._lumB,0,0,0,0,0,1,0,0,0,0,0,1];
					return com.greensock.plugins.ColorMatrixFilterPlugin.applyMatrix(_loc5_,param1);
				}

				public static setContrast(param1:Array<any>,param2:number):Array<any>
				{
					if(isNaN(param2))
					{
						return param1;
					}
					param2 = param2 + 0.01;
					var _loc3_:Array<any> = [param2,0,0,0,128 * (1 - param2),0,param2,0,0,128 * (1 - param2),0,0,param2,0,128 * (1 - param2),0,0,0,1,0];
					return com.greensock.plugins.ColorMatrixFilterPlugin.applyMatrix(_loc3_,param1);
				}

				public static applyMatrix(param1:Array<any>,param2:Array<any>):Array<any>
				{
					var _loc6_:number = flash.checkInt(0);
					var _loc7_:number = flash.checkInt(0);
					if(<any>!(flash.As3is(param1,Array)) || <any>!(flash.As3is(param2,Array)))
					{
						return param2;
					}
					var _loc3_:Array<any> = [];
					var _loc4_:number = flash.checkInt(0);
					var _loc5_:number = flash.checkInt(0);
					_loc6_ = flash.checkInt(0);
					while(_loc6_ < 4)
					{
						_loc7_ = flash.checkInt(0);
						while(_loc7_ < 5)
						{
							if(_loc7_ == 4)
							{
								_loc5_ = flash.checkInt(param1[_loc4_ + 4]);
							}
							else
							{
								_loc5_ = flash.checkInt(0);
							}
							_loc3_[_loc4_ + _loc7_] = param1[_loc4_] * param2[_loc7_] + param1[_loc4_ + 1] * param2[_loc7_ + 5] + param1[_loc4_ + 2] * param2[_loc7_ + 10] + param1[_loc4_ + 3] * param2[_loc7_ + 15] + _loc5_;
							_loc7_ = flash.checkInt(_loc7_ + 1);
						}
						_loc4_ = flash.checkInt(_loc4_ + 5);
						_loc6_ = flash.checkInt(_loc6_ + 1);
					}
					return _loc3_;
				}

				public static setThreshold(param1:Array<any>,param2:number):Array<any>
				{
					if(isNaN(param2))
					{
						return param1;
					}
					var _loc3_:Array<any> = [com.greensock.plugins.ColorMatrixFilterPlugin._lumR * 256,com.greensock.plugins.ColorMatrixFilterPlugin._lumG * 256,com.greensock.plugins.ColorMatrixFilterPlugin._lumB * 256,0,-256 * param2,com.greensock.plugins.ColorMatrixFilterPlugin._lumR * 256,com.greensock.plugins.ColorMatrixFilterPlugin._lumG * 256,com.greensock.plugins.ColorMatrixFilterPlugin._lumB * 256,0,-256 * param2,com.greensock.plugins.ColorMatrixFilterPlugin._lumR * 256,com.greensock.plugins.ColorMatrixFilterPlugin._lumG * 256,com.greensock.plugins.ColorMatrixFilterPlugin._lumB * 256,0,-256 * param2,0,0,0,1,0];
					return com.greensock.plugins.ColorMatrixFilterPlugin.applyMatrix(_loc3_,param1);
				}

				public static colorize(param1:Array<any>,param2:number,param3:number = 1):Array<any>
				{
					if(isNaN(param2))
					{
						return param1;
					}
					if(isNaN(param3))
					{
						param3 = 1;
					}
					var _loc4_:number = (param2 >> 16 & 255) / 255;
					var _loc5_:number = (param2 >> 8 & 255) / 255;
					var _loc6_:number = (param2 & 255) / 255;
					var _loc7_:number = 1 - param3;
					var _loc8_:Array<any> = [_loc7_ + param3 * _loc4_ * com.greensock.plugins.ColorMatrixFilterPlugin._lumR,param3 * _loc4_ * com.greensock.plugins.ColorMatrixFilterPlugin._lumG,param3 * _loc4_ * com.greensock.plugins.ColorMatrixFilterPlugin._lumB,0,0,param3 * _loc5_ * com.greensock.plugins.ColorMatrixFilterPlugin._lumR,_loc7_ + param3 * _loc5_ * com.greensock.plugins.ColorMatrixFilterPlugin._lumG,param3 * _loc5_ * com.greensock.plugins.ColorMatrixFilterPlugin._lumB,0,0,param3 * _loc6_ * com.greensock.plugins.ColorMatrixFilterPlugin._lumR,param3 * _loc6_ * com.greensock.plugins.ColorMatrixFilterPlugin._lumG,_loc7_ + param3 * _loc6_ * com.greensock.plugins.ColorMatrixFilterPlugin._lumB,0,0,0,0,0,1,0];
					return com.greensock.plugins.ColorMatrixFilterPlugin.applyMatrix(_loc8_,param1);
				}

				public static setBrightness(param1:Array<any>,param2:number):Array<any>
				{
					if(isNaN(param2))
					{
						return param1;
					}
					param2 = param2 * 100 - 100;
					return com.greensock.plugins.ColorMatrixFilterPlugin.applyMatrix([1,0,0,0,param2,0,1,0,0,param2,0,0,1,0,param2,0,0,0,1,0,0,0,0,0,1],param1);
				}

				public onInitTween(param1:any,param2:any,param3:com.greensock.TweenLite):boolean
				{
					this._target = param1;
					this._type = flash.ColorMatrixFilter;
					var _loc4_:any = <any>param2;
					this.initFilter({"remove":param2.remove,"index":param2.index,"addFilter":param2.addFilter},new flash.ColorMatrixFilter(com.greensock.plugins.ColorMatrixFilterPlugin._idMatrix.slice()),com.greensock.plugins.ColorMatrixFilterPlugin._propNames);
					this._matrix = (<flash.ColorMatrixFilter>(this._filter)).matrix;
					var _loc5_:Array<any> = [];
					if(_loc4_["matrix"] != null && flash.As3is(_loc4_["matrix"],Array))
					{
						_loc5_ = _loc4_["matrix"];
					}
					else
					{
						if(_loc4_["relative"] == true)
						{
							_loc5_ = this._matrix.slice();
						}
						else
						{
							_loc5_ = com.greensock.plugins.ColorMatrixFilterPlugin._idMatrix.slice();
						}
						_loc5_ = com.greensock.plugins.ColorMatrixFilterPlugin.setBrightness(_loc5_,_loc4_["brightness"]);
						_loc5_ = com.greensock.plugins.ColorMatrixFilterPlugin.setContrast(_loc5_,_loc4_["contrast"]);
						_loc5_ = com.greensock.plugins.ColorMatrixFilterPlugin.setHue(_loc5_,_loc4_["hue"]);
						_loc5_ = com.greensock.plugins.ColorMatrixFilterPlugin.setSaturation(_loc5_,_loc4_["saturation"]);
						_loc5_ = com.greensock.plugins.ColorMatrixFilterPlugin.setThreshold(_loc5_,_loc4_["threshold"]);
						if(<any>!isNaN(_loc4_["colorize"]))
						{
							_loc5_ = com.greensock.plugins.ColorMatrixFilterPlugin.colorize(_loc5_,_loc4_["colorize"],_loc4_["amount"]);
						}
					}
					this._matrixTween = new com.greensock.plugins.EndArrayPlugin();
					this._matrixTween.init(this._matrix,_loc5_);
					return true;
				}

				public set changeFactor(param1:number)
				{
					this._matrixTween.changeFactor = param1;
					(<flash.ColorMatrixFilter>(this._filter)).matrix = this._matrix;
					egret.superSetter(com.greensock.plugins.ColorMatrixFilterPlugin,this,"changeFactor",param1);
				}

			}
		}
	}
}

com.greensock.plugins.ColorMatrixFilterPlugin.API_static_com_greensock_plugins_ColorMatrixFilterPlugin = 1;
com.greensock.plugins.ColorMatrixFilterPlugin._propNames = [];
com.greensock.plugins.ColorMatrixFilterPlugin._lumG = 0.71516;
com.greensock.plugins.ColorMatrixFilterPlugin._lumR = 0.212671;
com.greensock.plugins.ColorMatrixFilterPlugin._idMatrix = [1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0];
com.greensock.plugins.ColorMatrixFilterPlugin._lumB = 0.072169;
flash.extendsClass("com.greensock.plugins.ColorMatrixFilterPlugin","com.greensock.plugins.FilterPlugin")
