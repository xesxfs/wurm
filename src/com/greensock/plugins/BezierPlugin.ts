module com {
	export module greensock {
		export module plugins {
			export class BezierPlugin extends com.greensock.plugins.TweenPlugin {
				public static API_static_com_greensock_plugins_BezierPlugin:number;
				public static _RAD2DEG:number;
				protected _future:any;
				protected _orient:boolean = false;
				protected _orientData:Array<any>;
				protected _target:any;
				protected _beziers:any;

				public constructor()
				{
					super();
					this._future = {};
					this.propName = "bezier";
					this.overwriteProps = [];
				}

				public static parseBeziers(param1:any,param2:boolean = false):any
				{
					var _loc3_:number = flash.checkInt(0);
					var _loc4_:Array<any> = <any>null;
					var _loc5_:any = <any>null;
					var _loc6_:any = null;
					var _loc7_:any = {};
					if(param2)
					{
						for(_loc6_ in param1)
						{
							_loc4_ = param1[_loc6_];
							_loc7_[_loc6_] = _loc5_ = [];
							if(_loc4_.length > 2)
							{
								_loc5_[_loc5_["length"]] = [_loc4_[0],_loc4_[1] - (_loc4_[2] - _loc4_[0]) / 4,_loc4_[1]];
								_loc3_ = flash.checkInt(1);
								while(_loc3_ < _loc4_.length - 1)
								{
									_loc5_[_loc5_["length"]] = [_loc4_[_loc3_],_loc4_[_loc3_] + (_loc4_[_loc3_] - _loc5_[_loc3_ - 1][1]),_loc4_[_loc3_ + 1]];
									_loc3_ = flash.checkInt(_loc3_ + 1);
								}
							}
							else
							{
								_loc5_[_loc5_["length"]] = [_loc4_[0],(_loc4_[0] + _loc4_[1]) / 2,_loc4_[1]];
							}
						}
					}
					else
					{
						for(_loc6_ in param1)
						{
							_loc4_ = param1[_loc6_];
							_loc7_[_loc6_] = _loc5_ = [];
							if(_loc4_.length > 3)
							{
								_loc5_[_loc5_["length"]] = [_loc4_[0],_loc4_[1],(_loc4_[1] + _loc4_[2]) / 2];
								_loc3_ = flash.checkInt(2);
								while(_loc3_ < _loc4_.length - 2)
								{
									_loc5_[_loc5_["length"]] = [_loc5_[_loc3_ - 2][2],_loc4_[_loc3_],(_loc4_[_loc3_] + _loc4_[_loc3_ + 1]) / 2];
									_loc3_ = flash.checkInt(_loc3_ + 1);
								}
								_loc5_[_loc5_["length"]] = [_loc5_[_loc5_["length"] - 1][2],_loc4_[_loc4_.length - 2],_loc4_[_loc4_.length - 1]];
							}
							else if(_loc4_.length == 3)
							{
								_loc5_[_loc5_["length"]] = [_loc4_[0],_loc4_[1],_loc4_[2]];
							}
							else if(_loc4_.length == 2)
							{
								_loc5_[_loc5_["length"]] = [_loc4_[0],(_loc4_[0] + _loc4_[1]) / 2,_loc4_[1]];
							}
						}
					}
					return _loc7_;
				}

				public killProps(param1:any)
				{
					var _loc2_:any = null;
					for(_loc2_ in this._beziers)
					{
						if(_loc2_ in param1)
						{
							delete this._beziers[_loc2_];
						}
					}
					super.killProps(param1);
				}

				protected init(param1:com.greensock.TweenLite,param2:Array<any>,param3:boolean)
				{
					var _loc6_:number = flash.checkInt(0);
					var _loc7_:any = null;
					var _loc8_:any = <any>null;
					this._target = param1.target;
					var _loc4_:any = <any>param1.vars["isTV"] == true?param1.vars["exposedVars"]:param1.vars;
					if(_loc4_["orientToBezier"] == true)
					{
						this._orientData = [["x","y","rotation",0,0.01]];
						this._orient = true;
					}
					else if(flash.As3is(_loc4_["orientToBezier"],Array))
					{
						this._orientData = _loc4_["orientToBezier"];
						this._orient = true;
					}
					var _loc5_:any = {};
					_loc6_ = flash.checkInt(0);
					while(_loc6_ < param2.length)
					{
						for(_loc7_ in param2[_loc6_])
						{
							if(_loc5_[_loc7_] == undefined)
							{
								_loc5_[_loc7_] = [param1.target[_loc7_]];
							}
							if(typeof param2[_loc6_][_loc7_] == "number")
							{
								_loc5_[_loc7_].push(param2[_loc6_][_loc7_]);
							}
							else
							{
								_loc5_[_loc7_].push(param1.target[_loc7_] + flash.trannumber(param2[_loc6_][_loc7_]));
							}
						}
						_loc6_ = flash.checkInt(_loc6_ + 1);
					}
					for(this.overwriteProps[this.overwriteProps.length] in _loc5_)
					{
						if(_loc4_[_loc7_] != undefined)
						{
							if(typeof _loc4_[_loc7_] == "number")
							{
								_loc5_[_loc7_].push(_loc4_[_loc7_]);
							}
							else
							{
								_loc5_[_loc7_].push(param1.target[_loc7_] + flash.trannumber(_loc4_[_loc7_]));
							}
							_loc8_ = {};
							_loc8_[_loc7_] = true;
							param1.killVars(_loc8_,false);
							delete _loc4_[_loc7_];
						}
					}
					this._beziers = com.greensock.plugins.BezierPlugin.parseBeziers(_loc5_,param3);
				}

				public onInitTween(param1:any,param2:any,param3:com.greensock.TweenLite):boolean
				{
					if(<any>!(flash.As3is(param2,Array)))
					{
						return false;
					}
					this.init(param3,flash.As3As(param2,Array),false);
					return true;
				}

				public set changeFactor(param1:number)
				{
					var _loc2_:any = 0;
					var _loc3_:any = null;
					var _loc4_:any = <any>null;
					var _loc5_:number = <any>NaN;
					var _loc6_:number = flash.checkInt(0);
					var _loc7_:number = <any>NaN;
					var _loc8_:any = <any>null;
					var _loc9_:number = <any>NaN;
					var _loc10_:number = <any>NaN;
					var _loc11_:Array<any> = <any>null;
					var _loc12_:number = <any>NaN;
					var _loc13_:any = <any>null;
					var _loc14_:boolean = <any>false;
					this._changeFactor = param1;
					if(param1 == 1)
					{
						for(_loc3_ in this._beziers)
						{
							_loc2_ = flash.tranint(this._beziers[_loc3_].length - 1);
							this._target[_loc3_] = this._beziers[_loc3_][_loc2_][2];
						}
					}
					else
					{
						for(_loc3_ in this._beziers)
						{
							_loc6_ = flash.checkInt(this._beziers[_loc3_].length);
							if(param1 < 0)
							{
								_loc2_ = 0;
							}
							else if(param1 >= 1)
							{
								_loc2_ = flash.tranint(_loc6_ - 1);
							}
							else
							{
								_loc2_ = _loc6_ * param1 >> 0;
							}
							_loc5_ = (param1 - _loc2_ * (1 / _loc6_)) * _loc6_;
							_loc4_ = this._beziers[_loc3_][_loc2_];
							if(this.round)
							{
								_loc7_ = _loc4_[0] + _loc5_ * (2 * (1 - _loc5_) * (_loc4_[1] - _loc4_[0]) + _loc5_ * (_loc4_[2] - _loc4_[0]));
								if(_loc7_ > 0)
								{
									this._target[_loc3_] = _loc7_ + 0.5 >> 0;
								}
								else
								{
									this._target[_loc3_] = _loc7_ - 0.5 >> 0;
								}
							}
							else
							{
								this._target[_loc3_] = _loc4_[0] + _loc5_ * (2 * (1 - _loc5_) * (_loc4_[1] - _loc4_[0]) + _loc5_ * (_loc4_[2] - _loc4_[0]));
							}
						}
					}
					if(this._orient)
					{
						_loc2_ = flash.tranint(this._orientData.length);
						_loc8_ = {};
						while(_loc2_--)
						{
							_loc11_ = this._orientData[_loc2_];
							_loc8_[_loc11_[0]] = this._target[_loc11_[0]];
							_loc8_[_loc11_[1]] = this._target[_loc11_[1]];
						}
						_loc13_ = this._target;
						_loc14_ = this.round;
						this._target = this._future;
						this.round = false;
						this._orient = false;
						_loc2_ = flash.tranint(this._orientData.length);
						while(_loc2_--)
						{
							_loc11_ = this._orientData[_loc2_];
							this.changeFactor = param1 + (_loc11_[4] || 0.01);
							_loc12_ = flash.trannumber(_loc11_[3]) || flash.trannumber(0);
							_loc9_ = this._future[_loc11_[0]] - _loc8_[_loc11_[0]];
							_loc10_ = this._future[_loc11_[1]] - _loc8_[_loc11_[1]];
							_loc13_[_loc11_[2]] = Math.atan2(_loc10_,_loc9_) * com.greensock.plugins.BezierPlugin._RAD2DEG + _loc12_;
						}
						this._target = _loc13_;
						this.round = _loc14_;
						this._orient = true;
					}
				}

				public get changeFactor():number{
			return egret.superGetter(com.greensock.plugins.BezierPlugin,this, "changeFactor");
		}
	
 			}
		}
	}
}

com.greensock.plugins.BezierPlugin.API_static_com_greensock_plugins_BezierPlugin = 1;
com.greensock.plugins.BezierPlugin._RAD2DEG = 180 / Math.PI;
flash.extendsClass("com.greensock.plugins.BezierPlugin","com.greensock.plugins.TweenPlugin")
