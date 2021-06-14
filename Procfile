web: bundle exec rails server -p $PORT && ng serve --port 4201
release: bin/rake db:migrate
worker: bundle exec sidekiq -e production -c 2
 