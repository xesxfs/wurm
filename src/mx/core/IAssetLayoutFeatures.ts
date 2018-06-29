module mx {
	export module core {
		export interface IAssetLayoutFeatures {
			layoutX:number;
			layoutY:number;
			layoutZ:number;
			layoutWidth:number;
			transformX:number;
			transformY:number;
			transformZ:number;
			layoutRotationX:number;
			layoutRotationY:number;
			layoutRotationZ:number;
			layoutScaleX:number;
			layoutScaleY:number;
			layoutScaleZ:number;
			layoutMatrix:egret.Matrix;
			layoutMatrix3D:flash.Matrix3D;
			is3D:boolean;
			layoutIs3D:boolean;
			mirror:boolean;
			stretchX:number;
			stretchY:number;
			computedMatrix:egret.Matrix;
			computedMatrix3D:flash.Matrix3D;
		}
	}
}

