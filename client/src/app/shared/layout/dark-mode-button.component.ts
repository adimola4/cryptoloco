import { Component, OnInit } from "@angular/core";

@Component({
	selector: "dark-mode-button",
	templateUrl: "./dark-mode-button.component.html"
})
export class DarkModeButtonComponent implements OnInit {
	dark: Boolean;

	constructor() {}

	ngOnInit() {
		if (
			localStorage.theme === "dark" ||
			(!("theme" in localStorage) &&
				window.matchMedia("(prefers-color-scheme: dark)").matches)
		) {
			document.getElementsByTagName("html")[0].classList.add("dark");
			this.dark = true;
		} else {
			console.log(document.documentElement);
			document.getElementsByTagName("html")[0].classList.remove("dark");
			this.dark = false;
		}
	}

	onChangeTheme() {
		if (localStorage.getItem("theme") == "dark") {
			document.getElementsByTagName("html")[0].classList.remove("dark");
			localStorage.setItem("theme", "light");
			this.dark = false;
		} else {
			document.getElementsByTagName("html")[0].classList.add("dark");
			localStorage.setItem("theme", "dark");
			this.dark = true;
		}
	}
}
