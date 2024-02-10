export interface Pokemon extends Stats {
	name: string;
	sprite: string;
	types: string[];
	abilities: string[];
};

export interface Stats {
	hp: number;
	attack: number;
	defense: number;
	'special-attack': number;
	'special-defense': number;
	speed: number;
};

export interface Types {
	Normal: string,
	Fire: string,
	Fighting: string,
	Water: string,
	Flying: string,
	Grass: string,
	Poison: string,
	Electric: string,
	Ground: string,
	Psychic: string,
	Rock: string,
	Ice: string,
	Bug: string,
	Dragon: string,
	Ghost: string,
	Dark: string,
	Steel: string,
	Fairy: string,
};

export interface Ability {
	name: string;
	description: string;
};
