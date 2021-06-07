import { Component, OnInit, Input, EventEmitter } from '@angular/core';


@Component({
  selector: 'spinner',
  template: `
  <div class="top-0 left-0  w-full h-full z-50 overflow-hidden  opacity-75 flex flex-col items-center justify-center">
    <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-700 dark:border-gray-400 h-12 w-12 mb-4"></div>
    <h2 class="text-center text-gray-700 dark:text-gray-400 text-xl font-semibold">{{text}}</h2>
  </div>
  `,
  styles:[`
            .loader {
                border-top-color: #3498db;
                -webkit-animation: spinner 1.5s linear infinite;
                animation: spinner 1.5s linear infinite;
            }

            @-webkit-keyframes spinner {
                0% {
                    -webkit-transform: rotate(0deg);
                }
                100% {
                    -webkit-transform: rotate(360deg);
                }
            }

            @keyframes spinner {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
  `]
})
export class SpinnerComponent implements OnInit {

    @Input()
     text:string;

    ngOnInit(): void {
    }

}