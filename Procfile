web: bundle exec rails server -p $PORT && npm start
release: bin/rake db:migrate
worker: bundle exec sidekiq -e production -c 2
 