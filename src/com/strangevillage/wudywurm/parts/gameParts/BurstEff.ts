module com {
	export module strangevillage {
		export module wudywurm {
			export module parts {
				export module gameParts {
					export class BurstEff extends egret.Sprite {
						private _gr:egret.Graphics;
						private _clr1:number = 0;
						private _clr2:number = 0;
						private _crFr:number = 0;
						private _frTt:number = 0;
						private _ct:number = 0;
						private _xVec:Array<number>;
						private _yVec:Array<number>;
						private _scVec:Array<number>;
						private _xValVec:Array<number>;
						private _yValVec:Array<number>;
						private _scValVec:Array<number>;
						private _tempAng:number = 0;
						private _tempMoveSpd:number = 0;
						private SPD_BASE:number = 1.8;
						private SPD_DIFF:number = 0.6;

						public constructor(param1:number,param2:number,param3:number,param4:number,param5:number)
						{
							super();
							param3 = flash.checkInt(param3);
							param4 = flash.checkUint(param4);
							param5 = flash.checkUint(param5);
							this._xVec = new Array<number>();
							this._yVec = new Array<number>();
							this._scVec = new Array<number>();
							this._xValVec = new Array<number>();
							this._yValVec = new Array<number>();
							this._scValVec = new Array<number>();
							this.x = param1;
							this.y = param2;
							this.rotation = Math.round(Math.random() * 360);
							this._clr1 = flash.checkUint(param4);
							this._clr2 = flash.checkUint(param5);
							this._gr = this.graphics;
							this._frTt = flash.checkInt(14 + Math.round(Math.random() * 6));
							this._ct = flash.checkInt(param3);
							var _loc6_:number = flash.checkInt(0);
							while(_loc6_ < this._ct)
							{
								this._tempAng = 2 * Math.PI / this._ct * _loc6_ - Math.PI / 6 / 2 + Math.random() * (Math.PI / 6);
								this._tempMoveSpd = this.SPD_BASE - this.SPD_DIFF / 2 + Math.random() * this.SPD_DIFF;
								this._xVec.push(Math.cos(this._tempAng) * this._tempMoveSpd);
								this._xValVec.push(-3 + Math.random() * 6);
								this._yVec.push(Math.sin(this._tempAng) * this._tempMoveSpd);
								this._yValVec.push(-3 + Math.random() * 6);
								this._scVec.push(1 / this._frTt);
								this._scValVec.push(1);
								_loc6_++;
							}
						}

						public effUp():boolean
						{
							var _loc1_:number = flash.checkInt(0);
							this._gr.clear();
							if(this._crFr != this._frTt)
							{
								_loc1_ = flash.checkInt(0);
								while(_loc1_ < this._ct)
								{
									this._gr.beginFill(this._clr1,1);
									this._gr.drawCircle(this._xValVec[_loc1_],this._yValVec[_loc1_],16 * this._scValVec[_loc1_]);
									this._gr.beginFill(this._clr2,1);
									this._gr.drawCircle(this._xValVec[_loc1_],this._yValVec[_loc1_],13 * this._scValVec[_loc1_]);
									this._xValVec[_loc1_] = this._xValVec[_loc1_] + this._xVec[_loc1_];
									this._yValVec[_loc1_] = this._yValVec[_loc1_] + this._yVec[_loc1_];
									this._scValVec[_loc1_] = this._scValVec[_loc1_] - this._scVec[_loc1_];
									_loc1_++;
								}
								this._crFr++;
								return true;
							}
							this.parent.removeChild(this);
							return false;
						}

					}
				}
			}
		}
	}
}

flash.extendsClass("com.strangevillage.wudywurm.parts.gameParts.BurstEff","egret.Sprite")
