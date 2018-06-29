 class GameGuiMc extends egret.SwfMovie {
	public fldBest:flash.TextField;
	public fldTotal:flash.TextField;
	public fldMoves:flash.TextField;
	public gpPt:GatePart;
	public lg1:logoGame1;
	public lg2:logoGame2;
	public nbPt:NextBlockPart;
	public GameGiveUpBtn:BtnGemaGiveUp;
	public fldCombo:flash.TextField;

	public constructor()
	{
		super();
	}

}

flash.extendsClass("GameGuiMc","egret.SwfMovie")
