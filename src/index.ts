import type * as GlobalCorru from './typings';

export * from './api';

declare global {
	interface GlobalThis {
		Objective: typeof GlobalCorru.Objective;
		ObjectiveList: typeof GlobalCorru.ObjectiveList;
		Buddy: typeof GlobalCorru.Buddy;
	}

	interface Window {
		Objective: typeof GlobalCorru.Objective;
		ObjectiveList: typeof GlobalCorru.ObjectiveList;
		Buddy: typeof GlobalCorru.Buddy;
	}
}
