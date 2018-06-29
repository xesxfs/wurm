module com {
	export module strangevillage {
		export module wudywurm {
			export module parts {
				export module gameParts {
					export class EffectsLayer extends egret.Sprite {
						private EFF_CLR:Array<number> = Array<number>([6262615,10019467,1596788,2461619,12624717,16308344,10701159,14317208,10590323,16775648,13074510,16298107,6067868,10151661,6639992,10389174,11040385,16238802]);
						private EFF_LIMIT:number = 120;
						private _effMainVec:Array<com.strangevillage.wudywurm.parts.gameParts.BurstEff>;
						private _tempCt:number = 5;
						private _tempClr:number = 0;
						private _delEffVec:Array<com.strangevillage.wudywurm.parts.gameParts.BurstEff>;

						public constructor()
						{
							super();
							this._effMainVec = new Array<com.strangevillage.wudywurm.parts.gameParts.BurstEff>();
							this._delEffVec = new Array<com.strangevillage.wudywurm.parts.gameParts.BurstEff>();
							this.touchChildren = false;
							this.touchEnabled = false;
							this.x = com.strangevillage.wudywurm.helpers.GridHolder.GRID_X;
							this.y = com.strangevillage.wudywurm.helpers.GridHolder.GRID_Y;
						}

						public doorsShowEff()
						{
							var _loc1_:DoorsOpenEff = new DoorsOpenEff();
							_loc1_.x = com.strangevillage.wudywurm.Config.effX;
							_loc1_.y = com.strangevillage.wudywurm.Config.effY;
							_loc1_.rotation = Math.round(Math.random() * 360);
							this.addChild(_loc1_);
						}

						public doComboEff()
						{
							var _loc2_:com.strangevillage.wudywurm.parts.gameParts.BurstEff = <any>null;
							this._tempCt = flash.checkInt(Math.floor(this.EFF_LIMIT / (com.strangevillage.wudywurm.Config.effComboDataVec.length / 3)));
							if(this._tempCt > 5)
							{
								this._tempCt = flash.checkInt(5);
							}
							else if(this._tempCt < 1)
							{
								this._tempCt = flash.checkInt(1);
							}
							var _loc1_:number = flash.checkInt(0);
							while(_loc1_ < com.strangevillage.wudywurm.Config.effComboDataVec.length / 3)
							{
								this._tempClr = flash.checkInt((com.strangevillage.wudywurm.Config.effComboDataVec[_loc1_ * 3 + 2] - 1) * 2);
								_loc2_ = new com.strangevillage.wudywurm.parts.gameParts.BurstEff(com.strangevillage.wudywurm.Config.effComboDataVec[_loc1_ * 3],com.strangevillage.wudywurm.Config.effComboDataVec[_loc1_ * 3 + 1],this._tempCt,this.EFF_CLR[this._tempClr],this.EFF_CLR[this._tempClr + 1]);
								this.addChild(_loc2_);
								this._effMainVec.push(_loc2_);
								_loc1_++;
							}
						}

						public effLoop()
						{
							var _loc1_:com.strangevillage.wudywurm.parts.gameParts.BurstEff = <any>null;
							var _loc2_:com.strangevillage.wudywurm.parts.gameParts.BurstEff = <any>null;
							if(this._effMainVec.length != 0)
							{
								var _loc1__key_a;
								for(_loc1__key_a in this._effMainVec)
								{
									_loc1_ = this._effMainVec[_loc1__key_a];
									if(<any>!_loc1_.effUp())
									{
										this._delEffVec.push(_loc1_);
									}
								}
								if(this._delEffVec.length != 0)
								{
									var _loc2__key_a;
									for(_loc2__key_a in this._delEffVec)
									{
										_loc2_ = this._delEffVec[_loc2__key_a];
										this._effMainVec.splice(this._effMainVec.indexOf(_loc2_),1);
									}
									this._delEffVec = Array<com.strangevillage.wudywurm.parts.gameParts.BurstEff>([]);
								}
							}
						}

					}
				}
			}
		}
	}
}

flash.extendsClass("com.strangevillage.wudywurm.parts.gameParts.EffectsLayer","egret.Sprite")
