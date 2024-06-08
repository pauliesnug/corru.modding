/**
 * These say what to happen
 * Objects that have a name, and a variety of controls
 *
 * @example let x = new ObjectiveList({ objectives: [new Objective({ name: "Find a Foundry Vat", completion: "higuys2", exec: () => {console.log('higuys')} })] })
 */
export declare class Objective {
	name: string;
	completion: string | (() => boolean);
	progress?: () => string;
	showIf?: string | (() => boolean);
	hideOnCompletion?: boolean;
	definition?: string;
	exec?: () => void;
	priority: number;
	completed?: boolean;
	id: number;

	constructor(params: {
		name: string;
		completion: string | (() => boolean);
		progress?: () => string;
		showIf?: string | (() => boolean);
		hideOnCompletion?: boolean;
		definition?: string;
		exec?: () => void;
		priority?: number;
	});

	/**
	 * Check for completion, and if it's newly completed, run the exec.
	 * @returns {boolean}
	 */
	checkCompletion(): boolean;

	/**
	 * getShowValidity with a wrapper for "hideOnCompletion".
	 * @returns {boolean} If the objective should be shown.
	 */
	shouldShow(): boolean;

	static count: number;
}

/**
 * These make what should happen, happen
 * Objects that hook into the corru_changed event to keep track of the OBJECTIVES they contain
 * May create an HTML element if the constructor calls for it
 *
 * On every corru_changed, run through the list of objectives and determine:
 * - Whether they can be shown
 * - Whether they've been completed
 * - Whether any exec should happen as a result
 *
 * Additionally, update HTML element if it exists
 * Should hook into corru_leaving to delete itself and unhook the event
 *
 * Currently no need to add/remove objectives outside of creation
 */
export declare class ObjectiveList {
	objectives: Objective[];
	renderHTML: boolean;
	el?: HTMLElement;

	constructor(params: {
		objectives?: Objective[];
		renderHTML?: boolean;
	});

	/**
	 * Ran on corru_changes, runs through all this.objectives to update them.
	 */
	changeTracker(): void;

	/**
	 * Will either create or update the objective list.
	 */
	render(): void;

	/**
	 * If all objectives within the list are completed, this is true.
	 * @returns {boolean}
	 */
	isListCompleted(): boolean;

	/**
	 * Clean up event listeners and HTML elements.
	 */
	cleanup(): void;
}
