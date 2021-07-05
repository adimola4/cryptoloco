import { NUMBER_TYPE } from "@angular/compiler/src/output/output_ast";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "replace" })
export class ReplacePipe implements PipeTransform {
	transform(
		value: number,
		strToReplace: string,
		replacementStr: string
	): number {
		if (!value || !strToReplace || !replacementStr) {
			return value;
		}
		const r = Number(value);

		return r;
	}
}
