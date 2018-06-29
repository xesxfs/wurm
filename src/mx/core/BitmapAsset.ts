module mx {
	export module core {
		export class BitmapAsset extends mx.core.FlexBitmap implements mx.core.IFlexAsset,mx.core.IFlexDisplayObject,mx.core.ILayoutDirectionElement {
			public static VERSION_static_mx_core_BitmapAsset:string;
			public static FlexVersionClass:any;
			public static MatrixUtilClass:any;
			private layoutFeaturesClass:any;
			private layoutFeatures:mx.core.IAssetLayoutFeatures;
			private _height:number = NaN;
			private _layoutDirection:string = "ltr";

			public constructor(param1:flash.BitmapData = null,param2:string = "auto",param3:boolean = false)
			{
				super(param1,param2,param3);
				var _loc4_:flash.ApplicationDomain = <any>null;
				if(mx.core.BitmapAsset.FlexVersionClass == null)
				{
					_loc4_ = flash.ApplicationDomain.currentDomain;
					if(_loc4_.hasDefinition("mx.core::FlexVersion"))
					{
						mx.core.BitmapAsset.FlexVersionClass = (<any>(_loc4_.getDefinition("mx.core::FlexVersion")));
					}
				}
				if(mx.core.BitmapAsset.FlexVersionClass && mx.core.BitmapAsset.FlexVersionClass["compatibilityVersion"] >= mx.core.BitmapAsset.FlexVersionClass["VERSION_4_0"])
				{
					this.addEventListener(egret.Event.ADDED,flash.bind(this.addedHandler,this),null);
				}
			}

			public get x():number
			{
				return this.layoutFeatures == null?flash.trannumber(egret.superGetter(mx.core.BitmapAsset,this,"x")):flash.trannumber(this.layoutFeatures.layoutX);
			}

			public set x(param1:number)
			{
				if(this.x == param1)
				{
					return ;
				}
				if(this.layoutFeatures == null)
				{
					egret.superSetter(mx.core.BitmapAsset,this,"x",param1);
				}
				else
				{
					this.layoutFeatures.layoutX = param1;
					this.validateTransformMatrix();
				}
			}

			public get y():number
			{
				return this.layoutFeatures == null?flash.trannumber(egret.superGetter(mx.core.BitmapAsset,this,"y")):flash.trannumber(this.layoutFeatures.layoutY);
			}

			public set y(param1:number)
			{
				if(this.y == param1)
				{
					return ;
				}
				if(this.layoutFeatures == null)
				{
					egret.superSetter(mx.core.BitmapAsset,this,"y",param1);
				}
				else
				{
					this.layoutFeatures.layoutY = param1;
					this.validateTransformMatrix();
				}
			}

			public get z():number
			{
				return this.layoutFeatures == null?flash.trannumber(egret.superGetter(mx.core.BitmapAsset,this,"z")):flash.trannumber(this.layoutFeatures.layoutZ);
			}

			public set z(param1:number)
			{
				if(this.z == param1)
				{
					return ;
				}
				if(this.layoutFeatures == null)
				{
					egret.superSetter(mx.core.BitmapAsset,this,"z",param1);
				}
				else
				{
					this.layoutFeatures.layoutZ = param1;
					this.validateTransformMatrix();
				}
			}

			public get width():number
			{
				var _loc1_:egret.Point = <any>null;
				if(this.layoutFeatures == null)
				{
					return egret.superGetter(mx.core.BitmapAsset,this,"width");
				}
				if(mx.core.BitmapAsset.MatrixUtilClass != null)
				{
					_loc1_ = mx.core.BitmapAsset.MatrixUtilClass["transformSize"](this.layoutFeatures.layoutWidth,this._height,this["transform"].matrix);
				}
				return <any>!<any>!_loc1_?flash.trannumber(_loc1_.x):flash.trannumber(egret.superGetter(mx.core.BitmapAsset,this,"width"));
			}

			public set width(param1:number)
			{
				if(this.width == param1)
				{
					return ;
				}
				if(this.layoutFeatures == null)
				{
					egret.superSetter(mx.core.BitmapAsset,this,"width",param1);
				}
				else
				{
					this.layoutFeatures.layoutWidth = param1;
					this.layoutFeatures.layoutScaleX = this.measuredWidth != 0?flash.trannumber(param1 / this.measuredWidth):flash.trannumber(0);
					this.validateTransformMatrix();
				}
			}

			public get height():number
			{
				var _loc1_:egret.Point = <any>null;
				if(this.layoutFeatures == null)
				{
					return egret.superGetter(mx.core.BitmapAsset,this,"height");
				}
				if(mx.core.BitmapAsset.MatrixUtilClass != null)
				{
					_loc1_ = mx.core.BitmapAsset.MatrixUtilClass["transformSize"](this.layoutFeatures.layoutWidth,this._height,this["transform"].matrix);
				}
				return <any>!<any>!_loc1_?flash.trannumber(_loc1_.y):flash.trannumber(egret.superGetter(mx.core.BitmapAsset,this,"height"));
			}

			public set height(param1:number)
			{
				if(this.height == param1)
				{
					return ;
				}
				if(this.layoutFeatures == null)
				{
					egret.superSetter(mx.core.BitmapAsset,this,"height",param1);
				}
				else
				{
					this._height = param1;
					this.layoutFeatures.layoutScaleY = this.measuredHeight != 0?flash.trannumber(param1 / this.measuredHeight):flash.trannumber(0);
					this.validateTransformMatrix();
				}
			}

			public get rotationX():number
			{
				return this.layoutFeatures == null?flash.trannumber(egret.superGetter(mx.core.BitmapAsset,this,"rotationX")):flash.trannumber(this.layoutFeatures.layoutRotationX);
			}

			public set rotationX(param1:number)
			{
				if(this.rotationX == param1)
				{
					return ;
				}
				if(this.layoutFeatures == null)
				{
					egret.superSetter(mx.core.BitmapAsset,this,"rotationX",param1);
				}
				else
				{
					this.layoutFeatures.layoutRotationX = param1;
					this.validateTransformMatrix();
				}
			}

			public get rotationY():number
			{
				return this.layoutFeatures == null?flash.trannumber(egret.superGetter(mx.core.BitmapAsset,this,"rotationY")):flash.trannumber(this.layoutFeatures.layoutRotationY);
			}

			public set rotationY(param1:number)
			{
				if(this.rotationY == param1)
				{
					return ;
				}
				if(this.layoutFeatures == null)
				{
					egret.superSetter(mx.core.BitmapAsset,this,"rotationY",param1);
				}
				else
				{
					this.layoutFeatures.layoutRotationY = param1;
					this.validateTransformMatrix();
				}
			}

			public get rotationZ():number
			{
				return this.layoutFeatures == null?flash.trannumber(egret.superGetter(mx.core.BitmapAsset,this,"rotationZ"[""]):flash.trannumber(this.layoutFeatures.layoutRotationZ);
			}

			public set rotationZ(param1:number)
			{
				if(this["rotationZ"] == param1)
				{
					return ;
				}
				if(this.layoutFeatures == null)
				{
					egret.superSetter(mx.core.BitmapAsset,this,"rotationZ"["",param1);
				}
				else
				{
					this.layoutFeatures.layoutRotationZ = param1;
					this.validateTransformMatrix();
				}
			}

			public get rotation():number
			{
				return this.layoutFeatures == null?flash.trannumber(egret.superGetter(mx.core.BitmapAsset,this,"rotation")):flash.trannumber(this.layoutFeatures.layoutRotationZ);
			}

			public set rotation(param1:number)
			{
				if(this.rotation == param1)
				{
					return ;
				}
				if(this.layoutFeatures == null)
				{
					egret.superSetter(mx.core.BitmapAsset,this,"rotation",param1);
				}
				else
				{
					this.layoutFeatures.layoutRotationZ = param1;
					this.validateTransformMatrix();
				}
			}

			public get scaleX():number
			{
				return this.layoutFeatures == null?flash.trannumber(egret.superGetter(mx.core.BitmapAsset,this,"scaleX")):flash.trannumber(this.layoutFeatures.layoutScaleX);
			}

			public set scaleX(param1:number)
			{
				if(this.scaleX == param1)
				{
					return ;
				}
				if(this.layoutFeatures == null)
				{
					egret.superSetter(mx.core.BitmapAsset,this,"scaleX",param1);
				}
				else
				{
					this.layoutFeatures.layoutScaleX = param1;
					this.layoutFeatures.layoutWidth = Math.abs(param1) * this.measuredWidth;
					this.validateTransformMatrix();
				}
			}

			public get scaleY():number
			{
				return this.layoutFeatures == null?flash.trannumber(egret.superGetter(mx.core.BitmapAsset,this,"scaleY")):flash.trannumber(this.layoutFeatures.layoutScaleY);
			}

			public set scaleY(param1:number)
			{
				if(this.scaleY == param1)
				{
					return ;
				}
				if(this.layoutFeatures == null)
				{
					egret.superSetter(mx.core.BitmapAsset,this,"scaleY",param1);
				}
				else
				{
					this.layoutFeatures.layoutScaleY = param1;
					this._height = Math.abs(param1) * this.measuredHeight;
					this.validateTransformMatrix();
				}
			}

			public get scaleZ():number
			{
				return this.layoutFeatures == null?flash.trannumber(egret.superGetter(mx.core.BitmapAsset,this,"scaleZ"[""]):flash.trannumber(this.layoutFeatures.layoutScaleZ);
			}

			public set scaleZ(param1:number)
			{
				if(this["scaleZ"] == param1)
				{
					return ;
				}
				if(this.layoutFeatures == null)
				{
					egret.superSetter(mx.core.BitmapAsset,this,"scaleZ"["",param1);
				}
				else
				{
					this.layoutFeatures.layoutScaleZ = param1;
					this.validateTransformMatrix();
				}
			}

			public get layoutDirection():string
			{
				return this._layoutDirection;
			}

			public set layoutDirection(param1:string)
			{
				if(param1 == this._layoutDirection)
				{
					return ;
				}
				this._layoutDirection = param1;
				this.invalidateLayoutDirection();
			}

			public get measuredHeight():number
			{
				if(this.bitmapData)
				{
					return this.bitmapData.height;
				}
				return 0;
			}

			public get measuredWidth():number
			{
				if(this.bitmapData)
				{
					return this.bitmapData.width;
				}
				return 0;
			}

			public invalidateLayoutDirection()
			{
				var _loc2_:boolean = <any>false;
				var _loc1_:egret.DisplayObjectContainer = this.parent;
				while(_loc1_)
				{
					if(flash.As3is(_loc1_,null,"mx.core.ILayoutDirectionElement"))
					{
						_loc2_ = this._layoutDirection != null && (<mx.core.ILayoutDirectionElement>(_loc1_)).layoutDirection != null && this._layoutDirection != (<mx.core.ILayoutDirectionElement>(_loc1_)).layoutDirection;
						if(_loc2_ && this.layoutFeatures == null)
						{
							this.initAdvancedLayoutFeatures();
							if(this.layoutFeatures != null)
							{
								this.layoutFeatures.mirror = _loc2_;
								this.validateTransformMatrix();
							}
						}
						else if(<any>!_loc2_ && this.layoutFeatures)
						{
							this.layoutFeatures.mirror = _loc2_;
							this.validateTransformMatrix();
							this.layoutFeatures = null;
						}
						break;
					}
					_loc1_ = _loc1_.parent;
				}
			}

			public move(param1:number,param2:number)
			{
				this.x = param1;
				this.y = param2;
			}

			public setActualSize(param1:number,param2:number)
			{
				this.width = param1;
				this.height = param2;
			}

			private addedHandler(param1:egret.Event)
			{
				this.invalidateLayoutDirection();
			}

			private initAdvancedLayoutFeatures()
			{
				var _loc1_:flash.ApplicationDomain = <any>null;
				var _loc2_:mx.core.IAssetLayoutFeatures = <any>null;
				if(this.layoutFeaturesClass == null)
				{
					_loc1_ = flash.ApplicationDomain.currentDomain;
					if(_loc1_.hasDefinition("mx.core::AdvancedLayoutFeatures"))
					{
						this.layoutFeaturesClass = (<any>(_loc1_.getDefinition("mx.core::AdvancedLayoutFeatures")));
					}
					if(mx.core.BitmapAsset.MatrixUtilClass == null)
					{
						if(_loc1_.hasDefinition("mx.utils::MatrixUtil"))
						{
							mx.core.BitmapAsset.MatrixUtilClass = (<any>(_loc1_.getDefinition("mx.utils::MatrixUtil")));
						}
					}
				}
				if(this.layoutFeaturesClass != null)
				{
					_loc2_ = new this.layoutFeaturesClass();
					_loc2_.layoutScaleX = this.scaleX;
					_loc2_.layoutScaleY = this.scaleY;
					_loc2_.layoutScaleZ = this["scaleZ"];
					_loc2_.layoutRotationX = this.rotationX;
					_loc2_.layoutRotationY = this.rotationY;
					_loc2_.layoutRotationZ = this.rotation;
					_loc2_.layoutX = this.x;
					_loc2_.layoutY = this.y;
					_loc2_.layoutZ = this.z;
					_loc2_.layoutWidth = this.width;
					this._height = this.height;
					this.layoutFeatures = _loc2_;
				}
			}

			private validateTransformMatrix()
			{
				if(this.layoutFeatures != null)
				{
					if(this.layoutFeatures.is3D)
					{
						egret.superSetter(mx.core.BitmapAsset,this,"transform"[""]["matrix3D",this.layoutFeatures.computedMatrix3D);
					}
					else
					{
						egret.superSetter(mx.core.BitmapAsset,this,"transform"[""].matri,this.layoutFeatures.computedMatrix);
					}
				}
			}

		}
	}
}

mx.core.BitmapAsset.VERSION_static_mx_core_BitmapAsset = "4.6.0.23201";
flash.extendsClass("mx.core.BitmapAsset","mx.core.FlexBitmap")
flash.implementsClass("mx.core.BitmapAsset",["mx.core.IFlexAsset","mx.core.IFlexDisplayObject","mx.core.ILayoutDirectionElement"]);