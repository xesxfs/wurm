 class Field extends BitmapDisplay {
	public static fieldX:number = 0;
	public static fieldY:number = 0;
	public vec2Grid:Array<Array<Grid>>;
	public fieldW:number = 0;
	public fieldH:number = 0;
	public matchingJob:net.kawa.tween.KTJob;
	private exScore:number = 0;
	public stageData:StageData;
	private vecSound:Array<flash.Sound>;

	public constructor(param1:StageData)
	{
		super(this.fieldW * 45,this.fieldH * 45);
		var _loc2_:number = flash.checkInt(0);
		var _loc3_:number = flash.checkInt(0);
		var _loc4_:Grid = <any>null;
		this.vecSound = Array<flash.Sound>([Resource.soundC,Resource.soundD,Resource.soundE,Resource.soundF,Resource.soundG,Resource.soundA,Resource.soundB,Resource.soundCC]);
		this.stageData = param1;
		this.fieldW = flash.checkInt(param1.fieldW);
		this.fieldH = flash.checkInt(param1.fieldH);
		this.x = flash.tranint(120 - this.width / 2);
		this.y = flash.tranint(110 - this.height / 2) + 30;
		Field.fieldX = flash.checkInt(this.x);
		Field.fieldY = flash.checkInt(this.y);
		this.vec2Grid = new Array<Array<Grid>>();
		_loc2_ = flash.checkInt(0);
		while(_loc2_ < this.fieldW)
		{
			this.vec2Grid.push(new Array<Grid>());
			_loc3_ = flash.checkInt(0);
			while(_loc3_ < this.fieldH)
			{
				_loc4_ = new Grid(_loc2_,_loc3_,this.x + 45 * _loc2_,this.y + 45 * _loc3_);
				_loc4_.type = flash.checkInt(flash.tranint(param1.fieldData.charAt(_loc2_ * this.fieldH + _loc3_)));
				this.vec2Grid[_loc2_].push(_loc4_);
				if(_loc4_.type == 1)
				{
					this.drawBorderRect(45 * _loc2_ + 2,45 * _loc3_ + 2,40,40,4,587202559,0);
				}
				_loc3_++;
			}
			_loc2_++;
		}
		BlockManager.reset(this);
		BlockManager.AddAllBlock(param1.vecBlockData,false);
		BlockManager.addUndoString();
	}

	public getGrid(param1:number,param2:number):Grid
	{
		param1 = flash.checkInt(param1);
		param2 = flash.checkInt(param2);
		var gridX:number = flash.checkInt(param1);
		var gridY:number = flash.checkInt(param2);
		try 
		{
			return this.vec2Grid[gridX][gridY];
		}
		catch(e)
		{
			return null;
		}
		return null;
	}

	public matchCheck()
	{
		var _self__:any = this;
		var i:number = flash.checkInt(0);
		var j:number = flash.checkInt(0);
		var gridX:number = flash.checkInt(0);
		var gridY:number = flash.checkInt(0);
		var blockColor:number = flash.checkInt(0);
		var point:egret.Point = <any>null;
		var grid:Grid = <any>null;
		var block:Block = <any>null;
		var grid1:Grid = <any>null;
		var grid2:Grid = <any>null;
		var checkBlock1:Block = <any>null;
		var checkBlock2:Block = <any>null;
		var addScore:number = flash.checkInt(0);
		var combo:number = flash.checkInt(0);
		var mode:number = flash.checkInt(0);
		Status.combo++;
		this.matchingJob = null;
		var nestFlag:boolean = <any>false;
		i = flash.checkInt(0);
		while(i < this.fieldW)
		{
			j = flash.checkInt(0);
			while(j < this.fieldH)
			{
				grid = this.vec2Grid[i][j];
				if(grid.block != null)
				{
					block = grid.block;
					blockColor = flash.checkInt(block.vecLayer[0]);
					grid1 = this.getGrid(i + 1,j);
					grid2 = this.getGrid(i,j + 1);
					if(grid1 != null)
					{
						checkBlock1 = grid1.block;
					}
					else
					{
						checkBlock1 = null;
					}
					if(grid2 != null)
					{
						checkBlock2 = grid2.block;
					}
					else
					{
						checkBlock2 = null;
					}
					if(checkBlock1 != null && checkBlock1.vecLayer[0] == blockColor)
					{
						checkBlock1.removeFlag = true;
						block.removeFlag = true;
						nestFlag = true;
					}
					if(checkBlock2 != null && checkBlock2.vecLayer[0] == blockColor)
					{
						checkBlock2.removeFlag = true;
						block.removeFlag = true;
						nestFlag = true;
					}
				}
				j++;
			}
			i++;
		}
		var length:number = flash.checkInt(BlockManager.vecBlock.length);
		i = flash.checkInt(0);
		while(i < length)
		{
			block = BlockManager.vecBlock[i];
			if(block.removeFlag && block.removeLayer())
			{
				i--;
				length--;
			}
			i++;
		}
		if(nestFlag)
		{
			if(Status.combo < 8)
			{
				this.vecSound[Status.combo - 1].play(0,0,SoundManager.soundTransform);
			}
			else
			{
				this.vecSound[7].play(0,0,SoundManager.soundTransform);
			}
			this.matchingJob = KTW.to(this,0.5,{},null,function ()
			{
				_self__.matchCheck();
			});
		}
		else
		{
			addScore = flash.checkInt(Status.score - this.exScore);
			combo = flash.checkInt(Status.combo - 1);
			if(Status.maxCombo < combo)
			{
				Status.maxCombo = combo;
			}
			mode = flash.checkInt(Status.mode);
			if(mode > 0 && mode != 4 && BlockManager.vecBlock.length == 0)
			{
				Status.combo = Status.combo - 1;
				i = flash.checkInt(0);
				while(i < 9)
				{
					if(i != 4)
					{
						EffectManager.addEffect(new EffectScore("" + Status.addScore(),i / 3,i % 3));
					}
					else
					{
						EffectManager.addEffect(new EffectScore("Bonus!",i / 3,i % 3));
					}
					i++;
				}
			}
			Status.combo = 0;
			if(mode == 0 && <any>!BlockManager.clearCheck())
			{
				BlockManager.addUndoString();
			}
			else if(mode == 1)
			{
				BlockManager.finishCheck(SetScoreScene);
			}
			else if(mode == 2)
			{
				if(SetScore30Scene.cnt == 0)
				{
					BlockManager.finish(SetScore30Scene);
				}
				BlockManager.finishCheck(SetScore30Scene);
			}
			else if(Status.mode == 3)
			{
				BlockManager.finishCheck(SetScore1minScene);
			}
			else if(Status.mode == 4 && (Status.score != 0 || BlockManager.vecBlock.length == 20))
			{
				BlockManager.finish(SetScore1comboScene);
			}
		}
	}

	public mouseUpField(param1:number,param2:number)
	{
		param1 = flash.checkInt(param1);
		param2 = flash.checkInt(param2);
		var _self__:any = this;
		var gridX:number = flash.checkInt(param1);
		var gridY:number = flash.checkInt(param2);
		var grid:Grid = this.getGrid(gridX,gridY);
		var mouseDownBlock:Block = <any>BlockManager.mouseDownBlock;
		if(grid != null && grid.block == null && grid.type == 1)
		{
			grid.setBlock(mouseDownBlock);
			BlockManager.vecInventoryBlock[mouseDownBlock.inventoryNumber] = null;
			BlockManager.vecBlock.push(mouseDownBlock);
			if(Status.mode > 0)
			{
				BlockManager.addRandomInventoryBlock(BlockManager.mouseDownBlock.inventoryNumber);
			}
			if(Status.mode == 2)
			{
				SetScore30Scene.cnt--;
			}
			BlockManager.mouseDownBlock = null;
			this.exScore = flash.checkInt(Status.score);
			this.matchingJob = KTW.to(this,0.2,{},null,function ()
			{
				_self__.matchCheck();
			});
		}
		else
		{
			BlockManager.mouseUp();
		}
	}

	public resetGridBlock()
	{
		var _loc1_:number = flash.checkInt(0);
		var _loc2_:number = flash.checkInt(0);
		_loc1_ = flash.checkInt(0);
		while(_loc1_ < this.fieldW)
		{
			_loc2_ = flash.checkInt(0);
			while(_loc2_ < this.fieldH)
			{
				this.vec2Grid[_loc1_][_loc2_].block = null;
				_loc2_++;
			}
			_loc1_++;
		}
	}

}

flash.extendsClass("Field","BitmapDisplay")
