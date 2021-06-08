task seed_task: :environment do


Source.create_or_find_by!(
    Domain: 'cointelegraph.com',
    title: 'Cointelegraph',
    website_url: "https://cointelegraph.com/rss" ,
    description: "Cointelegraph covers fintech, blockchain and Bitcoin bringing you the latest news and analyses on the future of money.", 
    img_url: "",
    type: "News",
   )
# Bitcoin News
Source.create_or_find_by!(
    Domain: 'news.bitcoin.com',
    title: 'Bitcoin News',
    website_url: "https://news.bitcoin.com/feed/" ,
    description: "Daily Bitcoin News", 
    img_url: "",
    type: "News",
   )   
# NewsBTC
Source.create_or_find_by!(
    Domain: 'newsbtc.com',
    title: 'NewsBTC',
    website_url: "https://www.newsbtc.com/feed/" ,
    description: "Bitcoin cryptocurrency news today, price technical analysis", 
    img_url: "",
    type: "News",
   )   
# thecapital.io
Source.create_or_find_by!(
    Domain: 'thecapital.io',
    title: 'News from thecapital.io',
    website_url: "https://thecapital.io/assets/feed/news.xml" ,
    description: "A Publishing Platform for Professionals - See What's Trending.", 
    img_url: "",
    type: "News",
   )  
   Ivan on Tech Youtube Channel
Source.create_or_find_by!(
    Domain:'Ivan on Tech',
    title:'Ivan on Tech Youtube Channel',
    website_url:'https://www.youtube.com/feeds/videos.xml?channel_id=UCrYmtJBtLdtm2ov84ulV-yg',
    description:"WELCOME TO MY BLOCKCHAIN CHANNEL GUYS!
                This channel is all about cryptocurrencies and the blockchain technology
                I'm also an international blockchain speaker and educator.  If you want me to speak at your conference book me here: http://ivanontech.com
                
                OBS! I never reach out on Telegram with business proposals! If you've been contacted by me on Telegram - A SCAMMER IS TRYING TO ROB YOU! My Telegram handle is @ivanontech and I never use it for business requests. 
                
                All other handles are scammers, don't trust anyone. 
                
                Sometimes scammers spoof our emails and send emails that look like they are from us, never trust anyone who wrote to you on Telegram.
                
                Scammer sometimes send photoshopped pictures that look like my passport, never trust anyone sending my passport.
                
                ivan@ivanontech.com",
    type: "Media"

    )
# Doug Polk Crypto 

Source.create_or_find_by!(
    Domain:'Doug Polk Crypto',
    title:'Doug Polk Crypto Youtube Channel',
    website_url:'https://www.youtube.com/feeds/videos.xml?channel_id=UC4sS8q8E5ayyghbhiPon4uw',
    description:"Cryptocurrency news and entertainment. I cover the latest events in Bitcoin, Ethereum, Ripple, Litecoin, and various other projects in the crypto space. I am not a financial adviser, please invest responsibly and do your research.",
    type: "Media"

    )
# Lark Davis Youtube Channel
Source.create_or_find_by!(
    Domain:'Lark Davis',
    title:'Lark Davis Youtube Channel',
    website_url:'https://www.youtube.com/feeds/videos.xml?channel_id=UCl2oCaw8hdR_kbqyqd2klIA',
    description:"Hi! I'm Lark! I'm a Bitcoin, cryptocurrency, and stock investor with years of experience making consistent profits in this market, and helping my audience do the same. I created this channel to help you learn about cryptocurrency investing so you can diversify your portfolio, grow your wealth, and make money. Check out my courses if you are new to crypto, and subscribe to my channel for daily investor updates. 

        Writer of the best crypto investor report on the market called Wealth Mastery. 
        https://cryptolark.co/WEALTHMASTERY
        
        Creator of the very popular beginner courses:
        Cryptocurrency Explained Beginner Course https://cryptolark.co/beginner-course 
        Cryptocurrency Trading Explained https://cryptolark.co/trading-course  
        
        
        SOCIAL MEDIA  - These are my only accounts, beware of scammers!
        TWITTER  twitter.com/TheCryptoLark 
        FACEBOOK facebook.com/TheCryptoLark
        
        ",
    type: "Media"

    )
# Crypto Zombie 
Source.create_or_find_by!(
        Domain:'Crypto Zombie',
        title:'Crypto Zombie Youtube Channel',
        website_url:'https://www.youtube.com/feeds/videos.xml?channel_id=UCiUnrCUGCJTCC7KjuW493Ww',
        description:"Crypto Zombie is Bitcoin, altcoin, and cryptocurrency news brought to you every day! We discuss coins like BTC and Ethereum, blockchain technology, host interviews with top projects and leaders in the space, and bring you the most up to date and relevant breaking topics in the fintech space!",
        type: "Media"
    
        )

Source.create_or_find_by!(
        Domain:'Crypto Daily',
        title:'Crypto Daily Youtube Channel',
        website_url:'https://www.youtube.com/feeds/videos.xml?channel_id=UC67AEEecqFEc92nVvcqKdhA',
        description:"My name's Cameron.
            Twitter @crypto_daily
            Instagram @crypto_daily
            
            contact@cryptodaily.uk",
        type: "Media"
        )


# add all twitter accounts
TwitterAccount.create_or_find_by!(
    name:"DocumentingBTC"
)
TwitterAccount.create_or_find_by!(
    name:"APompliano"
)
TwitterAccount.create_or_find_by!(
    name:"nic__carter"
)
TwitterAccount.create_or_find_by!(name:"CarpeNoctom")
TwitterAccount.create_or_find_by!(name:"coinbase")
TwitterAccount.create_or_find_by!(name:"ForbesCrypto")
   
   
   puts 'seed finish!!'




end
