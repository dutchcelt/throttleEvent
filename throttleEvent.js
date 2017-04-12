/**
 * throttleEvent
 * Used to limit events that can be fired in rapid succession.
 * This can prevent an event like onresize or onscroll from thrashing the UI.
 * NOTE: It will not fire the last event if elapsed time is within delay.
 *
 * Example: addEventListener('resize', throttleEvent(_handler, 500, this), false);
 *
 * @arg {function} func  - This is the actual event handler to be passed on
 * @arg {number} ms      - The optional delay time in milliseconds (throttling)
 * @arg {object} context - Optional scope in which to return the function handler
 * @return {function}    - The timeout function that is triggered by the event listner on each event call
 */
export const throttleEvent = (func, ms, context = this) => {
	// An animation frame 'ticks' 60 times a second (1000ms)
	const DELAY = ms || ((1000 / 60) * 4); // Default delay is a single animation frame times 4
	let timestamp = performance.now();
	return event => {
		requestAnimationFrame(currentEventTime => {
			if ((currentEventTime - timestamp) >= DELAY) {
				timestamp = currentEventTime;
				func.call(context, event);
			}
		});
	};
};
