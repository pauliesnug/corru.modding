export interface BuddySettings {
	element: BuddyElementSettings;
	activity: BuddyActivitySettings;
	location?: BuddyLocationSettings;
}

export interface BuddyElementSettings {
	/**
	 * Examine entity, if any
	 */
	entity?: string;

	/**
	 * Unique ID across the entire site (if global). Otherwise doesn't matter.
	 */
	id: string;

	/**
	 * CSS classes added upon creation
	 */
	classes?: string;

	/**
	 * Image for the default figure pseudoelement.
	 */
	img?: string;

	/**
	 * Size of the default buddy image.
	 *
	 * @default 75px
	 */
	size?: string;

	/**
	 * If the figure should have any contents
	 */
	figure?: string;

	/**
	 * If the element also has a `dialogueActor`.
	 *
	 * Used in conversations.
	 */
	actor?: string;
}

export interface BuddyBehaviorSettings {
	type: 'follow' | 'wander' | 'wander_element' | 'element';

	/**
	 * Rate at which the buddy repositions.
	 */
	rate: number;

	/**
	 * Pixel amount the element can 'drift' around its target.
	 */
	drift?: number;

	/**
	 * If `type` is 'wander', the pixel amount the element can travel at maximum speed
	 *
	 * @see BuddyBehaviorSettings#type wander
	 */
	limit?: number;

	/**
	 * If `type` is 'follow', picks a spot within this pixel range of the element (x and y).
	 *
	 * @see BuddyBehaviorSettings#type follow
	 */
	threshold?: number;

	/**
	 * If `type` is 'wander_element' or 'element', the element being gravitated to.
	 *
	 * @see BuddyBehaviorSettings#type wander_element, element
	 */
	element?: HTMLElement;

	/**
	 * If true, pauses movement when MUI is open.
	 */
	muiPause?: boolean;
}

export interface BuddyEventSettings {
	/**
	 * Called when the Buddy is created, when content has been loaded.
	 */
	onRender?: () => void;

	/**
	 * Called when the Buddy appears visually within the window.
	 */
	screenEnter?: () => void;

	/**
	 * Called when the user enters the page (loads in, or click continue).
	 */
	pageEnter?: () => void;

	/**
	 * Called when the mouse cursor enters the page.
	 */
	mouseEnter?: () => void;

	/**
	 * Called when leaving the page.
	 */
	leaving?: () => void;
}

export interface BuddyActivitySettings {
	behavior: BuddyBehaviorSettings;
	events: BuddyEventSettings;
}

/**
 * Used only if 'global' is enabled, meaning pages should be checking for the Buddy.
 */
export interface BuddyLocationSettings {
	/**
	 * String or array of paths.
	 */
	path: string | string[];

	/**
	 * Won't select a path that hasn't been explored.
	 */
	exploredOnly?: boolean;
}

/**
 * Buddies are floating, active entities that appear throughout the site.
 * At their core, they're just a div with a target and chatterbox that may have a surrounding animation.
 *
 * They may be created "globally", which adds them to the global buddy array.
 * This means that the page they're assigned to will render them and put them in motion on visit.
 * (the array is checked each page load)
 *
 * They have an entity, ID (for styling), classes, image to use, and size (equal w/h).
 * They have built in functions for easy chatter, as they can be quite talkative!
 * They also have events for 'pageEnter' and 'mouseEnter'.
 *
 * Their location can be any specific path, or an array of paths.
 *
 * Additionally, they have a behavior - this dictates their movement.
 * Planned behaviors: Every xxx ms...
 * - Follow - follows the cursor if they're far enough. (Funfriend style)
 * - Wander - picks a random spot on the page (extends beyond current scroll)
 * - Element - follows a specific element (i.e. follows something else)
 * - Element wander - picks spots within a specified element, moving randomly
 */
export declare class Buddy {
	constructor(settings: BuddySettings);

	html: string;
	elementData: BuddyElementSettings;
	activityData: BuddyActivitySettings;
	locationData?: BuddyLocationSettings;
	global?: boolean;
	currentLocation?: string;
	el: HTMLElement;
	xy?: { x: number; y: number };
	observer?: IntersectionObserver;
	behaviorTimeout?: number;
	behaving?: boolean;
	paused?: boolean;
	timeouts: number[];
	intervals: number[];

