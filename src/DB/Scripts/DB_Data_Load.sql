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

	SET IDENTITY_INSERT PokemonGeneration OFF
END
GO

IF NOT EXISTS(select * from PokemonGames)
BEGIN
	SET IDENTITY_INSERT PokemonGames ON

	Insert into [dbo].[PokemonGames](GameID, GameName, ShortName, GenID)
	Values (1, 'Red and Blue', 'R & B', 1)
	,(2, 'Yellow', 'Y', 1)
	,(3, 'Gold and Silver', 'G & S', 2)
	,(4, 'Crystal', 'C', 2)
	,(5, 'Ruby and Sapphire', 'RSE', 3)
	,(6, 'FireRed and LeafGreen', 'FR & LG', 3)
	,(7, 'Emerald', 'E', 3)
	,(8, 'Diamond and Pearl', 'D & P', 4)
	,(9, 'Platinum', 'Plat', 4)
	,(10, 'HearGold and SoulSilver', 'HG & SS', 4)
	,(11, 'Black and White', 'B & W', 5)
	,(12, 'Black 2 and White 2', 'B2 & W2', 5)
	,(13, 'X and Y', 'X & Y', 6)
	,(14, 'Omega Ruby and Alpha Sapphire', 'ORAS', 6)

	SET IDENTITY_INSERT PokemonGames OFF
END
GO

