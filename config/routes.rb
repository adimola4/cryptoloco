Rails.application.routes.draw do
  require "sidekiq/web"
  mount Sidekiq::Web => "/sidekiq"

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      get "/sources", to: "sources#index"
      post "/sources", to: "sources#create"
      get "/sources/:id", to: "sources#show"
      patch "/sources/:id", to: "sources#update"
      delete "/sources/:id", to: "sources#destroy"

      get "/articles/:title", to: "articles#show"

      get "/categories", to: "categories#index"

      get "/currencies", to: "currencies#index"
      get "/currencies_trending", to: "currencies#trending"
      get "/currencies/:api_id", to: "currencies#show"

      get "/feed", to: "feed#index"
      get "/tweets", to: "tweets#index"
      get "/tweets/:twitter_user_name", to: "tweets#new"
    end
  end

  get '*path', to: "application#fallback_index_html", constraints: lambda { |request|
    !request.xhr? && request.format.html?
  }

  root to: "application#fallback_index_html"

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
