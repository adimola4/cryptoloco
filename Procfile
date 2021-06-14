web: bundle exec rails server -p $PORT
web2: npm start-client
release: bin/rake db:migrate
worker: bundle exec sidekiq -e production -c 2
 