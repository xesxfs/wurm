 class Effect extends BitmapDataEx {
	public effectNumber:number = 0;
	protected w:number = 0;
	protected h:number = 0;
	public frameCnt:number = 0;
	public endCnt:number = 0;
	public doDraw:boolean = false;
	public matrix:egret.Matrix;

	public constructor()
	{
		super(this.w,this.h);
	}

	public update():boolean
	{
		return false;
	}

}

flash.extendsClass("Effect","BitmapDataEx")
