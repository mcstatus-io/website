import { useEffect, useState } from 'react';

export default function useScrollSpy(ids, opts = undefined) {
	const [entries, setEntries] = useState([]);

	useEffect(() => {
		const observer = new IntersectionObserver((targets) => {
			const newEntries = targets.filter((target) => target.isIntersecting).map((target) => target.target.id);

			if (JSON.stringify(entries) !== JSON.stringify(newEntries)) {
				setEntries(newEntries);
			}
		}, opts);

		for (const id of ids) {
			const target = document.querySelector(`#${id}`);

			if (target) {
				observer.observe(target);
			}
		}

		return () => observer.disconnect();
	}, [ids]);

	return entries;
}