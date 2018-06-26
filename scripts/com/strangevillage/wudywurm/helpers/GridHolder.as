package com.strangevillage.wudywurm.helpers
{
   import com.strangevillage.wudywurm.Config;
   import com.strangevillage.wudywurm.helpers.checkObjects.MoveCheckRect;
   import com.strangevillage.wudywurm.parts.gameParts.DoorsBlock;
   import com.strangevillage.wudywurm.parts.gameParts.GrabBlock;
   import com.strangevillage.wudywurm.parts.gameParts.WurmBlock;
   
   public class GridHolder
   {
      
      private static var _freeIDs:Vector.<int> = new Vector.<int>();
      
      public static const GRID_H:uint = 11;
      
      public static const GRID_X:uint = 20;
      
      public static const GRID_Y:uint = 20;
      
      private static var _newComboIDsVec:Vector.<int> = new Vector.<int>();
      
      public static const TILE_SIZE:uint = 48;
      
      public static const GRID_W:uint = 15;
      
      private static var _chPos:int = 0;
      
      public static var selectedBlock:WurmBlock;
      
      public static var comboMainVec:Vector.<int> = new Vector.<int>();
      
      public static var dragBlock:WurmBlock;
      
      public static var grabBlocksVec:Vector.<GrabBlock> = new Vector.<GrabBlock>();
      
      private static var _longestMove:int = 0;
      
      public static var doorsTotal:int = 0;
      
      private static var _wPosMovRet:Boolean = false;
      
      public static var comboIDsVec:Vector.<int> = new Vector.<int>();
      
      public static var emptyPosVec:Vector.<int> = new Vector.<int>();
      
      public static var doorsVec:Vector.<DoorsBlock> = new Vector.<DoorsBlock>();
      
      private static var _moveRet:int = 0;
      
      private static var _checkClrTemp:int = 0;
      
      private static var _destroyedWrmBlVec:Vector.<WurmBlock> = new Vector.<WurmBlock>();
      
      private static var _actualComboIDsVec:Vector.<int> = new Vector.<int>();
      
      public static var checkRectVec:Vector.<MoveCheckRect> = new Vector.<MoveCheckRect>();
      
      public static var gridVec:Vector.<int> = new Vector.<int>();
      
      public static var checkIDVec:Vector.<uint> = new Vector.<uint>();
      
      public static var wurmsVecs:Vector.<Vector.<WurmBlock>> = new Vector.<Vector.<WurmBlock>>();
       
      
      public function GridHolder()
      {
         super();
      }
      
      public static function checkMove(param1:int, param2:int) : int
      {
         _moveRet = 0;
         var _loc3_:int = 0;
         while(_loc3_ < checkRectVec.length)
         {
            _moveRet = checkRectVec[_loc3_].isIn(param1,param2);
            if(_moveRet != 0)
            {
               break;
            }
            _loc3_++;
         }
         return _moveRet;
      }
      
      public static function resetGridVars() : void
      {
         var _loc2_:int = 0;
         doorsTotal = 0;
         doorsVec = Vector.<DoorsBlock>([]);
         wurmsVecs = new Vector.<Vector.<WurmBlock>>();
         dragBlock = null;
         selectedBlock = null;
         gridVec = Vector.<int>([]);
         grabBlocksVec = Vector.<GrabBlock>([]);
         var _loc1_:int = 0;
         while(_loc1_ < GRID_H)
         {
            _loc2_ = 0;
            while(_loc2_ < GRID_W)
            {
               gridVec.push(0);
               grabBlocksVec.push(null);
               _loc2_++;
            }
            _loc1_++;
         }
      }
      
      private static function _removeWurmCombo() : void
      {
         var _loc2_:int = 0;
         var _loc3_:int = 0;
         _destroyedWrmBlVec = Vector.<WurmBlock>([]);
         _longestMove = 0;
         var _loc1_:int = 0;
         while(_loc1_ < wurmsVecs.length)
         {
            _loc2_ = 0;
            while(_loc2_ < wurmsVecs[_loc1_].length - 1)
            {
               if(comboMainVec.indexOf(wurmsVecs[_loc1_][_loc2_].posID) != -1)
               {
                  _loc3_ = _loc2_ + 1;
                  while(_loc3_ < wurmsVecs[_loc1_].length)
                  {
                     wurmsVecs[_loc1_][_loc3_].posShift = wurmsVecs[_loc1_][_loc3_].posShift + 1;
                     wurmsVecs[_loc1_][_loc3_].cMoveVec.push(wurmsVecs[_loc1_][_loc3_ - wurmsVecs[_loc1_][_loc3_].posShift].wID);
                     wurmsVecs[_loc1_][_loc3_].cMoveVec.push(wurmsVecs[_loc1_][_loc3_ - wurmsVecs[_loc1_][_loc3_].posShift].hID);
                     if(_longestMove < wurmsVecs[_loc1_][_loc3_].posShift)
                     {
                        _longestMove = wurmsVecs[_loc1_][_loc3_].posShift;
                     }
                     _loc3_++;
                  }
               }
               _loc2_++;
            }
            _loc1_++;
         }
         _startWurmComboRemoveMove();
      }
      
      private static function _checkMoveID(param1:int) : Boolean
      {
         if(param1 == 66)
         {
            return true;
         }
         if(param1 >= 0 && param1 < 10)
         {
            return true;
         }
         return false;
      }
      
      private static function _removeGrBlCombo() : void
      {
         var _loc1_:int = 0;
         while(_loc1_ < grabBlocksVec.length)
         {
            if(grabBlocksVec[_loc1_] != null && comboMainVec.indexOf(grabBlocksVec[_loc1_].posID) != -1)
            {
               Config.effComboDataVec.push(Math.round(grabBlocksVec[_loc1_].x + 24));
               Config.effComboDataVec.push(Math.round(grabBlocksVec[_loc1_].y + 24));
               Config.effComboDataVec.push(grabBlocksVec[_loc1_].clrID);
               grabBlocksVec[_loc1_].comboDestroy();
            }
            _loc1_++;
         }
      }
      
      public static function getPossibleMoves() : void
      {
         checkRectVec = Vector.<MoveCheckRect>([]);
         checkIDVec = Vector.<uint>([]);
         if(dragBlock != null)
         {
            if(dragBlock.hID - 1 >= 0 && _checkMoveID(gridVec[(dragBlock.hID - 1) * GRID_W + dragBlock.wID]))
            {
               checkRectVec.push(new MoveCheckRect(dragBlock.wID,dragBlock.hID - 1,1));
               checkIDVec.push(1);
            }
            if(dragBlock.hID + 1 < GRID_H && _checkMoveID(gridVec[(dragBlock.hID + 1) * GRID_W + dragBlock.wID]))
            {
               checkRectVec.push(new MoveCheckRect(dragBlock.wID,dragBlock.hID + 1,3));
               checkIDVec.push(3);
            }
            if(dragBlock.wID - 1 >= 0 && _checkMoveID(gridVec[dragBlock.hID * GRID_W + (dragBlock.wID - 1)]))
            {
               checkRectVec.push(new MoveCheckRect(dragBlock.wID - 1,dragBlock.hID,4));
               checkIDVec.push(4);
            }
            if(dragBlock.wID + 1 < GRID_W && _checkMoveID(gridVec[dragBlock.hID * GRID_W + (dragBlock.wID + 1)]))
            {
               checkRectVec.push(new MoveCheckRect(dragBlock.wID + 1,dragBlock.hID,2));
               checkIDVec.push(2);
            }
         }
      }
      
      private static function _getSameClrBlocks() : void
      {
         var _loc1_:int = 0;
         var _loc2_:int = 0;
         _actualComboIDsVec = Vector.<int>([]);
         for each(_loc1_ in _newComboIDsVec)
         {
            _actualComboIDsVec.push(_loc1_);
            comboIDsVec.push(_loc1_);
         }
         _newComboIDsVec = Vector.<int>([]);
         for each(_loc2_ in _actualComboIDsVec)
         {
            _chPos = _loc2_ - GRID_W;
            if(_chPos >= 0)
            {
               _tryComboAdd(_chPos);
            }
            _chPos = _loc2_ + GRID_W;
            if(_chPos < gridVec.length)
            {
               _tryComboAdd(_chPos);
            }
            _chPos = _loc2_ + 1;
            if(_loc2_ % GRID_W < GRID_W - 1)
            {
               _tryComboAdd(_chPos);
            }
            _chPos = _loc2_ - 1;
            if(_loc2_ % GRID_W > 0)
            {
               _tryComboAdd(_chPos);
            }
         }
         if(_newComboIDsVec.length > 0)
         {
            _getSameClrBlocks();
         }
      }
      
      public static function getEmptyPos() : void
      {
         emptyPosVec = Vector.<int>([]);
         var _loc1_:int = 0;
         while(_loc1_ < gridVec.length)
         {
            if(gridVec[_loc1_] == 0)
            {
               emptyPosVec.push(_loc1_);
            }
            _loc1_++;
         }
      }
      
      private static function _hiliteGrBlocks() : void
      {
         var _loc1_:int = 0;
         while(_loc1_ < grabBlocksVec.length)
         {
            if(grabBlocksVec[_loc1_] != null)
            {
               grabBlocksVec[_loc1_].checkHilite();
            }
            _loc1_++;
         }
      }
      
      private static function _hiliteWurms() : void
      {
         var _loc2_:int = 0;
         var _loc1_:int = 0;
         while(_loc1_ < wurmsVecs.length)
         {
            _loc2_ = 0;
            while(_loc2_ < wurmsVecs[_loc1_].length)
            {
               wurmsVecs[_loc1_][_loc2_].checkHilite();
               _loc2_++;
            }
            _loc1_++;
         }
      }
      
      private static function _tryComboAdd(param1:int) : void
      {
         if(gridVec[param1] % 50 == _checkClrTemp && comboIDsVec.indexOf(param1) == -1)
         {
            _newComboIDsVec.push(param1);
         }
      }
      
      public static function getCombo(param1:int, param2:int) : void
      {
         comboIDsVec = Vector.<int>([]);
         _checkClrTemp = param2;
         _newComboIDsVec = Vector.<int>([param1]);
         _getSameClrBlocks();
      }
      
      public static function removeDoors(param1:int) : void
      {
         var _loc2_:int = 0;
         while(_loc2_ < doorsVec.length)
         {
            if(doorsVec[_loc2_].posID == param1)
            {
               doorsVec[_loc2_].destroyDoors();
               break;
            }
            _loc2_++;
         }
      }
      
      public static function getGrabClrID(param1:int, param2:int) : int
      {
         _freeIDs = Vector.<int>([]);
         var _loc3_:int = 0;
         while(_loc3_ < Config.lvlClrsVec.length)
         {
            getCombo(param2 * GRID_W + param1,Config.lvlClrsVec[_loc3_]);
            if(comboIDsVec.length < 3)
            {
               _freeIDs.push(Config.lvlClrsVec[_loc3_]);
            }
            _loc3_++;
         }
         if(_freeIDs.length == 0)
         {
            _freeIDs.push(Config.addRandomClr());
            Config.newClrCount.setValue(0);
            trace("No possible clr without combo -> added new clr: " + _freeIDs[0]);
         }
         return _freeIDs.splice(Math.round(Math.random() * (_freeIDs.length - 1)),1)[0];
      }
      
      public static function checkCombos() : void
      {
         var _loc2_:int = 0;
         comboMainVec = Vector.<int>([]);
         var _loc1_:int = 0;
         while(_loc1_ < gridVec.length)
         {
            if(comboMainVec.indexOf(_loc1_) == -1 && gridVec[_loc1_] % 50 > 0 && gridVec[_loc1_] % 50 < 10)
            {
               getCombo(_loc1_,gridVec[_loc1_] % 50);
               if(comboIDsVec.length >= 3)
               {
                  _loc2_ = 0;
                  while(_loc2_ < comboIDsVec.length)
                  {
                     if(comboMainVec.indexOf(comboIDsVec[_loc2_]) == -1)
                     {
                        comboMainVec.push(comboIDsVec[_loc2_]);
                     }
                     _loc2_++;
                  }
               }
            }
            _loc1_++;
         }
         Config.actualGameGui.updateCombo();
         _hiliteGrBlocks();
         _hiliteWurms();
      }
      
      private static function _startWurmComboRemoveMove() : void
      {
         var _loc3_:int = 0;
         var _loc1_:int = 0;
         while(_loc1_ < wurmsVecs.length)
         {
            _loc3_ = 0;
            while(_loc3_ < wurmsVecs[_loc1_].length)
            {
               if(comboMainVec.indexOf(wurmsVecs[_loc1_][_loc3_].posID) != -1)
               {
                  Config.effComboDataVec.push(Math.round(wurmsVecs[_loc1_][_loc3_].x + 24));
                  Config.effComboDataVec.push(Math.round(wurmsVecs[_loc1_][_loc3_].y + 24));
                  Config.effComboDataVec.push(wurmsVecs[_loc1_][_loc3_].bType - 50);
                  wurmsVecs[_loc1_][_loc3_].comboDestroy();
                  _destroyedWrmBlVec.push(wurmsVecs[_loc1_][_loc3_]);
               }
               else if(wurmsVecs[_loc1_][_loc3_].posShift != 0)
               {
                  wurmsVecs[_loc1_][_loc3_].startComboMove(_longestMove);
               }
               _loc3_++;
            }
            _loc1_++;
         }
         var _loc2_:int = 0;
         while(_loc2_ < _destroyedWrmBlVec.length)
         {
            wurmsVecs[_destroyedWrmBlVec[_loc2_].wormID].splice(wurmsVecs[_destroyedWrmBlVec[_loc2_].wormID].indexOf(_destroyedWrmBlVec[_loc2_]),1);
            _loc2_++;
         }
         _destroyedWrmBlVec = Vector.<WurmBlock>([]);
      }
      
      public static function removeCombo() : void
      {
         Config.effComboDataVec = Vector.<int>([]);
         _removeGrBlCombo();
         _removeWurmCombo();
         comboMainVec = Vector.<int>([]);
      }
      
      public static function wurmsPosMove() : Boolean
      {
         _wPosMovRet = false;
         var _loc1_:int = 0;
         while(_loc1_ < wurmsVecs.length)
         {
            if(wurmsVecs[_loc1_].length != 0)
            {
               dragBlock = wurmsVecs[_loc1_][0];
               getPossibleMoves();
               if(checkRectVec.length > 0)
               {
                  _wPosMovRet = true;
                  break;
               }
            }
            _loc1_++;
         }
         dragBlock = null;
         return _wPosMovRet;
      }
      
      public static function resetCombo() : void
      {
         comboMainVec = Vector.<int>([]);
         Config.actualGameGui.updateCombo();
         _hiliteGrBlocks();
         _hiliteWurms();
      }
   }
}
