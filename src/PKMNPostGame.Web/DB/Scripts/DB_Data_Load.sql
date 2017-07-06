IF NOT EXISTS(select * from PokemonGeneration)
BEGIN
	SET IDENTITY_INSERT PokemonGeneration ON

	Insert into PokemonGeneration(GenID, FullName, ShortName, Numerals)
	values (1, 'Generation 1','Gen 1','I')
	,(2, 'Generation 2','Gen 2','II')
	,(3, 'Generation 3','Gen 3','III')
	,(4, 'Generation 4','Gen 4','IV')
	,(5, 'Generation 5','Gen 5','V')
	,(6, 'Generation 6','Gen 6','VI')
	,(7, 'Generation 7','Gen 7','VII')

	SET IDENTITY_INSERT PokemonGeneration OFF
END
GO

IF NOT EXISTS(select * from PokemonGames)
BEGIN
	SET IDENTITY_INSERT PokemonGames ON

	Insert into [dbo].[PokemonGames](GameID, GameName, ShortName, GenID, GameCode)
	Values (1, 'Red and Blue', 'R & B', 1, 'RB')
	,(2, 'Yellow', 'Y', 1, 'YE')
	,(3, 'Gold and Silver', 'G & S', 2, 'GS')
	,(4, 'Crystal', 'C', 2, 'CR')
	,(5, 'Ruby and Sapphire', 'RSE', 3, 'RSE')
	,(6, 'FireRed and LeafGreen', 'FR & LG', 3, 'FRLG')
	,(7, 'Emerald', 'E', 3, 'EM')
	,(8, 'Diamond and Pearl', 'D & P', 4, 'DP')
	,(9, 'Platinum', 'Plat', 4, 'PLAT')
	,(10, 'HearGold and SoulSilver', 'HG & SS', 4, 'HGSS')
	,(11, 'Black and White', 'B & W', 5, 'BW')
	,(12, 'Black 2 and White 2', 'B2 & W2', 5, 'B2W2')
	,(13, 'X and Y', 'X & Y', 6, 'XY')
	,(14, 'Omega Ruby and Alpha Sapphire', 'ORAS', 6, 'ORAS')
	,(15, 'Sun and Moon', 'SuMo',7,'SUMO')

	SET IDENTITY_INSERT PokemonGames OFF
END
GO

