Create Table PokemonGeneration
(
	GenID		int identity(1,1) not null
	,FullName	nvarchar(255) not null
	,ShortName	nvarchar(50) not null
	,Numerals	nvarchar(10) not null
	,CONSTRAINT PK_PokemonGeneration_GenID PRIMARY KEY ( GenID )
)

Create Table PokemonGames
(
	GameID	int identity(1,1) not null
	,GameName	nvarchar(255) not null
	,ShortName	nvarchar(20) not null
	,GenID		int not null
	,GameCode	nvarchar(10) not null
	,CONSTRAINT PK_PokemonGames_GameID Primary key ( GameID )
	,CONSTRAINT FK_GenID_PokemonGeneration_GenID Foreign Key (GenID) References PokemonGeneration(GenID)
)

Create Table Task
(
	TaskID	int identity(1,1) not null
	,Name nvarchar(255) not null
	,GameID	int not null
	,Tip nvarchar(255) null
	,OrderID int null
	,TaskClassName	nvarchar(100) null
	,ParentTaskID	int null
	,CONSTRAINT PK_Task_TaskID Primary Key (TaskID)
	,CONSTRAINT FK_GameID_PokemonGames_GameID Foreign Key (GameID) References PokemonGames(GameID)
)

Create Table SubTask
(
	SubTaskID	int identity(1,1) not null
	,TaskDescription nvarchar(255) not null
	,OrderID int null
	,TaskID int
	,CONSTRAINT PK_SubTask Primary Key (SubTaskID)
	,CONSTRAINT FK_TaskID_Task_TaskID Foreign Key (TaskID) References Task(TaskID)
)

Create Table Users
(
	UserID	int identity(1,1) not null
	,UserName	nvarchar(50) not null
	,CONSTRAINT PK_Users_UserID Primary Key (UserID)
)

Create Table UserTaskData
(
	UserID	int not null
	,TaskID	int not null
	,SubTaskID	int null
	,CONSTRAINT FK_UserID_Users_UserID Foreign Key (UserID) References Users(UserID)
	,CONSTRAINT FK_TaskID_Task Foreign Key (TaskID) References Task(TaskID)
	,CONSTRAINT FK_SubTaskID_SubTask Foreign Key (SubTaskID) References SubTask(SubTaskID)
)