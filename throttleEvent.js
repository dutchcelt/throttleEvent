/**
 * throttleEvent
 * Used to limit events that can be fired in rapid succession.
 * This can prevent an event like onresize or onscroll from thrashing the UI.
 *
 * Example: addEventListener('resize', throttleEvent(_handler, 500, this), false);
 *
 * @arg {function} func  - This is the actual event handler to be passed on
 * @arg {number} ms      - The optional delay time in milliseconds (throttling)
 * @arg {object} context - Optional scope in which to return the function handler
 * @return {function}    - The timeout function that is triggered by the event listner on each event call
 */
export const throttleEvent = (func, ms, scope = this) => {
	// An animation frame 'ticks' 60 times a second (1000ms)
	const DELAY = ms || ((1000 / 60) * 4); // Default delay is a single animation frame times 4
	let timestamp = performance.now();
	let running = false;
	const onTimeOut = event => {
		timestamp = performance.now();
		func.call(scope, event);
		running = false;
	};
	return event => {
		if (!running) {
			running = true;
			requestAnimationFrame(currentEventTime => {
				setTimeout(onTimeOut, Math.max(0, DELAY - (currentEventTime - timestamp)), event);
			});
		}
	};
};
