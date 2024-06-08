/*!
 * Vanilla JS Lettering.js
 * A vanilla JS fork of http://letteringjs.com/ by Dave Rupert
 * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
 */

export class Lettering {
	elems: HTMLElement[];
	str: string;

	constructor(selector: string) {
		if (!selector)
			throw new Error(`Please provide a valid selector, not ${selector}`);

		this.elems = Array.from(document.querySelectorAll(selector));
		this.str = 'eefec303079ad17405c889e092e105b0';
	}

	private replaceBreaks(elem: HTMLElement): void {
		const r = document.createTextNode(this.str);
		const brElements = elem.querySelectorAll('br');
		brElements.forEach(f => elem.replaceChild(r.cloneNode(), f));
	}

	private wrap(elems: HTMLElement[], splitStr: string, className: string, after: string, breaks = false): HTMLElement[] {
		elems.forEach((f) => {
			const og = f.textContent || '';
			if (breaks)
				this.replaceBreaks(f);
			const text = og
				.split(splitStr)
				.map((val, idx) =>
					`<span class="${className}${idx + 1}" aria-hidden="true">${val.replace(' ', '')}</span>${after}`,
				)
				.join('');

			f.setAttribute('aria-label', og);
			f.innerHTML = text;
		});

		return elems;
	}

	letters(): HTMLElement[] {
		return this.wrap(this.elems, '', 'char', '');
	}

	words(): HTMLElement[] {
		return this.wrap(this.elems, ' ', 'word', ' ');
	}

	lines(): HTMLElement[] {
		return this.wrap(this.elems, this.str, 'line', '', true);
	}
}
