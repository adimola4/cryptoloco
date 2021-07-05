import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "sortBy" })
export class SortByPipe implements PipeTransform {
	public compar(x: any, y: any): number {
		if (
			isNaN(parseFloat(x)) ||
			!isFinite(x) ||
			isNaN(parseFloat(y)) ||
			!isFinite(y)
		) {
			if (x.toLowerCase() < y.toLowerCase()) {
				return -1;
			}
			if (x.toLowerCase() > y.toLowerCase()) {
				return 1;
			}
		} else {
			if (parseFloat(x) < parseFloat(y)) {
				return -1;
			}
			if (parseFloat(x) > parseFloat(y)) {
				return 1;
			}
		}
		return 0;
	}

	transform(value: any, order = "", prop: string = ""): any[] {
		if (!value || order === "" || !order) {
			return value;
		}
		if (!Array.isArray(value)) {
			return value;
		}
		if (!prop || prop === "") {
			if (order === "asc") {
				return value.sort();
			} else {
				return value.sort().reverse();
			}
		} else {
			if (order === "asc") {
				const r = value.sort((x: any, y: any) => {
					const f = this.compar(x[prop], y[prop]);
					return f;
				});
				return r;
			} else {
				const r = value
					.sort((x: any, y: any) => this.compar(x[prop], y[prop]))
					.reverse();
				return r;
			}
		}
	}
}
