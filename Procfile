web: bundle exec rails server -p $PORT
release: bin/rake db:migrate
release: bin/rake seed_task
worker: bundle exec sidekiq -e production -c 2
 