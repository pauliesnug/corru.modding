/**
 * Global Saves: Minimum to trigger start.
 */
export declare interface GlobalSaves {
	/**
	 * Neural Binary String for E3A2.
	 */
	e3a2debug: string;

	/**
	 * Neural Object for EP3 Start.
	 */
	collapseSave_ep3start: NeuralObject;

	/**
	 * Neural Binary String for EP1 Start.
	 */
	ep1start: string;

	/**
	 * Neural Binary String for EP2 Start.
	 */
	ep2start: string;

	/**
	 * Neural Binary String for EP3 Start.
	 */
	ep3start: string;
};

export interface NeuralObject {
	saveZone: string;
	pageFlags: PageFlags;
	party: PartyMember[];
	inventory: InventoryItem[];
};

export interface PageFlags {
	[key: string]: string | number | boolean | Array<any>;
}

export interface PartyMember {
	slug: string;
	name: string;
	class: string;
	hp: number;
	combatActor: {
		slug: string;
	};
}

export type InventoryItem = (number | { slug: string })[];
