# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_06_05_140641) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "articles", force: :cascade do |t|
    t.string "title"
    t.string "original_url"
    t.string "description"
    t.string "type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.text "content"
    t.bigint "source_id", null: false
    t.date "published_date"
    t.string "keywords", default: [], array: true
    t.string "type_of_content"
    t.string "image_url"
    t.index ["source_id"], name: "index_articles_on_source_id"
  end

  create_table "categories", force: :cascade do |t|
    t.string "title"
    t.string "slug"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "categories_sources", id: false, force: :cascade do |t|
    t.bigint "source_id", null: false
    t.bigint "category_id", null: false
    t.index ["category_id", "source_id"], name: "index_categories_sources_on_category_id_and_source_id"
    t.index ["source_id", "category_id"], name: "index_categories_sources_on_source_id_and_category_id"
  end

  create_table "currencies", force: :cascade do |t|
    t.string "title"
    t.string "code"
    t.integer "rank"
    t.string "market_cap_usd"
    t.string "price_usd"
    t.decimal "v24"
    t.decimal "p24"
    t.decimal "p1h"
    t.decimal "p7d"
    t.string "integer"
    t.string "img_url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "keywords", default: [], array: true
    t.string "api_id"
    t.string "description"
    t.boolean "trending"
  end

  create_table "currencies_sources", id: false, force: :cascade do |t|
    t.bigint "source_id", null: false
    t.bigint "currency_id", null: false
    t.index ["currency_id", "source_id"], name: "index_currencies_sources_on_currency_id_and_source_id"
    t.index ["source_id", "currency_id"], name: "index_currencies_sources_on_source_id_and_currency_id"
  end

  create_table "links", force: :cascade do |t|
    t.string "kind"
    t.string "url"
    t.bigint "currency_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["currency_id"], name: "index_links_on_currency_id"
  end

  create_table "sources", force: :cascade do |t|
    t.string "Domain"
    t.string "title"
    t.string "website_url"
    t.text "description"
    t.string "type"
    t.string "keyword", default: [], array: true
    t.string "img_url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "{:index=>true, :foreign_key=>true}_id"
    t.index ["{:index=>true, :foreign_key=>true}_id"], name: "index_sources_on_{:index=>true, :foreign_key=>true}_id"
  end

  create_table "twitter_accounts", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "articles", "sources"
  add_foreign_key "links", "currencies"
end
