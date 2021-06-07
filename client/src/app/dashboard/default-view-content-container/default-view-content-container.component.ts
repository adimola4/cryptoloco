import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DataService } from 'src/app/core';
import { Tweet } from 'src/app/models';
import { Currency } from 'src/app/models/currency';

@Component({
  selector: 'default-view-content',
  templateUrl: './default-view-content-container.component.html',
  styles:[
    `
    .scroller {
      animation: 30s scroll linear infinite;
    }
    @keyframes scroll {
      from {
        transform: translate(0,0);
      }
    
      to {
        transform: translate(-50%,0);
      }
    }
    `,
]
})
export class DefaultViewContentContainerComponent implements OnInit {
  
  public tweets:Tweet[]=[];
  tweets$:Observable<Tweet[]>;
  public twitter_user_name:string = "";
  public showError:string = "";
  public showSuccess:string = "";
  loading_tweets:boolean = true;
  IsMobile:boolean = (window.innerWidth < 400);


  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    if (localStorage.twitters ) {
    
    
    } else{
    
    
    
    }
    this.tweets$ = this.dataService.getTweets()
    this.tweets$.subscribe(()=>this.loading_tweets = false)
   
  }
  public compar(x: any, y:any):number{
    console.log(x,y);
  if((isNaN(parseFloat(x)) || !isFinite(x)) || (isNaN(parseFloat(y)) || !isFinite(y))){    
      if(x.toLowerCase() < y.toLowerCase()) return -1;
      if(x.toLowerCase() > y.toLowerCase()) return 1;
    }
    else{        
      if(parseFloat(x) < parseFloat(y)) return -1;
      if(parseFloat(x) > parseFloat(y)) return 1;
    }
    return 0; 
  }

  handleAddTwitterAccount(){
      if (this.twitter_user_name === "") return;
      this.showError="";
    this.dataService.newTwitterAccount(this.twitter_user_name)
    .subscribe((data:Tweet[]) => {
      console.log(data);
      data.map( t => {
                        // if(this.tweets.filter())
                        if (!this.tweets.find((tweet:Tweet)=> (tweet.name === t.name && tweet.full_text === t.full_text))) 
                            this.tweets.push(t);
                        
                      });
    }, (err: any) => {      
      this.twitter_user_name = "";
      this.showError = err.error[0].msg;
    },
    () =>{
      console.log('add twitter...')
      this.showError="";
      this.showSuccess = `Success to add ${this.twitter_user_name}!`
      this.twitter_user_name = "";


    }
     );



  }



}