	/**
	 * Rerolls buddy location from list of specified paths, used by globals only.
	 * Can also specify a specific one.
	 * @param {string} [specificLocation] - A specific location to set.
	 * @returns {string | false} - The new location or false if not applicable.
	 */
	setNewLocation(specificLocation?: string): string | false;

	/**
	 * Determines if the Buddy should show on the current page.
	 * @returns {boolean} - True if the Buddy should show on the page, otherwise false.
	 */
	shouldBeOnPage(): boolean;

	/**
	 * Creates the Buddy within the current page's context.
	 */
	render(): void;

	/**
	 * Removes the Buddy element and performs cleanup.
	 * @param {object} options - Options for removal.
	 * @param {boolean} options.removeEl - If true, removes the element.
	 * @param {boolean} options.leaving - If true, triggers the leaving event.
	 */
	remove({ removeEl, leaving }: { removeEl: boolean; leaving: boolean }): void;

	/**
	 * Clears the Buddy's behavior.
	 */
	clearBehavior(): void;

	/**
	 * Activates the Buddy's behavior.
	 */
	activateBehavior(): void;

	/**
	 * Runs the Buddy's behavior.
	 */
	runBehavior(): void;

	/**
	 * Updates the travel rate/animation speed.
	 * @param {number} rate - The new rate.
	 */
	changeRate(rate: number): void;

	/**
	 * Updates the Buddy's speed.
	 * @param {number} speed - The new speed.
	 */
	changeSpeed(speed: number): void;

	/**
	 * Follow behavior: follows the cursor if far enough.
	 */
	behavior_follow(): void;

	/**
	 * Wander behavior: picks a random spot on the page.
	 */
	behavior_wander(): void;

	/**
	 * Sets the position of the Buddy.
	 * @param {object} xy - The new position.
	 * @param {number} [xy.x] - The new x-coordinate.
	 * @param {number} [xy.y] - The new y-coordinate.
	 */
	setPosition(xy: { x?: number; y?: number }): void;

	/**
	 * Centers the Buddy on the screen.
	 */
	center(): void;

	/**
	 * Activates the intersection observer for the Buddy.
	 */
	activateObserver(): void;

	/**
	 * Deactivates the intersection observer for the Buddy.
	 */
	deactivateObserver(): void;

	/**
	 * Triggers a chatter event for the Buddy.
	 * @param {object} options - Options for the chatter.
	 * @param {string} options.text - The text for the chatter.
	 * @param {number} [options.duration=6000] - The duration of the chatter.
	 * @param {boolean} [options.log=true] - If true, logs the chatter.
	 * @param {boolean} [options.readout=false] - If true, reads out the chatter.
	 */
	chatter({ text, duration, log, readout }: { text: string; duration?: number; log?: boolean; readout?: boolean }): void;

	/**
	 * Sets a timeout and tracks it.
	 * @param {() => void} func - The function to execute after the timeout.
	 * @param {number} time - The timeout duration in milliseconds.
	 * @returns {number} - The ID of the timeout.
	 */
	setTimeout(func: () => void, time: number): number;

	/**
	 * Clears all tracked timeouts.
	 */
	clearTimeouts(): void;

	/**
	 * Sets an interval and tracks it.
	 * @param {() => void} func - The function to execute at each interval.
	 * @param {number} time - The interval duration in milliseconds.
	 * @returns {number} - The ID of the interval.
	 */
	setInterval(func: () => void, time: number): number;

	/**
	 * Clears all tracked intervals.
	 */
	clearIntervals(): void;

	/**
	 * Static array to track global buddies.
	 */
	static globalBuddies: Buddy[];

	/**
	 * Static array to track current page buddies.
	 */
	static currentPageBuddies: Buddy[];

	/**
	 * Checks to see if any global buddies should be at the present page path and renders them.
	 */
	static renderGlobalBuddies(): void;

	/**
	 * Triggers the 'on page load' event of all buddies.
	 */
	static triggerPageBuddies(): void;

	/**
	 * Deconstructs all buddies on the current page - global or local.
	 * Intended for use on page leave.
	 * @param {object} options - Options for cleanup.
	 * @param {boolean} options.removeEl - If true, removes the element.
	 * @param {boolean} options.leaving - If true, triggers the leaving event.
	 */
	static cleanPageBuddies({ removeEl, leaving }: { removeEl: boolean; leaving: boolean }): void;
}
